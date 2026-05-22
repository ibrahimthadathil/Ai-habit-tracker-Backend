import { STATUS } from "@/const/httpStatus";
import { HabitRepository } from "@/repositories/implementation/habit/habit-repository";
import { HabitLogRepository } from "@/repositories/implementation/habit/habitLog-repository";
import { last90Days, toDayKey } from "@/utils/dateHelper";
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
      const habit = await this.habitRepo.findHabit({
        _id: data.habitId,
        userId,
      });
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
      for (const l of logs) counts[l.completedDate] = (counts[l.completedDate] || 0) + 1;
      const data = days.map((d)=>({date:d,count:counts[d]||0}))
      return data
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
