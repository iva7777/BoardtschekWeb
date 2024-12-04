import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-foreground-text">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <Logo color="light" />
            <nav className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Link
                to="#"
                className="text-foreground-text hover:text-white transition-colors"
              >
                About Us
              </Link>
              <Link
                to="#"
                className="text-foreground-text hover:text-white transition-colors"
              >
                Contact
              </Link>
              <Link
                to="#"
                className="text-foreground-text hover:text-white transition-colors"
              >
                Blog
              </Link>
              <Link
                to="#"
                className="text-foreground-text hover:text-white transition-colors"
              >
                Help
              </Link>
              <Link
                to="#"
                className="text-foreground-text hover:text-white transition-colors"
              >
                Privacy
              </Link>
            </nav>
          </div>
          <div className="mt-8 md:mt-0">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <p className="text-sm text-foreground-text">
                Join our newsletter
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/10 text-foreground-text placeholder:text-white/50"
                />
                <Button variant="secondary">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-sm text-foreground-subtext">
            © {new Date().getFullYear()} Boardtschek. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
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
