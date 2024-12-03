import React from "react";
// import { Icons } from "@/components/ui/icons";

const Footer: React.FC = () => {
  return (
    <footer className="text-white py-8 bg-primary">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About Section */}
        <div>
          <h2 className="text-lg font-bold  mb-3">Boardtschek</h2>
          <p className="text-sm">
            Boardtschek is a platform that brings people together to explore and
            share ideas. Join us to start your journey.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h2 className="text-lg font-bold  mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        {/* TODO: Fix icons */}
        <div>
          <h2 className="text-lg font-bold mb-3">Follow Us</h2>
          <ul className="flex space-x-4">
            <li className="text-2xl">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <Icons.facebook className="w-12 h-12 text-white hover:text-primary transition-colors duration-200" /> */}
              </a>
            </li>
            <li className="text-2xl">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <Icons.facebook className="w-12 h-12 hover:text-primary transition-colors duration-200" /> */}
              </a>
            </li>
            <li className="text-2xl">
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <Icons.facebook className="w-12 h-12 hover:text-primary transition-colors duration-200" /> */}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className=" border-subtext mt-6 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Boardtschek. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
