import { CATEGORIES } from "@/const/habit";
import { IHabit } from "@/types/habitTypes";
import mongoose, { Schema } from "mongoose";

const habitSchema = new Schema<IHabit>({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },
    name: {type:String,required:true,trim:true},
    description:{type:String,default:'',trim:true},
    category:{type:String,enum:CATEGORIES,default:'Other'},
    frequency:{type:String,enum:["daily","weekly"],default:"daily"},
    targetDays:{type:Number,default:7,min:1,max:7},
    color:{type:String, default:"#6366f1"},
    icon:{type:String, default:"🎯"},
    isArchived:{type:Boolean,default:false},
    order:{type:Number,default:0}
},{timestamps:true})

export const HabitModal = mongoose.model<IHabit>('Habit',habitSchema)