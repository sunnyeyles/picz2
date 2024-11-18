import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { UserButton } from "@clerk/clerk-react";
import logo from "../assets/prosperly_logo.webp";
const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out"
  >
    {children}
  </a>
);

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* left */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-8 p-2" />
            <div className="flex-shrink-0">
              <span className="text-lg font-bold">Prosperly</span>
            </div>
          </div>
          {/* right */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavItem href="/dashboard">Dashboard</NavItem>
              <NavItem href="/properties">Properties</NavItem>
              <NavItem href="/reports">Reports</NavItem>
              <NavItem href="/documents">Documents</NavItem>
              <NavItem href="/contact">Contact</NavItem>
              <NavItem href="/settings">Settings</NavItem>
              <ModeToggle />
              <UserButton />
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavItem href="/dashboard">Dashboard</NavItem>
            <NavItem href="/properties">Properties</NavItem>
            <NavItem href="/reports">Reports</NavItem>
            <NavItem href="/documents">Documents</NavItem>
            <NavItem href="/contact">Contact</NavItem>
            <NavItem href="/settings">Settings</NavItem>
          </div>
        </div>
      )}
    </nav>
  );
};
