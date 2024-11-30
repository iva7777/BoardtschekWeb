import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { logout } from "@/lib/utils.ts";

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
      <header className="text-#343A40 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold text-[#FFC857]">Boardtschek</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-x-8 text-sm font-medium">
            <Link to="/link1" className="hover:text-[#FFC857]">
              Link 1
            </Link>
            <Link to="/link2" className="hover:text-[#FFC857]">
              Link 2
            </Link>
            <Link to="/link3" className="hover:text-[#FFC857]">
              Link 3
            </Link>
            <Link to="/link4" className="hover:text-[#FFC857]">
              Link 4
            </Link>
          </nav>

          {/* Profile Icon and Dropdown */}
          <div className="relative">
            {/* Profile Icon */}
            <div
                className="w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
            >
              <span className="text-white">▼</span>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-md py-2 rounded w-40">
                  <button
                      onClick={() => {
                        logout();
                        alert("Logged out successfully!");
                        window.location.href = "/login"; // Redirect after logout
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                  <Link
                      to="/profile"
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </div>
            )}
          </div>
        </div>
      </header>
  );
};

export default Header;
