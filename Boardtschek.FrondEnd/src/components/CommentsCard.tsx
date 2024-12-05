import { StarRating } from "@/components/ui/star-rating";

interface Comment {
  username: string;
  time: string;
  comment: string;
  score?: number; 
}

interface CommentsCardProps {
  comments: Comment[]; 
}

const CommentsCard: React.FC<CommentsCardProps> = ({ comments }) => {
  return (
    <div className="space-y-4 mt-6">
      {comments.map((comment, index) => (
        <div key={index} className="border-b pb-4">
          <div className="flex items-center space-x-3">
            <div className="font-semibold">{comment.username}</div>
            <div className="text-sm text-gray-500">{comment.time}</div>
          </div>
          <div className="mt-2 text-gray-700">{comment.comment}</div>
          <div className="mt-2 flex space-x-1">
            {comment.score != null ? (
              <StarRating
                rating={comment.score}
                onChange={() => {}}
                size="md"
                readonly={true}
              />
            ) : (
              <span className="text-sm text-gray-500">No rating yet</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsCard;
