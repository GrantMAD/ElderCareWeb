'use client'
import { Bell, User, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface TopBarProps {
  title: string
  subtitle?: string
  activeAlertCount?: number
  userEmail?: string
  onAlertsClick?: () => void
}

export function TopBar({
  title,
  subtitle,
  activeAlertCount = 0,
  userEmail,
  onAlertsClick,
}: TopBarProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-surface-900/80 backdrop-blur-sm border-b border-surface-100 dark:border-surface-800">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Title */}
        <div>
          <h1 className="text-lg font-semibold text-surface-900 dark:text-surface-100 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-surface-400 mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Alert bell */}
          <button
            onClick={onAlertsClick}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-surface-100 transition-colors"
            id="topbar-alerts-button"
            aria-label={`${activeAlertCount} active alerts`}
          >
            <Bell className="w-5 h-5" />
            {activeAlertCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 h-9 px-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              id="topbar-user-menu"
            >
              <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              {userEmail && (
                <span className="text-sm text-surface-600 dark:text-surface-400 hidden sm:block max-w-[140px] truncate">
                  {userEmail}
                </span>
              )}
              <ChevronDown className={cn('w-4 h-4 text-surface-400 transition-transform', userMenuOpen && 'rotate-180')} />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl shadow-card-lg z-50 overflow-hidden animate-fade-in">
                {userEmail && (
                  <div className="px-3 py-2.5 border-b border-surface-100 dark:border-surface-700">
                    <p className="text-xs text-surface-400 truncate">{userEmail}</p>
                  </div>
                )}
                <a
                  href="/dashboard/settings"
                  className="block px-3 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Settings
                </a>
                <a
                  href="/dashboard/settings/subscription"
                  className="block px-3 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Subscription
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
