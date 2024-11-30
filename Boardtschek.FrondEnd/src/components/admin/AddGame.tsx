import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form.tsx";
import { Input } from "../ui/input.tsx";
import { Button } from "../ui/button.tsx";

const gameSchema = z.object({
  title: z.string().min(1, "Game title is required."),
  description: z.string().min(1, "Description is required."),
  imageUrl: z.string()
  .url("Image URL is required."),
  minPlayers: z.number().min(1, "Minimum players must be at least 1."),
  maxPlayers: z.number().min(1, "Maximum players must be at least 1."),
  difficultyLevel: z.number().min(1, "Difficulty level must be between 1 and 5.").max(5, "Difficulty level must be between 1 and 5."),
  availableQuantity: z.number().min(1, "Available quantity must be at least 1."),
  totalQuantity: z.number().min(1, "Total quantity must be at least 1."),
});

type GameFormValues = z.infer<typeof gameSchema>;

export default function AddGame() {
  const navigate = useNavigate();
  const form = useForm<GameFormValues>({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      minPlayers: 1,
      maxPlayers: 1,
      difficultyLevel: 1,
      availableQuantity: 1,
      totalQuantity: 1,
    },
  });

  const onSubmit = (data: GameFormValues) => {
    console.log(data);
    alert("Game added successfully!");
    navigate("/games");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-8 pb-8">
      <Form {...form}>
        <div className="w-full max-w-md">
          {/* Headings */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">Add a New Game</h1>
            <p className="text-base text-gray-600 mt-4">Add a new game to the system</p>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Game Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Game Title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Image URL" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minPlayers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Players</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxPlayers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Players</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficultyLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Level</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} max={5} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availableQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Add Game
            </Button>
          </form>
        </div>
      </Form>
    </div>
  );
}
