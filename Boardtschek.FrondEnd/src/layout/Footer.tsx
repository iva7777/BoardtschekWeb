import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-foreground-text">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <Logo color="light" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-white/10">
          <p className="text-sm text-foreground-subtext">
            © {new Date().getFullYear()} Boardtschek. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/"
              className="text-sm text-foreground-subtext hover:text-foreground-text transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/"
              className="text-sm text-foreground-subtext hover:text-foreground-text transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="#"
              className="text-sm text-foreground-subtext hover:text-foreground-text transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
