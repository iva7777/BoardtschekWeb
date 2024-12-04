import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function VotingButtons() {
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);

  const handleUpvote = () => setUpvotes((prev) => prev + 1);
  const handleDownvote = () => setDownvotes((prev) => prev + 1);

  return (
    <div className="flex gap-2">
      {/* Upvote Button */}
      <button
        onClick={handleUpvote}
        className="py-1.5 px-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2"
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
          ></path>
        </svg>
        <span>{upvotes}</span>
      </button>

      {/* Downvote Button */}
      <button
        onClick={handleDownvote}
        className="py-1.5 px-3 hover:text-red-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2"
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
          ></path>
        </svg>
        <span>{downvotes}</span>
      </button>
    </div>
  );
}

export default function GameDetails() {
  const [rating, setRating] = useState(0);

  return (
    <div className="container mx-auto p-6 flex flex- mt-4 mb-6 md:flex-col">
      {/* Left Section */}
      <div className="flex flex-row gap-7">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Game Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center bg-gray-200 rounded-lg h-48 mt-4 mb-6">
            <p>Game Preview</p>
          </CardContent>
          <CardFooter className="flex justify-end mt-4 mb-6">
            <Badge variant="secondary" className="text-xs">
              Featured
            </Badge>
          </CardFooter>
        </Card>

        {/* Middle Section */}
        <div className="flex-2 space-y-6 mt-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Game Title</h1>
            <p className="text-sm font-semibold text-gray-500">
              Difficulty: Level
            </p>
            <div className="flex items-center space-x-1 mt-2">
              <span className="text-sm font-semibold">Rating:</span>
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <svg
                    key={index}
                    onClick={() => setRating(ratingValue)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={ratingValue <= rating ? "gold" : "gray"}
                    viewBox="0 0 24 24"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
                  </svg>
                );
              })}
            </div>
          </div>
          <Button className="bg-[#FF6F59] hover:bg-[#FFC857]">Rent</Button>
          <Textarea
            placeholder="Answer the frequently asked question..."
            className="w-full"
          />
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-8 mb-11">
        <h2 className="text-xl font-bold">Leave a Comment</h2>
        <Textarea placeholder="Write your comment here" rows={4} />
        <Button className="mt-4">Post Comment</Button>
      </div>
      <Card className="flex-1 mt-8 mb-11">
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 items-start">
            <Avatar>
              <AvatarImage src="https://via.placeholder.com/40" alt="Avatar" />
            </Avatar>
            <div>
              <p className="font-semibold">Goshka Goshkareva</p>
              <p className="text-xs text-gray-500">5 min ago</p>
              <p className="mt-2">
                I really appreciate the insights and perspectives shared in this
                article. It's definitely given me something to think about.
              </p>
              <VotingButtons />
            </div>
          </div>
        </CardContent>
        <Separator />
        <CardFooter>
          <p className="text-sm text-gray-500">No more comments available.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
