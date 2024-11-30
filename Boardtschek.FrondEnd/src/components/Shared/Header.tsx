import React from "react";
import logo from "@/assets/logo.svg";
const Header: React.FC = () => {
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

          {/* Profile Icon */}
          <div className="relative">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-white">▼</span>
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;
