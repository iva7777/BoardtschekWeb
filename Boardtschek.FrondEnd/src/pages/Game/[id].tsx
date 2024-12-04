import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { LeaveComment } from "@/components/LeaveComment";
import CommentsCard from "@/components/CommentsCard";
import { StarRating } from "@/components/ui/star-rating";
import GameRentalDialog from "@/components/GameRentalDialog";

const GameDetails = () => {
  const [comments, setComments] = useState([
    {
      username: "John Doe",
      time: "2 minutes ago",
      comment: "Great game!",
      rating: 4,
    },
  ]);

  const handleAddComment = (newComment: { text: string; rating?: number }) => {
    const newCommentWithDetails = {
      username: "Current User",
      time: "Just now",
      comment: newComment.text,
      rating: newComment.rating || 0,
    };
    setComments((prevComments) => [newCommentWithDetails, ...prevComments]);
  };

  return (
    <div className="inner mx-auto flex mt-4 mb-6 md:flex-col">
      <div className="container mx-auto flex mt-4 mb-6 flex-col md:flex-row gap-7">
        <Card className="flex-1 md:w-1/3">
          <AspectRatio ratio={16 / 9} className="bg-gray-200 rounded-lg h-full">
            <CardContent>
              <img src="" alt="" />
            </CardContent>
          </AspectRatio>
        </Card>

        {/* Game Details */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-2xl font-bold">Game Title</h1>
            <p className="text-sm font-semibold text-gray-500">
              Difficulty: Hard
            </p>
            <div className="flex items-center space-x-1 mt-2">
              <span className="text-sm font-semibold">Avarage rating:</span>
              <StarRating rating={5} readonly size="md" />
            </div>
          </div>

          <GameRentalDialog />
          <LeaveComment onSubmit={handleAddComment} />
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        <CommentsCard comments={comments} />
      </div>
    </div>
  );
};

export default GameDetails;
