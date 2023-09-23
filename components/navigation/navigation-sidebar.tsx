'use client'

import { usePathname } from 'next/navigation'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import {
  BrainCircuit,
  Calendar,
  CandlestickChart,
  History,
  LayoutDashboard,
  Settings,
} from 'lucide-react'

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] })

interface Route {
  label: string
  icon: any
  href: string
  color: string
}

 const  routes: Array<Route> = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-emerald-500',
  },
  {
    label: 'Machine Calculator',
    icon: BrainCircuit,
    href: '/machine-calculator',
    color: 'text-sky-500',
  },
  {
    label: 'History',
    icon: History,
    href: '/history',
    color: 'text-violet-500',
  },
  {
    label: 'Materials',
    icon: CandlestickChart,
    href: '/materials',
    color: 'text-pink-500',
  },
  {
    label: 'Calendar',
    icon: Calendar,
    href: '/calendar',
    color: 'text-orange-500',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    color: 'text-zinc-400',
  },
]


const NavigationSidebar = () => {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-100 dark:bg-[#111827] text-gray-800 dark:text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="Logo" src="/logo.png"  />
          </div>
          <h1 className={cn('font-semibold', montserrat.className)}>
            Vacuum Massage Machine
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-gray-200 hover:text-gray-900 dark:hover:text-white dark:hover:bg-white/10 rounded-lg transition',
                pathname === route.href
                  ? 'dark:bg-white/10 dark:text-white bg-white text-gray-900'
                  : 'dark:text-zinc-400 text-gray-900'
              )}
            >
              <div className="flex items-center flex-1 ">
                <route.icon className={cn('w-5 h-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NavigationSidebar
