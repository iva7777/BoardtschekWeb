import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import AccountMenu from "@/components/AccountMenu";
import { ModeToggle } from "@/components/ModeToggle";
import SearchForm from "@/components/SearchForm";
import "../App.css";

export default function Navbar() {
  const [showText, setShowText] = useState(true);
  const [showSearchForm, setShowSearchForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 320) {
        setShowText(false);
        setShowSearchForm(true);
      } else {
        setShowText(true);
        setShowSearchForm(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background">
      <div className="nav-inner flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex space-x-4 w-full">
            <Logo size="large" showText={showText} />
            {showSearchForm && <SearchForm size="medium" />}
          </div>
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="w-full"
          >
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
