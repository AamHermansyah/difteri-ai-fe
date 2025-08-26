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