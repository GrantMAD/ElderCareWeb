// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(typeof date === 'string' ? new Date(date) : date)
}

export function formatTime(date: string | Date) {
  return new Intl.DateTimeFormat('en-ZA', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(typeof date === 'string' ? new Date(date) : date)
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date()
  const target = typeof date === 'string' ? new Date(date) : date
  const diffMs = now.getTime() - target.getTime()
  const diffMins = Math.floor(diffMs / 60_000)
  const diffHours = Math.floor(diffMs / 3_600_000)
  const diffDays = Math.floor(diffMs / 86_400_000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  return formatDate(date)
}

export function getMoodEmoji(score?: number): string {
  if (!score) return '—'
  const emojis = ['', '😞', '😕', '😐', '🙂', '😊']
  return emojis[score] ?? '—'
}

export function getMoodLabel(score?: number): string {
  if (!score) return 'No data'
  const labels = ['', 'Very Low', 'Low', 'Neutral', 'Good', 'Great']
  return labels[score] ?? 'No data'
}

export function getEnergyLabel(score?: number): string {
  if (!score) return 'No data'
  if (score <= 2) return 'Low'
  if (score === 3) return 'Medium'
  return 'High'
}
