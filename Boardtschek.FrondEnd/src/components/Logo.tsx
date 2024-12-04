import React from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

interface LogoProps {
  size?: "small" | "medium" | "large";
  showText?: boolean;
  color?: "light" | "dark";
}

const Logo: React.FC<LogoProps> = ({
  size = "medium",
  showText = true,
  color = "dark",
}) => {
  const sizes = {
    small: "h-6 text-sm",
    medium: "h-8 text-xl",
    large: "h-10 text-2xl",
  };
  const colors = {
    light: "text-foreground-text",
    dark: "text-background-text",
  };

  const [logoSize, textSize] = sizes[size].split(" ");
  const textColorClass = colors[color];

  return (
    <div className="flex items-center w-auto space-x-3">
      <Link to="/">
        <img src={logo} alt="Logo" className={logoSize} />
      </Link>
      {showText && (
        <Link to="/">
          <span
            className={`font-bold ${textSize} ${textColorClass} text-background-text leading-none transition-opacity duration-600 ease-in-out`}
          >
            Boardtschek
          </span>
        </Link>
      )}
    </div>
  );
};
export default Logo;
