import { fields } from "@/const/habit";
import { STATUS } from "@/const/httpStatus";
import { HabitRepository } from "@/repositories/implementation/habit/habit-repository";
import { HabitLogRepository } from "@/repositories/implementation/habit/habitLog-repository";
import { IHabit } from "@/types/habitTypes";
import { Request } from "express";
import { ObjectId } from "mongoose";
import { Service } from "typedi";

@Service()
export class HabitServce {
  constructor(
    private habitRepo: HabitRepository,
    private habitLogRepo: HabitLogRepository,
  ) {}

  async gethabits(userId: string, includeArchived: string) {
    try {
      const filter: Partial<IHabit> = { userId };
      if (includeArchived !== "true") filter.isArchived = false;
      const habits = await this.habitRepo.getAllHabit(filter);
      if (habits) return { success: true, habits };
      return { success: false };
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async createHabit(newHabit: Omit<IHabit, "userId">, userId: string) {
    try {
      if (!newHabit.name)
        return { success: false, message: "Habit name is required" };
      const count = await this.habitRepo.getHabitCount(userId);
      const habit = await this.habitRepo.create({
        ...newHabit,
        userId,
        order: count,
      });
      if (habit) return { success: true, habit };
      else return { success: false, message: STATUS.BAD_REQUEST.message };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async updateHabit(
    habitId: string,
    userId: string,
    updateData: Partial<IHabit>,
  ) {
    try {
      const habit = await this.habitRepo.findHabit({ userId, _id: habitId });
      if (!habit) return { success: false, message: STATUS.NOT_FOUND.message };
      for (const f of fields) {
        if (updateData[f] !== undefined) {
          habit[f] = updateData[f] as never;
        }
      }
      const updatedHabit = await this.habitRepo.update(habitId, habit);
      if (updatedHabit) return { success: true, updatedHabit };
      else return { success: false, message: "Failed to update" };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deleteHabit(userId: string, habitId: string) {
    try {
      const habit = await this.habitRepo.deleteUserHabit(userId, habitId);
      if (!habit) return { success: false, message: STATUS.NOT_FOUND.message };
      await this.habitLogRepo.deleteMultiple(userId, habitId);
      return { success: true, message: "Deleted" };
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async archiveHabit(userId: string, habitId: string) {
    try {
      const habit = await this.habitRepo.findHabit({ _id: habitId, userId });
      if (!habit) return { success: false, message: STATUS.NOT_FOUND.message };
      const updatedHabit = await this.habitRepo.updateByUser(
        userId,
        habitId,
        !habit.isArchived,
      );
      return { success: true, updatedHabit };
    } catch (erro) {
      throw new Error((erro as Error).message);
    }
  }

  async re_orderHabits(orders: string[], userId: string) {
    try {
      if (!Array.isArray(orders))
        return { success: false, message: STATUS.BAD_REQUEST.message };
      const reordered = await this.habitRepo.reOrderHabit(orders, userId);
      if (reordered) return { success: true, message: "Reordered" };
      return { success: false, message: "Failed to Re-order" };
    } catch (er) {
      return { success: false, message: (er as Error).message };
    }
  }
}
