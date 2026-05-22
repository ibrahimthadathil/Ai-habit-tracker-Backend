import mongoose, { Schema } from "mongoose";

const aiInsightsSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["weekly", "suggetion", "recovery", "chat", "morning"],
      required: true,
    },
    content: { type: String, required: true },
    meta: { type: mongoose.Schema.Types.Mixed, default: {} },
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const AIModal = mongoose.model("AIInsight", aiInsightsSchema);
