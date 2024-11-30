import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { logout } from "@/lib/utils.ts";

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    alert("Logged out successfully!");
    window.location.href = "/login"; // Redirect after logout
  };

  return (
      <header className="text-dark-gray py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" aria-label="Home">
              <img src={logo} alt="Boardtschek Logo" className="h-8 w-auto" />
            </Link>
            <Link to="/" aria-label="Home">
              <span className="text-xl font-bold text-yellow-500">Boardtschek</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            <Link to="/games" className="hover:text-gray-700">
              All Games
            </Link>
            <Link to="/my-rentals" className="hover:text-gray-700">
              My Rented Games
            </Link>
          </nav>

          {/* Profile Icon and Dropdown */}
          <div className="relative">
            <button
                className="w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
                aria-label="Toggle profile dropdown"
            >
              <span className="text-white">▼</span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-md py-2 rounded-md w-40">
                  <Link
                      to="/profile"
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
            )}
          </div>
        </div>
      </header>
  );
};

export default Header;
