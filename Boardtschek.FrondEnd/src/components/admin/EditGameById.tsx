import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form.tsx";
import { Input } from "../ui/input.tsx";
import { Button } from "../ui/button.tsx";

// Define validation schema using Zod
const gameSchema = z.object({
  title: z.string().min(1, "Game title is required."),
  description: z.string().min(1, "Description is required."),
  imageUrl: z.string().url("Image URL is required."),
  minPlayers: z.number().min(1, "Minimum players must be at least 1."),
  maxPlayers: z.number().min(1, "Maximum players must be at least 1."),
  difficultyLevel: z.number().min(1, "Difficulty level must be between 1 and 5.").max(5, "Difficulty level must be between 1 and 5."),
  availableQuantity: z.number().min(1, "Available quantity must be at least 1."),
  totalQuantity: z.number().min(1, "Total quantity must be at least 1."),
});

type GameFormValues = z.infer<typeof gameSchema>;

export default function EditGameById() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  // Placeholder data for the 3 specific games
  const gamePlaceholders: Record<number, { title: string; description: string; imageUrl: string }> = {
    1: {
      title: "Chess",
      description: "A strategy board game.",
      imageUrl: "https://example.com/chess.jpg",
    },
    2: {
      title: "Monopoly",
      description: "A property trading game.",
      imageUrl: "https://example.com/monopoly.jpg",
    },
    3: {
      title: "Scrabble",
      description: "A word game.",
      imageUrl: "https://example.com/scrabble.jpg",
    },
  };

  const parsedGameId = id ? parseInt(id, 10) : 1;

  const gameData = gamePlaceholders[parsedGameId] || gamePlaceholders[1];

  const fetchedGameData = {
    title: gameData.title,
    description: gameData.description,
    imageUrl: gameData.imageUrl,
    minPlayers: 2,
    maxPlayers: 4,
    difficultyLevel: 3,
    availableQuantity: 10,
    totalQuantity: 50,
  };

  const form = useForm<GameFormValues>({
    resolver: zodResolver(gameSchema),
    defaultValues: fetchedGameData, 
  });

  const onSubmit = (data: GameFormValues) => {
    console.log(data);
    alert("Game updated successfully!");
    navigate("/edit-game");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-8 pb-8">
      <Form {...form}>
        <div className="w-full max-w-md">
          {/* Headings */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">Edit Game</h1>
            <p className="text-base text-gray-600 mt-4">Update game details</p>
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
                    <Input placeholder={gameData.title} {...field} />
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
                    <Input placeholder={gameData.description} {...field} />
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
                    <Input placeholder={gameData.imageUrl} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Update Game
            </Button>
          </form>
        </div>
      </Form>
    </div>
  );
}
