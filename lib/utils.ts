import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TIDYCAL_URL = "https://tidycal.com/dsauljameson/15-minute-meeting";
