import { CATEGORIES } from "@/const/habit";
import { Document, Types } from "mongoose";

export interface IHabit extends Document {
  userId: Types.ObjectId;

  name: string;

  description: string;

  category: (typeof CATEGORIES)[number] ;

  frequency: "daily" | "weekly";

  targetDays: number;

  color: string;

  icon: string;

  isArchived: boolean;

  order: number;
}