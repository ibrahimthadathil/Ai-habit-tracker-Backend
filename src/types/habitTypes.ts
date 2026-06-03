import { CATEGORIES } from "@/const/habit";
import { Document, Types } from "mongoose";

export interface IHabit extends Document {
  userId: Types.ObjectId | string;

  name: string;

  description: string;

  category: (typeof CATEGORIES)[number];

  frequency: "daily" | "weekly";

  targetDays: number;

  color: string;

  icon: string;

  isArchived: boolean;

  order: number;
  createdAt?: Date;
}

export interface IHabitLog extends Document {
  userId: Types.ObjectId | string;
  habitId: Types.ObjectId | string;
  completedDate: string;
  notes: string;

  createdAt: Date;
  updatedAt: Date;
}
