import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function calculateProgress(layers) {
  if (!layers || layers.length === 0) return 0
  const total = layers.reduce((sum, layer) => sum + (layer.progress_percent || 0), 0)
  return Math.round(total / layers.length)
}

export function getLayerStatus(progressPercent) {
  if (progressPercent === 0) return 'not_started'
  if (progressPercent === 100) return 'completed'
  return 'in_progress'
}

export function getLayerColor(layerId) {
  const colors = {
    identity: 'from-violet to-cyan',
    product: 'from-cyan to-violet',
    audience: 'from-violet to-cyan',
    systems: 'from-cyan to-violet',
    financial: 'from-violet to-cyan',
    expansion: 'from-cyan to-violet'
  }
  return colors[layerId] || 'from-cyan to-violet'
}
