// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";

// interface RentalHistoryCardProps {
//   id: number;
//   name: string;
//   image: string;
//   rentalDate: string;
//   returnDate: string;
// }

// export function RentalHistoryCard({
//   id,
//   name,
//   image,
//   rentalDate,
//   returnDate,
// }: RentalHistoryCardProps) {
//   return (
//     <Card key={id} className="overflow-hidden">
//       <div className="relative">
//         <img
//           src={image}
//           alt={name}
//           width={300}
//           height={200}
//           className="object-cover w-full h-[200px]"
//         />
//       </div>
//       <CardContent className="p-4">
//         <h3 className="text-xl font-semibold">{name}</h3>
//       </CardContent>
//       <CardFooter className="p-4 pt-0 flex flex-col gap-4">
//         <div className="text-sm text-muted-foreground space-y-1">
//           <p>Rented: {new Date(rentalDate).toLocaleDateString()}</p>
//           <p>Returned: {new Date(returnDate).toLocaleDateString()}</p>
//         </div>
//         <Button className="w-full" variant="outlinePrimary">
//           Rent Again
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
