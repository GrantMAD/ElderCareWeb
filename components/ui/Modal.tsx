'use client'
import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './Button'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  children: React.ReactNode
  footer?: React.ReactNode
  showClose?: boolean
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-3xl',
}

export function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  children,
  footer,
  showClose = true,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Lock body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />

      {/* Panel */}
      <div
        className={cn(
          'relative w-full bg-white dark:bg-surface-800 rounded-2xl shadow-2xl',
          'border border-surface-200 dark:border-surface-700',
          'animate-fade-in',
          sizeClasses[size]
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-start justify-between p-6 pb-4">
            <div>
              {title && (
                <h2 id="modal-title" className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{description}</p>
              )}
            </div>
            {showClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="ml-4 flex-shrink-0 -mr-1 -mt-1"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}

        {/* Body */}
        <div className={cn('px-6', !title && 'pt-6', !footer && 'pb-6')}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-surface-100 dark:border-surface-700 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
