import { ModeToggle } from '@/components/mode-toggle'
import { UserButton } from '@clerk/nextjs'

const Dashboard = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  )
}

export default Dashboard
