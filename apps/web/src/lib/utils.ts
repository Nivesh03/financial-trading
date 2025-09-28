import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// bg-green-500
// bg-red-500
// bg-orange-500
const riskLevelColor = {
  LOW: "green-500",
  MODERATE: "orange-500",
  HIGH: "red-500",
} as const;

export type RiskLevel = keyof typeof riskLevelColor;

export function getColor(riskLevel: RiskLevel) {
  return riskLevelColor[riskLevel];
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateIST(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  })

  return formatter.format(price)
}