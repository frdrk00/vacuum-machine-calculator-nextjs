import Navbar from '@/components/navigation/navbar'
import NavigationSidebar from '@/components/navigation/navigation-sidebar'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="max-sm:hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <NavigationSidebar />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  )
}

export default MainLayout
