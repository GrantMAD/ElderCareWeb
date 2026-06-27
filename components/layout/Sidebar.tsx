'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Pill,
  HeartPulse,
  Calendar,
  Bell,
  MapPin,
  Settings,
  LogOut,
  Heart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const navItems = [
  { href: '/dashboard',              icon: LayoutDashboard, label: 'Dashboard'     },
  { href: '/dashboard/medications',  icon: Pill,            label: 'Medications'   },
  { href: '/dashboard/wellness',     icon: HeartPulse,      label: 'Wellness'      },
  { href: '/dashboard/appointments', icon: Calendar,        label: 'Appointments'  },
  { href: '/dashboard/alerts',       icon: Bell,            label: 'Alerts'        },
  { href: '/dashboard/location',     icon: MapPin,          label: 'Location'      },
  { href: '/dashboard/settings',     icon: Settings,        label: 'Settings'      },
]

interface SidebarProps {
  familyName?: string
  elderName?: string
  userEmail?: string
}

export function Sidebar({ familyName = 'Johnson Family', elderName = 'Margaret Johnson', userEmail }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen sticky top-0',
        'bg-white dark:bg-surface-900 border-r border-surface-100 dark:border-surface-800',
        'transition-all duration-300 ease-in-out flex-shrink-0',
        collapsed ? 'w-[68px]' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center gap-3 px-4 py-5 border-b border-surface-100 dark:border-surface-800', collapsed && 'justify-center px-0')}>
        <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center flex-shrink-0 shadow-md">
          <Heart className="w-5 h-5 text-white" fill="currentColor" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-bold text-sm text-surface-900 dark:text-surface-100 truncate">{familyName}</p>
            <p className="text-xs text-surface-400 truncate">{elderName}</p>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-brand-50 dark:bg-brand-500/15 text-brand-600 dark:text-brand-400'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-surface-200',
                collapsed && 'justify-center px-0 w-10 mx-auto'
              )}
              title={collapsed ? label : undefined}
            >
              <Icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-brand-500')} />
              {!collapsed && <span className="truncate">{label}</span>}
              {!collapsed && href === '/dashboard/alerts' && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                  1
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className={cn('p-3 border-t border-surface-100 dark:border-surface-800 space-y-1')}>
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-surface-500 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors',
            collapsed && 'justify-center px-0'
          )}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>Collapse</span></>}
        </button>

        {!collapsed && userEmail && (
          <div className="px-3 py-2">
            <p className="text-xs text-surface-400 truncate">{userEmail}</p>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={cn(
            'flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-surface-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 transition-colors',
            collapsed && 'justify-center px-0'
          )}
          title={collapsed ? 'Sign out' : undefined}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  )
}
