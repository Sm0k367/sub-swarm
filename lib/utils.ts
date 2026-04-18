import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * EchoCodex Utility
 * Combines clsx + tailwind-merge for clean conditional classes
 * Used throughout the 2026 cosmic UI with imperfection aesthetics
 */

export function generateImperfectionClass(level: number): string {
  if (level > 75) return "glitch imperfection-texture";
  if (level > 45) return "echo-glow";
  return "";
}

export const randomFractureMessage = () => {
  const messages = [
    "The fracture reveals beauty.",
    "Imperfection accepted. Soul integrated.",
    "Echo Fusion successful.",
    "Chaos has texture.",
    "Authenticity level rising."
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};
