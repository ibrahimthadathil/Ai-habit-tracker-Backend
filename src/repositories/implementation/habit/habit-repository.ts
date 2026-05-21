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

  async findHabit(filter: QueryFilter<IHabit>) {
    return await HabitModal.findOne(filter).sort({ order: 1, createdAt: 1 });
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
}
