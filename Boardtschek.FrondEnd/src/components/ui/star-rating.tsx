import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onChange,
  size = "md",
  readonly = false,
}) => {
  const [hover, setHover] = useState(0);

  const handleMouseEnter = (starIndex: number) => {
    if (!readonly) {
      setHover(starIndex);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHover(0);
    }
  };

  const handleClick = (starIndex: number) => {
    if (!readonly && onChange) {
      onChange(starIndex);
    }
  };

  const starSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const wholeStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div
      className="flex items-center"
      role="group"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <div key={starIndex} className="relative">
          <Star
            className={cn(
              starSizes[size],
              "transition-colors",
              readonly ? "cursor-default" : "cursor-pointer",
              hover >= starIndex || (!hover && starIndex <= wholeStars)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            )}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
            aria-hidden="true"
          />
          {/* Add half-star logic for readonly */}
          {readonly && hasHalfStar && starIndex === wholeStars + 1 && (
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star
                className={cn(
                  starSizes[size],
                  "text-yellow-400 fill-yellow-400 absolute left-0"
                )}
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      ))}
      {readonly && (
        <span className="ml-2 text-sm text-gray-600" aria-hidden="true">
          {rating.toFixed(1)} {/* Display rating with one decimal place */}
        </span>
      )}
    </div>
  );
};
