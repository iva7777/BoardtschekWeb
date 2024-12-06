import { Button } from "../components/ui/button";
// import { Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import apiClient from "@/api/axios";

interface GameCardProps {
  id: string;
  title: string;
  image: string;
}

export function GameCard({ id, title, image }: GameCardProps) {
  // State variables related to like button logic (commented out)
  // const [isLiked, setIsLiked] = useState(false);
  // const [isError, setIsError] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect for fetching like status (commented out)
  // useEffect(() => {
  //   const fetchLikeStatus = async () => {
  //     try {
  //       const response = await apiClient.get(`/api/Game/Like/${gameId}`);
  //       setIsLiked(response.data.isLiked);
  //     } catch (error) {
  //       console.error("Error fetching like status:", error);
  //       setIsError("Failed to fetch like status.");
  //     }
  //   };

  //   fetchLikeStatus();
  // }, [gameId]);

  // Handle like button toggle (commented out)
  // const handleLikeToggle = async () => {
  //   setIsLoading(true);

  //   try {
  //     const newLikeStatus = !isLiked;
  //     const response = await apiClient.post(`/api/Game/Like`, { gameId });

  //     if (response.status === 200) {
  //       setIsLiked(newLikeStatus);
  //     }
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       console.error("Error fetching like status:", error.message);
  //       setIsError("Failed to like/unlike the game.");
  //     } else {
  //       console.error("An unknown error occurred", error);
  //       setIsError("An unexpected error occurred.");
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-subtext">{title}</h3>

          {/* Commented out Like Button */}
          {/* <Button
            variant="outlinePrimary"
            aria-label="like"
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={handleLikeToggle}
            disabled={isLoading} 
          >
            <Heart
              className={`w-5 h-5 ${isLiked ? "text-red-500 fill-current" : "text-subtext"}`}
            />
          </Button> */}
        </div>
        {/* 
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
        </div> */}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center space-x-3 w-full">
          <Link to={`/game/${id}`}>
            <Button variant="default" aria-label="rent" className="text-white">
              Rent game
            </Button>
          </Link>
          <Link to={`/game/${id}`}>
            <Button variant="outlinePrimary" aria-label="learn more">
              Learn more
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
