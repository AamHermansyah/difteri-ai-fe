import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomCBId() {
  const randomNum = Math.floor(1000 + Math.random() * 9000); // angka 4 digit random
  return `CB-${randomNum}`;
}

export function normalizeData(data: Record<string, string | number>) {
  const result: Record<string, string | number> = {};

  for (const [key, value] of Object.entries(data)) {
    // cek apakah value string yang bisa dikonversi ke number
    if (typeof value === "string" && !isNaN(Number(value))) {
      result[key] = Number(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

export function censorName(name: string): string {
  if (!name) return "";

  return name
    .split(" ") // pisah per kata
    .map((word) => {
      if (word.length <= 2) {
        // kalau terlalu pendek, tidak perlu sensor
        return word;
      }

      const first = word[0];
      const last = word[word.length - 1];
      const middle = "*".repeat(word.length - 2);

      return first + middle + last;
    })
    .join(" ");
}

export const getColorProgress = (val: number) => {
  if (val < 40) return "[&>[data-slot=progress-indicator]]:bg-green-500";
  if (val < 70) return "[&>[data-slot=progress-indicator]]:bg-yellow-500";
  return "[&>[data-slot=progress-indicator]]:bg-red-500";
};