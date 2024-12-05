import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

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
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Rented: {new Date(rentalDate).toLocaleDateString()}</p>
          <p>Due: {new Date(dueDate).toLocaleDateString()}</p>
        </div>
        <Button className="w-full" variant="destructive">
          Return
        </Button>
      </CardFooter>
    </Card>
  );
}
