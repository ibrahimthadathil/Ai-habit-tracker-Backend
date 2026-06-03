import  { Document, Types } from "mongoose";

export type AIInsightType =
  | "weekly"
  | "suggetion"
  | "recovery"
  | "chat"
  | "morning";

export interface IAIInsight extends Document {
  userId: Types.ObjectId;
  type: AIInsightType;
  content: string;
  meta: Record<string, any>;
  generatedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}