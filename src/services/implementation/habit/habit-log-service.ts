import { STATUS } from "@/const/httpStatus";
import { HabitRepository } from "@/repositories/implementation/habit/habit-repository";
import { HabitLogRepository } from "@/repositories/implementation/habit/habitLog-repository";
import {
  calcStreak,
  last90Days,
  lastNDays,
  toDayKey,
} from "@/utils/dateHelper";
import { Service } from "typedi";

@Service()
export class HabitLog {
  constructor(
    private habitLogRepo: HabitLogRepository,
    private habitRepo: HabitRepository,
  ) {}

  async checkComplete(data: { habitId: string; date: string }, userId: string) {
    try {
      const completeDate = data.date || toDayKey();
      const habit = await this.habitRepo.findHabit(
        {
          _id: data.habitId,
          userId,
        },
        { order: 1, createdAt: 1 },
      );
      if (!habit) return { success: false, message: STATUS.NOT_FOUND.message };
      const log = await this.habitLogRepo.findOneAndUpdate(
        userId,
        data.habitId,
        completeDate,
      );
      if (log) return { success: true, log };
      else return { success: false, message: STATUS.BAD_REQUEST.message };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async unCheckLog(data: { habitId: string; date: string }, userId: string) {
    try {
      const completeDate = data.date || toDayKey();
      const log = await this.habitLogRepo.findOneAndDelete(
        userId,
        data.habitId,
        completeDate,
      );
      if (log) return { success: true, message: "unmarked" };
      else throw new Error("Failed to unmark");
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getTodayDate(userId: string) {
    try {
      const completeddate = toDayKey();
      const logs = await this.habitLogRepo.findAllWithFilter(
        userId,
        completeddate,
      );
      
      if (logs) return { success: true, logs };
      else return { success: false, message: STATUS.NOT_FOUND.message };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getDaysrange(data: { start: string; end: string }, userId: string) {
    try {
      const { end, start } = data;
      const logs = await this.habitLogRepo.getAllHabit({
        userId,
        completedDate: { $gte: start, $lte: end },
      });
      if (logs) return { success: true, logs };
      else return { success: false, message: STATUS.NO_CONTENT.message };
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async getHeatMap(userId: string) {
    try {
      const days = last90Days();
      const logs = await this.habitLogRepo.getAllHabit({
        userId,
        completedDate: { $gte: days[0], $lte: days[days.length - 1] },
      });
      const counts: any = {};
      for (const d of days) counts[d] = 0;
      for (const l of logs)
        counts[l.completedDate] = (counts[l.completedDate] || 0) + 1;
      const data = days.map((d) => ({ date: d, count: counts[d] || 0 }));
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getHabitStat(userId: string, habitId: string) {
    try {
      const habit = await this.habitRepo.findHabit({ userId, _id: habitId });
      if (!habit) return { success: false, message: STATUS.NOT_FOUND.message };
      const logs = await this.habitLogRepo.getAllHabit(
        { userId, habitId },
        { completedDate: -1 },
      );
      const dateKeys = logs.map((l) => l.completedDate);

      const { current, longest } = calcStreak(dateKeys);

      // completion rate since habit created

      const createdKey = habit.createdAt!.toISOString().slice(0, 10);

      const today = toDayKey();

      const start = new Date(createdKey);
      const end = new Date(today);

      //   const totalDays =
      //     Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24))) + 1;
      const totalDays =
        Math.max(
          1,
          Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
        ) + 1;

      const completionRate = Math.round((logs.length / totalDays) * 100);

      // monthly breakdown (last 6 months)

      const monthly: any = {};

      for (const l of logs) {
        const m = l.completedDate.slice(0, 7);

        monthly[m] = (monthly[m] || 0) + 1;
      }

      return {
        success: true,
        data: {
          habit,
          totalCompletions: logs.length,
          currentStreak: current,
          longestStreak: longest,
          completionRate,
          monthly,
        },
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getAllStat(userId: string) {
    try {
      const habits = await this.habitRepo.getAllHabit({
        userId,
        isArchived: false,
      });
      const days = lastNDays(30);
      const logs = await this.habitLogRepo.getAllHabit({
        userId,
        completedDate: { $gte: days[0], $lte: days[days.length - 1] },
      });
      const perHabit = habits.map((h) => {
        const hLogs = logs.filter((l) => String(l.habitId) === String(h._id));

        const keys = hLogs
          .map((l) => l.completedDate)
          .sort()
          .reverse();

        const { current, longest } = calcStreak(keys);

        return {
          habitId: h._id,
          name: h.name,
          icon: h.icon,
          color: h.color,
          category: h.category,
          completions30d: hLogs.length,
          currentStreak: current,
          longestStreak: longest,
        };
      });
      return { success: true, data: { perHabit, days } };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
