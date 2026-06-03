import { IHabit } from "@/types/habitTypes";

export const CATEGORIES = [
  "Health",
  "Fitness",
  "Learning",
  "Mindfulness",
  "Productivity",
  "Social",
  "Finance",
  "Creative",
  "Other",
] as const;

export const fields: (keyof IHabit)[] = [
  "name",
  "description",
  "category",
  "frequency",
  "targetDays",
  "color",
  "icon",
  "isArchived",
  "order",
];
