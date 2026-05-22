import { Service } from "typedi";
import { BaseRepository } from "../base-repository";
import { IHabit } from "@/types/habitTypes";
import { HabitModal } from "@/models/habit";
import { QueryFilter } from "mongoose";

@Service()
export class HabitRepository extends BaseRepository<IHabit> {
  constructor() {
    super(HabitModal);
  }

  async findHabit(filter: QueryFilter<IHabit>, sort?: Record<string, 1 | -1>) {
    let query =  HabitModal.findOne(filter);
    if (sort) query = query.sort(sort);
    return await query;
  }

  async getHabitCount(userId: string) {
    return await HabitModal.countDocuments({ userId });
  }

  async deleteUserHabit(userId: string, habit: string) {
    return await HabitModal.findOneAndDelete({ _id: habit, userId });
  }

  async updateByUser(userId: string, habitId: string, archived: boolean) {
    return await HabitModal.findOneAndUpdate(
      { _id: habitId, userId },
      { isArchived: archived },
    );
  }
  async getAllHabit(filter: Partial<IHabit>) {
    return await HabitModal.find(filter);
  }

  async reOrderHabit(order: string[], userId: string) {
    return await Promise.all(
      order.map((id, idx) =>
        HabitModal.updateOne({ _id: id, userId }, { $set: { order: idx } }),
      ),
    );
  }
}
