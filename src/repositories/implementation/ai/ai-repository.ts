import { Service } from "typedi";
import { BaseRepository } from "../base-repository";
import { IAIInsight } from "@/types/AiInsights";
import { AIModal } from "@/models/AIInsights";


@Service()
export class AIRepository extends BaseRepository <IAIInsight>{
    constructor(){
        super(AIModal)
    }
    
}