import type { StaticImageData } from "next/image";
import food from "@/assets/images/food.jpg";
import health from "@/assets/images/health.jpg";
import history from "@/assets/images/history.jpg";
import nature from "@/assets/images/nature.jpg";

export const topicKeys = ["healthbenefits", "honeyhistory", "naturehoney", "honeyfood"] as const;
export type TopicKey = (typeof topicKeys)[number];

export const topicImages: Record<TopicKey, StaticImageData> = {
  healthbenefits: health,
  honeyhistory: history,
  naturehoney: nature,
  honeyfood: food,
};

export function isTopic(value: string): value is TopicKey {
  return (topicKeys as readonly string[]).includes(value);
}
