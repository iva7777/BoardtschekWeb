// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { useState } from "react";

// interface SatisfactionDialogProps {
//   onSubmit: (comment: { text: string; rating?: number }) => void;
//   wantsToComment: boolean;
//   setWantsToComment: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export function SatisfactionDialog({
//   onSubmit,
//   wantsToComment,
//   setWantsToComment,
// }: SatisfactionDialogProps) {
//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState<number | undefined>(undefined);

//   const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setComment(e.target.value);
//   };

//   const handleSubmit = () => {
//     onSubmit({ text: comment, rating });
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="destructive" className="w-full">
//           Open Feedback Form
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Return Game Feedback</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4">
//           <Button
//             variant="outlinePrimary"
//             onClick={() => setWantsToComment(!wantsToComment)} 
//             className="w-full"
//           >
//             {wantsToComment ? "Hide Comment Section" : "Add a Comment"}
//           </Button>

//           {wantsToComment && (
//             <Textarea
//               value={comment}
//               onChange={handleCommentChange}
//               placeholder="Your feedback..."
//               className="mt-2"
//             />
//           )}

//           {/* Rating component, assuming you want to include a simple rating system */}
//           <div className="flex items-center">
//             <span>Rating: </span>
//             <input
//               type="number"
//               min="1"
//               max="5"
//               value={rating || 0}
//               onChange={(e) => setRating(Number(e.target.value))}
//               className="ml-2 border p-2 rounded"
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button variant="default" onClick={handleSubmit}>
//             Submit
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
