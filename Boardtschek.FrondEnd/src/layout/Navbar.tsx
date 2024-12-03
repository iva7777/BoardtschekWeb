import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import AccountMenu from "@/components/AccountMenu";
import { ModeToggle } from "@/components/ModeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background supports-[backdrop-filter]:bg-background/60">
      <div className="inner">
        <div className="flex h-16 items-center justify-between">
          <Logo size="large" showText={true} />
          <nav role="navigation" aria-label="Main navigation">
            <ul className="flex gap-8">
              <li>
                <Link to="/games" className="hover:text-[#333]">
                  All Games
                </Link>
              </li>
              <li>
                <Link to="/my-rented-games" className="hover:text-[#333]">
                  My Rented Games
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex h-16 items-center justify-between">
            <AccountMenu />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
