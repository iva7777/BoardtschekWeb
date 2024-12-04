import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import AccountMenu from "@/components/AccountMenu";
import { ModeToggle } from "@/components/ModeToggle";
import SearchForm from "@/components/SearchForm";
import "../App.css";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background">
      <div className="nav-inner flex items-center">
        <div className="flex items-center justify-between w-full">
          <Logo size="large" showText={true} />
          <SearchForm size="large" />
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
          <div className="flex items-center">
            <AccountMenu />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
