import { UserButton } from "@clerk/nextjs"
import NavigationMobileSidebar from "./navigation-mobile-sidebar"
import { ModeToggle } from "../mode-toggle"

const Navbar = () => {
    return (
        <div className="flex items-center p-4 border-b">
          <NavigationMobileSidebar  />
          <div className="flex w-full justify-end gap-x-5 items-center">
            <ModeToggle />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      )
}

export default Navbar
