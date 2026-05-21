import { IHabitLog } from "@/types/habitTypes";
import mongoose, { Schema } from "mongoose";

const habitLogSchema = new Schema<IHabitLog>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    habitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
      index: true,
    },
    completedDate: { type: String, required: true },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);
habitLogSchema.index(
  { userId: 1, habitId: 1, completedDate: 1 },
  { unique: true },
);

export const HabitLogmodal = mongoose.model<IHabitLog>("HabitLog", habitLogSchema);
