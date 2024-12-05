import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ActiveRentalCardProps {
  id: string;
  name: string;
  image: string;
  rentalDate: string;
  dueDate: string;
}

export function ActiveRentalCard({
  id,
  name,
  image,
  rentalDate,
  dueDate,
}: ActiveRentalCardProps) {
  return (
    <Card key={id} className="overflow-hidden">
      <div className="relative">
        <Badge className="absolute left-2 top-2 z-10 bg-primary hover:bg-primary">
          Currently Active
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
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Rented: {new Date(rentalDate).toLocaleDateString()}</p>
          <p>Due: {new Date(dueDate).toLocaleDateString()}</p>
        </div>
        <Button className="w-full">Return Game</Button>
      </CardFooter>
    </Card>
  );
}
