import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const gradients = {
  primary: 'bg-gradient-to-br from-purple-600 via-purple-700 to-blue-800',
  secondary: 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500',
  accent: 'bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600',
  success: 'bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600',
  glass: 'bg-gradient-to-br from-white/20 via-white/10 to-white/5',
}
