'use client'
import { Home, Pill, Heart, Calendar, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const pathname = usePathname()

  const links = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/dashboard/medications', label: 'Meds', icon: Pill },
    { href: '/dashboard/wellness', label: 'Wellness', icon: Heart },
    { href: '/dashboard/appointments', label: 'Visits', icon: Calendar },
    { href: '/dashboard/alerts', label: 'Alerts', icon: AlertTriangle },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800 pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`) && link.href !== '/dashboard'

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full space-y-1',
                isActive
                  ? 'text-brand-600 dark:text-brand-400'
                  : 'text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive && 'fill-current opacity-20')} />
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
