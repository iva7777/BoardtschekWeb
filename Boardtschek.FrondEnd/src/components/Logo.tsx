import React from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

interface LogoProps {
  size?: "small" | "medium" | "large";
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = "medium", showText = true }) => {
  const sizes = {
    small: "h-6 text-sm",
    medium: "h-8 text-xl",
    large: "h-10 text-2xl",
  };

  const [logoSize, textSize] = sizes[size].split(" ");

  return (
    <div className="flex items-center w-auto space-x-3">
      <Link to="/">
        <img src={logo} alt="Logo" className={logoSize} />
      </Link>
      {showText && (
        <Link to="/">
          <span
            className={`font-bold ${textSize} text-background-text leading-none`}
          >
            Boardtschek
          </span>
        </Link>
      )}
    </div>
  );
};
export default Logo;
