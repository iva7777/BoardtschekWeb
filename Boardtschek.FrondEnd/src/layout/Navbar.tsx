import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import AccountMenu from "@/components/AccountMenu";
import { ModeToggle } from "@/components/theme-provider/ModeToggle";
import SearchForm from "@/components/SearchForm";
import "../App.css";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background">
      <div className="nav-inner flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex space-x-4 w-full">
            <Logo size="large" showText={false} />
            <SearchForm size="medium" />
          </div>
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="w-full"
          >
            <ul className="flex gap-8">
              <li>
                <Link
                  to="/games"
                  className="text-background-subtext hover:text-background-text transition-colors"
                >
                  All Games
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="text-background-subtext hover:text-background-text transition-colors"
                >
                  My Rented Games
                </Link>
              </li>
              <li>
                <Link
                  to="/add-game"
                  className="text-background-subtext hover:text-background-text transition-colors"
                >
                  Add Game
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center">
            <AccountMenu />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
