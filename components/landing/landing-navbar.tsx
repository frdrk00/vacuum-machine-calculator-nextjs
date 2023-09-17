'use client'

import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ModeToggle } from '../mode-toggle'

const LandingNavbar = () => {
  const { isSignedIn } = useAuth()

  return (
    <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
      <Button variant="outline" className="rounded-full">
        Get Started
      </Button>
    </Link>
  )
}

export default LandingNavbar
