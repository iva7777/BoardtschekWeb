import { useState } from "react";
import { Button } from "../components/ui/button";
import { Star, Clock } from "lucide-react";
import { Card, CardContent, CardFooter } from "../components/ui/card";

interface GameCardProps {
  title: string;
  image: string;
  rating: number;
  quantity: number;
  nextAvailable?: string;
}

export function GameCard({
  title,
  image,
  rating,
  quantity,
  nextAvailable,
}: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="flex flex-col h-full transition-shadow duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
        />
      </div>

      {/* Card Content */}
      <CardContent className="flex-grow p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            ({rating.toFixed(1)})
          </span>
        </div>

        {/* Availability */}
        {quantity > 0 ? (
          <p className="text-sm text-green-600 font-medium">
            {quantity} available
          </p>
        ) : (
          <p className="text-sm text-orange-600 font-medium flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Next available: {nextAvailable}
          </p>
        )}
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          {/* Price */}

          {/* Add to Cart Button */}
          <Button
            variant="default"
            className="bg-accent hover:bg-accent-hover text-white"
            aria-label="Add to cart"
          >
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
