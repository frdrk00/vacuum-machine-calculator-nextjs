import {
  BrainCircuit,
  Calendar,
  CandlestickChart,
  History,
  LayoutDashboard,
  Settings,
  Aperture,
} from 'lucide-react'

interface Route {
  label: string
  icon: any
  href: string
  color: string
}

export const routes: Array<Route> = [
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
    label: 'Recipes',
    icon: Aperture,
    href: '/recipes',
    color: 'text-red-500',
  },
  {
    label: 'Materials',
    icon: CandlestickChart,
    href: '/materials',
    color: 'text-pink-500',
  },
  {
    label: 'History',
    icon: History,
    href: '/history',
    color: 'text-violet-500',
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
