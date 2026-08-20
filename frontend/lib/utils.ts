import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount)
}

export function formatCarbon(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(2)} metric tons CO₂`
  }
  return `${kg.toFixed(2)} kg CO₂`
}
