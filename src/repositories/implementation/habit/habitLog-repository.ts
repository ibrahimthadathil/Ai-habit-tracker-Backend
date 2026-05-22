import { Service } from "typedi";
import { BaseRepository } from "../base-repository";
import { IHabitLog } from "@/types/habitTypes";
import { HabitLogmodal } from "@/models/habitLogs";

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

  async findAllWithFilter(userId:string,completedDate:string){
    return await HabitLogmodal.find({userId,completedDate})
  }
  async getAllHabit(filter:any,sort?:Record<string,1|-1>){
      const query= HabitLogmodal.find(filter)
      if(sort) query.sort(sort)
      return await query
    }
    
}
