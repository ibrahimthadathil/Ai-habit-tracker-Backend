import { Service } from "typedi";
import { BaseRepository } from "../base-repository";
import { IHabitLog } from "@/types/habitTypes";
import { HabitLogmodal } from "@/models/habitLogs";
import { HabitModal } from "@/models/habit";

@Service()
export class HabitLogRepository extends BaseRepository<IHabitLog> {
  constructor() {
    super(HabitLogmodal);
  }

  async deleteMultiple(userId: string, habit: string) {
    return await HabitLogmodal.deleteMany({ _id: habit, userId });
  }

  async findOneAndUpdate(
    userId: string,
    habitId: string,
    completedDate: string,
  ) {
    return await HabitLogmodal.findOneAndUpdate(
      { userId, habitId, completedDate },
      { $setOnInsert: { userId, habitId, completedDate } },
      { upsert: true, new: true },
    );
  }
  async findOneAndDelete(
    userId: string,
    habitId: string,
    completedDate: string,
  ) {
    return await HabitLogmodal.findOneAndDelete({
      userId,
      habitId,
      completedDate,
    });
  }

  async findAllWithFilter(userId:string,completedate:string){
    return await HabitModal.find({userId,completedate})
  }
  async getAllHabit(filter:any){
      return await HabitLogmodal.find(filter)
    }
}
