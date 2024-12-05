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

// const GameDetails = () => {
//   const [comments, setComments] = useState([
//     {
//       username: "John Doe",
//       time: "2 minutes ago",
//       comment: "Great game!",
//       rating: 4,
//     },
//   ]);

//   const handleAddComment = (newComment: { text: string; rating?: number }) => {
//     const newCommentWithDetails = {
//       username: "Current User",
//       time: "Just now",
//       comment: newComment.text,
//       rating: newComment.rating || 0,
//     };
//     setComments((prevComments) => [newCommentWithDetails, ...prevComments]);
//   };

//   return (
//     <div className="inner mx-auto flex mt-4 mb-6 md:flex-col">
//       <div className="container mx-auto flex mt-4 mb-6 flex-col md:flex-row gap-7">
//         <Card className="flex-1 md:w-1/3">
//           <AspectRatio ratio={16 / 9} className="bg-gray-200 rounded-lg h-full">
//             <CardContent>
//               <img src="" alt="" />
//             </CardContent>
//           </AspectRatio>
//         </Card>

//         {/* Game Details */}
//         <div className="flex-1 space-y-4">
//           <div>
//             <h1 className="text-2xl font-bold">Game Title</h1>
//             <p className="text-sm font-semibold text-gray-500">
//               Difficulty: Hard
//             </p>
//             <div className="flex items-center space-x-1 mt-2">
//               <span className="text-sm font-semibold">Avarage rating:</span>
//               <StarRating rating={5} readonly size="md" />
//             </div>
//           </div>

//           <GameRentalDialog />
//           <LeaveComment onSubmit={handleAddComment} />
//         </div>
//       </div>

//       {/* Comments Section */}
//       <div className="mt-8">
//         <h2 className="text-xl font-bold mb-4">Comments</h2>
//         <CommentsCard comments={comments} />
//       </div>
//     </div>
//   );
// };

// export default GameDetails;
const GameDetails = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [gameDetails, setGameDetails] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
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
      } catch (err: any) {
        setError(err.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  const handleAddComment = async (newComment: { text: string; rating?: number }) => {
    const loggedUser = await getUserDetails();

    try {
      const newCommentWithDetails = {
        username: `${loggedUser.firstName} ${loggedUser.lastName}`,
        time: "Just now",
        comment: newComment.text,
        score: newComment.rating || 0,
      };

      // Optionally post the comment to the backend
      await apiClient.post(`/api/Game/Rate/${gameId}`, {
        score: newComment.rating,
        comment: newComment.text,
      });

      const response = await apiClient.get(`/api/Game/Details/${gameId}`);
      setGameDetails(response.data);
      setComments((prevComments) => [newCommentWithDetails, ...prevComments]);
    } catch (err: any) {
      console.error("Error adding comment:", err.response?.data?.message || err.message);
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
          <AspectRatio ratio={16 / 9} className="bg-gray-200 rounded-lg h-full">
            <CardContent>
              <img src={gameDetails.imageUrl || ""} alt={gameDetails.title || "Game"} />
            </CardContent>
          </AspectRatio>
        </Card>

        {/* Game Details */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-2xl font-bold">{gameDetails.title}</h1>
            <p className="text-sm font-semibold text-gray-500">
              Difficulty: {gameDetails.difficulty}
            </p>
            <div className="flex items-center space-x-1 mt-2">
              <span className="text-sm font-semibold">Average rating:</span>
              <StarRating rating={gameDetails.averageRating || 0} readonly size="md" />
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
