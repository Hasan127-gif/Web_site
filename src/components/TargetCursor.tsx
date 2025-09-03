import React, { useEffect } from 'react'

interface TargetCursorProps {
  targetSelector: string
  spinDuration?: number
  hideDefaultCursor?: boolean
}

export default function TargetCursor({ targetSelector, spinDuration = 1.6, hideDefaultCursor = true }: TargetCursorProps) {
  useEffect(() => {
    const root = document.documentElement
    if (hideDefaultCursor) root.style.cursor = 'none'
    root.setAttribute('data-target-cursor', targetSelector)
    root.setAttribute('data-target-cursor-spin', String(spinDuration))
    return () => {
      if (hideDefaultCursor) root.style.cursor = ''
      root.removeAttribute('data-target-cursor')
      root.removeAttribute('data-target-cursor-spin')
    }
  }, [targetSelector, spinDuration, hideDefaultCursor])

  return null
} 