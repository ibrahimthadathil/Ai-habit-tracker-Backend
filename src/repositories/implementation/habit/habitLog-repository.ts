import { Service } from "typedi";
import { BaseRepository } from "../base-repository";
import { IHabitLog } from "@/types/habitTypes";
import { HabitLogmodal } from "@/models/habitLogs";

@Service()
export class HabitLogRepository extends BaseRepository<IHabitLog>{
    constructor(){
        super(HabitLogmodal)
    }

     async deleteMultiple(userId:string,habit:string){
        return await HabitLogmodal.deleteMany({_id:habit,userId})
    }
}