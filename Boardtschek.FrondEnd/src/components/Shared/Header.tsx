import React, {useState} from "react";
import logo from "@/assets/logo.svg";
import {logout} from "@/lib/utils.ts";

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
            <img src={logo} alt="Logo" className="h-8 w-auto"/>
            <span className="text-xl font-bold text-[#FFC857]">Boardtschek</span>
          </div>
          {/* Navigation Links */}
          <nav className="space-x-8 text-sm font-medium">
            <a href="#" className="hover:text-[#FFC857]">
              Link 1
            </a>
            <a href="#" className="hover:text-[#FFC857]">
              Link 2
            </a>
            <a href="#" className="hover:text-[#FFC857]">
              Link 3
            </a>
            <a href="#" className="hover:text-[#FFC857]">
              Link 4
            </a>
          </nav>


          {/* Profile Icon and Dropdown */}
          {/* Profile Icon */}
          <div className="relative">
            <div
                className="w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer"
                onClick={toggleDropdown}
            >
              <span className="text-white">▼</span>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-md py-2 rounded w-40">
                  <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                  <a
                      href="/profile"
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                </div>
            )}
          </div>
        </div>
      </header>
  );
};

export default Header;
