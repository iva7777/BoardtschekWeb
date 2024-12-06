import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
// import { SatisfactionDialog } from "@/components/return-game/SatisfactionDialog";
import apiClient from "@/api/axios";

interface OverdueRentalCardProps {
  id: string;
  name: string;
  image: string;
  rentalDate: string;
  dueDate: string;
}

export function OverdueRentalCard({
  id,
  name,
  image,
  rentalDate,
  dueDate,
}: OverdueRentalCardProps) {
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGameReturned, setIsGameReturned] = useState(false);
  // const [wantsToComment, setWantsToComment] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  // const handleFeedbackSubmit = async (comment: {
  //   text: string;
  //   rating?: number;
  // }) => {
  //   console.log("Feedback Submitted:", comment);

  //   try {
  //     await apiClient.post(`/api/Rental/Return/${id}`);
  //     setIsGameReturned(true);
  //   } catch (error) {
  //     console.error("Error returning game:", error);
  //   }

  //   setIsDialogOpen(false);
  // };

  const handleReturnGame = async () => {
    setIsReturning(true);

    try {
      await apiClient.post(`/api/Rental/Return/${id}`);
      setIsGameReturned(true);
    } catch (error) {
      console.error("Error returning the game:", error);
    } finally {
      setIsReturning(false);
    }
  };

  return (
    <Card key={id} className="overflow-hidden">
      <div className="relative">
        <Badge className="absolute left-2 top-2 z-10 bg-destructive hover:bg-destructive">
          <span className="flex items-center gap-1">
            Overdue <AlertCircle className="h-4 w-4" />
          </span>
        </Badge>
        <img
          src={image}
          alt={name}
          width={300}
          height={200}
          className="object-cover w-full h-[200px]"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-4">
        <div className="text-sm text-muted-foreground text">
          <p>Rented: {new Date(rentalDate).toLocaleDateString()}</p>
          <p>Due: {new Date(dueDate).toLocaleDateString()}</p>
        </div>

        {!isGameReturned ? (
          <Button
            className="w-full"
            variant="destructive"
            onClick={handleReturnGame}
            disabled={isReturning}
          >
            {isReturning ? "Returning..." : "Return Game"}
          </Button>
        ) : (
          <>
            <p className="text-green-600 font-medium">
              You have successfully returned the game {name}.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Would you like to leave a comment or rating?
            </p>
            {/* <Button
              variant="outlinePrimary"
              className="w-full mt-2"
              onClick={handleLeaveComment}
            >
              Yes, leave a comment
            </Button>
            <Button
              variant="secondary"
              className="w-full mt-2"
              onClick={handleNoComment} 
            >
              No, just return
            </Button> */}
          </>
        )}
      </CardFooter>
      {/* {isDialogOpen && (
        <SatisfactionDialog
          onSubmit={handleFeedbackSubmit}
          wantsToComment={wantsToComment}
          setWantsToComment={setWantsToComment} 
        />
      )} */}
    </Card>
  );
}
