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
  return (
    <Card className="flex flex-col h-full transition-shadow duration-300 hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out"
        />
      </div>
      <CardContent className="flex-grow p-4">

        <h3 className="text-lg font-semibold text-subtext mb-2">{title}</h3>

        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(rating)
                  ? "text-yellow-400 fill-current"
                  : "text-subtext"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-subtext">
            ({rating.toFixed(1)})
          </span>
        </div>

        {quantity > 0 ? (
          <p className="text-sm text-green-600 font-medium">
            {quantity} available for renting
          </p>
        ) : (
          <p className="text-sm text-orange-600 font-medium flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Next available: 12/12/2024{nextAvailable}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <Button variant="default" aria-label="rent" className="text-white">
            Rent
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
