import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { logout } from "@/lib/utils.ts";

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="text-[#343A40] py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          </Link>
          <Link to="/">
            <span className="text-xl font-bold text-[#FFC857]">Boardtschek</span>
          </Link>
        </div>
        {/* Navigation Links */}
        <nav className="space-x-8 text-sm font-medium">
          <a href="#" className="hover:text-[#333]">
            All Games
          </a>
          <a href="#" className="hover:text-[#333]">
            My Rented Games
          </a>
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
                  navigate("/login");
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
