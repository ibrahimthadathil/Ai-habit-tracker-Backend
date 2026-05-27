import { STATUS } from "@/const/httpStatus";
import { AIRepository } from "@/repositories/implementation/ai/ai-repository";
import { HabitRepository } from "@/repositories/implementation/habit/habit-repository";
import { HabitLogRepository } from "@/repositories/implementation/habit/habitLog-repository";
import { chatCompletion, SYSTEM_PROMPT } from "@/utils/aiService";
import { calcStreak, lastNDays, toDayKey } from "@/utils/dateHelper";
import { Types } from "mongoose";
import { Service } from "typedi";

@Service()
export class AiService {
  constructor(
    private AIrepo: AIRepository,
    private HabitLogRepo: HabitLogRepository,
    private HabitRepo: HabitRepository,
  ) {}

  async buildWeeklyContest(userId: string) {
    try {
      const habits = await this.HabitRepo.getAllWithFilter({
        userId,
        isArchived: true,
      });
      if (!habits) return { success: false, message: STATUS.NOT_FOUND.message };
      const days = lastNDays(7);
      const logs = await this.HabitLogRepo.getAllWithFilter({
        userId,
        completedDate: { $gte: days[0], $lte: days[days.length - 1] },
      });
      const perHabit = habits.map((h) => {
        const completedCount = logs.filter(
          (l) => String(l.habitId) === String(h._id),
        ).length;
        return {
          name: h.name,
          category: h.category,
          frequency: h.frequency,
          completedDay: completedCount,
          targetDays: h.targetDays,
        };
      });
      return { days, perHabit };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async weeklyReport(userId: string) {
    try {
      const ctx = await this.buildWeeklyContest(userId);
      if (!ctx.perHabit)
        return {
          success: false,
          content:
            "You don't have any active habits yet. Create your first habit to start tracking - I'll generate a weekly report once you have some data.",
        };
      const userMsg = `Here i s the user's habit data for the past 7 days (${ctx.days[0]} to ${ctx.days[6]}):\n\n${ctx.perHabit.map((h) => `-${h.name} (${h.category}, ${h.frequency}): completed ${h.completedDay}  of the past 7 Days, target ${h.targetDays}/week`).join("\n")}\n\nPlease write the personalised weekly report now.`;
      const { content } = await chatCompletion({
        system: SYSTEM_PROMPT.weekly,
        user: userMsg,
      });
      await this.AIrepo.create({
        userId: new Types.ObjectId(userId),
        type: "weekly",
        content,
      });
      return { success: true, content };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async suggestHabit(bodyData: Record<string, any>, userId: string) {
    try {
      const { goals, productiveTime, struggles } = bodyData;
      const userMsg = `User goals: ${goals || "not provided"}\nMost productive time: ${productiveTime || "not provided"}\nPast stuggles: ${struggles || "not provided"}\n\nSuggest 3 personalized habits now. Retuen JSON only. `;
      const { content } = await chatCompletion({
        system: SYSTEM_PROMPT.suggestion,
        user: userMsg,
      });
      let suggestions: any = [];
      try {
        const parsed = JSON.parse(content.replace(/```json|```/g, "").trim());
        suggestions = parsed.suggestions = [];
      } catch (error) {
        suggestions = [];
      }
      if (!suggestions.length) {
        suggestions = [
          {
            name: "10-minute morning walk",
            description: "Start the day with light movement and fresh air.",
            frequency: "daily",
            category: "Fitness",
            icon: "🏃",
            reason: "Low-friction way to build consistency early in the day.",
          },
          {
            name: "Read 5 pages",
            description: "Short daily reading to build a learning routine.",
            frequency: "daily",
            category: "Learning",
            icon: "📚",
            reason: "Compounds into significant knowledge over weeks.",
          },
          {
            name: "2 minutes of mindful breathing",
            description: "Pause and breathe to reset focus and reduce stress.",
            frequency: "daily",
            category: "Mindfulness",
            icon: "🧘",
            reason: "Tiny anchor habit that fits any schedule.",
          },
        ];
      }
      await this.AIrepo.create({
        userId: new Types.ObjectId(userId),
        type: "suggetion",
        content: JSON.stringify(suggestions),
        meta: { goals, productiveTime, struggles },
      });
      return { success: true, suggestions };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async recoveryplan(habitId: string, userId: string) {
    try {
      const habit = await this.HabitRepo.findHabit({ _id: habitId, userId });
      if (!habit) return { success: false, message: STATUS.NOT_FOUND.message };
      const logs = await this.HabitLogRepo.getAllHabit(
        { userId, habitId },
        { completedDate: -1 },
      );
      const keys = logs.map((l) => l.completedDate);
      const { current, longest } = calcStreak(keys);
      const userMsg = `habit: ${habit.name} (${habit.category}).\nDescription: ${habit.description || "none"}.\nCurrent streak: ${current} days. The user just broke a sreak. write a warm, actionable 3-day recovery plan.`;
      const { content } = await chatCompletion({
        system: SYSTEM_PROMPT.recovery,
        user: userMsg,
      });
      await this.AIrepo.create({
        userId: new Types.ObjectId(userId),
        type: "recovery",
        content,
        meta: { habitId },
      });
      return { success: true, content };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async chatAnalysis(question: string, userId: string) {
    try {
      if (!question) return { success: false, message: "Question is required" };
      const habits = await this.HabitRepo.getAllHabit({
        userId,
        isArchived: true,
      });
      const days = lastNDays(30);
      const logs = await this.HabitLogRepo.getAllHabit({
        userId,
        completedDate: { $gte: days[0], $lte: days[days.length - 1] },
      });
      const context = habits
        .map((h) => {
          const hlogs = logs.filter((l) => String(l.habitId) === String(h._id));
          const byDow = [0, 0, 0, 0, 0, 0, 0];
          for (const l of hlogs) {
            const dow = new Date(l.completedDate).getDay();
            byDow[dow] += 1;
          }
          return `${h.name} (${h.category}): ${hlogs.length}/30 in last days, by weekday[Sun,Mon,Tue,Wed,Thu,Fri,Sat] byDow`;
        })
        .join("\n");

      const userMsg = `User question: "${question}"\n\nUser data (last 30 days):\n${context}\n\nAnswer now.`;

      const { content } = await chatCompletion({
        system: SYSTEM_PROMPT.chat,
        user: userMsg,
      });

      await this.AIrepo.create({
        userId: new Types.ObjectId(userId),
        type: "chat",
        content,
        meta: {
          question,
        },
      });

      return { success: true, content };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async morningMotivation(userId: string) {
    try {
      const habits = await this.HabitRepo.getAllHabit({
        userId,
        isArchived: true,
      });
      if (!habits.length)
        return {
          content:
            "Good morning! Add your first habit today and ler's get the momentum started.",
        };
      const days = lastNDays(30);
      const logs = await this.HabitLogRepo.getAllHabit({
        userId,
        completedDate: { $gte: days[0], $lte: days[days.length - 1] },
      });
      const ctx = habits
        .map((h) => {
          const hLogs = logs
            .filter((l) => String(l.habitId) === String(h._id))
            .map((l) => l.completedDate)
            .sort()
            .reverse();

          const { current } = calcStreak(hLogs);

          return `${h.name}: current streak ${current}`;
        })
        .join("\n");

      const today = toDayKey();

      const todayLogs = logs.filter((l) => l.completedDate === today);

      const done = todayLogs.length;
      const total = habits.length;

      const userMsg = `Today's habits and streaks:\n${ctx}\n\nDone today: ${done}/${total}. Write the morning motivation now.`;

      const { content } = await chatCompletion({
        system: SYSTEM_PROMPT.morning,
        user: userMsg,
        temperature: 0.8,
      });
      await this.AIrepo.create({
        userId: new Types.ObjectId(userId),
        type: "morning",
        content,
      });
      return { content };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
