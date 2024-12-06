import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { LeaveComment } from "@/components/LeaveComment";
import CommentsCard from "@/components/CommentsCard";
import { StarRating } from "@/components/ui/star-rating";
import GameRentalDialog from "@/components/GameRentalDialog";
import apiClient from "@/api/axios";
import { useParams } from "react-router-dom";
import { getUserDetails } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AxiosError } from "axios"; // Ensure AxiosError is imported

interface Comment {
  username: string;
  time: string;
  comment: string;
  score: number;
}

interface GameDetails {
  id: string;
  title: string;
  difficulty: string;
  averageRating: number;
  description: string;
  imageUrl: string;
  ratings: Comment[];
}

interface NewComment {
  text: string;
  rating?: number;
}

const GameDetails = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/api/Game/Details/${gameId}`);
        setGameDetails(response.data);
        setComments(response.data.ratings || []);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || "An error occurred");
        } else {
          setError("An unexpected error occurred");
        }
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  const handleAddComment = async (newComment: NewComment) => {
    const loggedUser = await getUserDetails();

    try {
      const newCommentWithDetails = {
        username: `${loggedUser.firstName} ${loggedUser.lastName}`,
        time: "Just now",
        comment: newComment.text,
        score: newComment.rating || 0,
      };

      await apiClient.post(`/api/Game/Rate/${gameId}`, {
        score: newComment.rating,
        comment: newComment.text,
      });

      const response = await apiClient.get(`/api/Game/Details/${gameId}`);
      setGameDetails(response.data);
      setComments((prevComments) => [newCommentWithDetails, ...prevComments]);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.error(
          "Error adding comment:",
          err.response?.data?.message || err.message
        );
      } else {
        console.error("An unexpected error occurred while adding the comment.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="inner mx-auto flex mt-4 mb-6 md:flex-col">
      <div className="container mx-auto flex mt-4 mb-6 flex-col md:flex-row gap-7">
        <Card className="flex-1 md:w-1/3">
          <CardContent>
            <AspectRatio
              ratio={16 / 9}
              className="bg-gray-200 rounded-lg h-full"
            >
              <img
                src={gameDetails?.imageUrl || ""}
                alt={gameDetails?.title || "Game"}
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </CardContent>
        </Card>

        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-2xl font-bold">{gameDetails?.title}</h1>
            <p className="text-sm font-semibold text-gray-500">
              Difficulty: {gameDetails?.difficulty}
            </p>
            <div className="flex items-center space-x-1 mt-2">
              <span className="text-sm font-semibold">Average rating:</span>
              <StarRating
                rating={gameDetails?.averageRating || 0}
                readonly
                size="md"
              />
            </div>
          </div>
          <div>
            <h2 className="font-bold">Description:</h2>
            {gameDetails?.description}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <GameRentalDialog />
            <Link to={`/edit-game/${gameDetails?.id}`}>
              <Button variant="outlinePrimary">Edit Game</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <LeaveComment onSubmit={handleAddComment} />
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        <CommentsCard comments={comments} />
      </div>
    </div>
  );
};

export default GameDetails;
