import { useState, ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { UserButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Logo } from "./Logo";
const NavItem = ({ href, children }: { href: string; children: ReactNode }) => (
  <Button variant="ghost">
    <a
      href={href}
      className="rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out"
    >
      {children}
    </a>
  </Button>
);

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* left */}
          <div className="flex items-center">
            <Logo width="30" height="30" />
            <div className="flex-shrink-0">
              {/* <span className="text-lg font-bold">Picz</span> */}
            </div>
          </div>
          {/* right */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavItem href="/images">Images</NavItem>
              <NavItem href="/upload">Upload</NavItem>
              <ModeToggle />
              <UserButton />
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset"
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
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <NavItem href="/upload">Upload</NavItem>
            <NavItem href="/images">Images</NavItem>
          </div>
        </div>
      )}
    </nav>
  );
};
