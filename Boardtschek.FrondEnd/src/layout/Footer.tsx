import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
const Footer: React.FC = () => {
  return (
    // <footer className="text-white py-8 bg-primary">
    //   <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
    //     {/* About Section */}
    //     <div>
    //       <h2 className="text-lg font-bold  mb-3">Boardtschek</h2>
    //       <p className="text-sm">
    //         Boardtschek is a platform that brings people together to explore and
    //         share ideas. Join us to start your journey.
    //       </p>
    //     </div>

    //     {/* Links Section */}
    //     <div>
    //       <h2 className="text-lg font-bold  mb-3">Quick Links</h2>
    //       <ul className="space-y-2 text-sm">
    //         <li>
    //           <a to="/about">About Us</a>
    //         </li>
    //         <li>
    //           <a to="/contact">Contact</a>
    //         </li>
    //         <li>
    //           <a to="/blog">Blog</a>
    //         </li>
    //         <li>
    //           <a to="/privacy">Privacy Policy</a>
    //         </li>
    //       </ul>
    //     </div>

    //     {/* Social Media Section */}
    //     {/* TODO: Fix icons */}
    //     <div>
    //       <h2 className="text-lg font-bold mb-3">Follow Us</h2>
    //       <ul className="flex space-x-4">
    //         <li className="text-2xl">
    //           <a
    //             to="https://www.facebook.com"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             {/* <Icons.facebook className="w-12 h-12 text-white hover:text-primary transition-colors duration-200" /> */}
    //           </a>
    //         </li>
    //         <li className="text-2xl">
    //           <a
    //             to="https://www.instagram.com"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             {/* <Icons.facebook className="w-12 h-12 hover:text-primary transition-colors duration-200" /> */}
    //           </a>
    //         </li>
    //         <li className="text-2xl">
    //           <a
    //             to="https://www.youtube.com"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             {/* <Icons.facebook className="w-12 h-12 hover:text-primary transition-colors duration-200" /> */}
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    //   <div className=" border-subtext mt-6 pt-4 text-center text-sm">
    //     © {new Date().getFullYear()} Boardtschek. All rights reserved.
    //   </div>
    // </footer>
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <Logo color="light" />
            <nav className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Link
                to="#"
                className="text-white/90 hover:text-white transition-colors"
              >
                Overview
              </Link>
              <Link
                to="#"
                className="text-white/90 hover:text-white transition-colors"
              >
                Features
              </Link>
              <Link
                to="#"
                className="text-white/90 hover:text-white transition-colors"
              >
                Careers
              </Link>
              <Link
                to="#"
                className="text-white/90 hover:text-white transition-colors"
              >
                Help
              </Link>
              <Link
                to="#"
                className="text-white/90 hover:text-white transition-colors"
              >
                Privacy
              </Link>
            </nav>
          </div>
          <div className="mt-8 md:mt-0">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <p className="text-sm text-white/90">Join our newsletter</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/10 text-white placeholder:text-white/50"
                />
                <Button variant="secondary">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Boardtschek. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              to="/"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="#"
              className="text-sm text-white/60 hover:text-white transition-colors"
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
