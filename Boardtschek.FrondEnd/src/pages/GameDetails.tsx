import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function GameDetails() {
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
            <p className="text-sm font-semibold text-gray-500">Difficulty: Level</p>
            <div className="flex items-center space-x-1 mt-2">
              <span className="text-sm font-semibold">Rating:</span>
              {[...Array(4)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-yellow-500"
                >
                  <path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
                </svg>
              ))}
            </div>
          </div>
          <Button className="bg-[#FF6F59] hover:bg-[#FFC857]">Rent</Button>
          <Textarea
            placeholder="Answer the frequently asked question..."
            className="w-full"
          />
        </div>
      </div>
      {/* Comments Section */}
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
                I really appreciate the insights and perspectives shared in this article. It's definitely given me something to think about.
              </p>
              <div className="flex space-x-2 mt-2">
                <Button size="sm" variant="outline">
                  Upvote
                </Button>
                <Button size="sm" variant="outline">
                  Downvote
                </Button>
              </div>
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
