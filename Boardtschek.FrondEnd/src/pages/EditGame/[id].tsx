import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiClient from "@/api/axios";


enum DifficultyLevel {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

const difficultyLevelMap = {
  [DifficultyLevel.Easy]: 0,
  [DifficultyLevel.Medium]: 1,
  [DifficultyLevel.Hard]: 2,
};

const getDifficultyLevelInt = (difficulty: DifficultyLevel): number => {
  return difficultyLevelMap[difficulty];
};

// Define the Game type
interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  minPlayers: number;
  maxPlayers: number;
  difficultyLevel: DifficultyLevel;
  availableQuantity: number;
  totalQuantity: number;
}

// Define validation schema using zod
const gameSchema = z.object({
  title: z.string().min(1, "Game title is required."),
  description: z.string().min(1, "Description is required."),
  imageUrl: z.string().url("Valid Image URL is required."),
  minPlayers: z.number().min(1, "Minimum players must be at least 1."),
  maxPlayers: z.number().min(1, "Maximum players must be at least 1."),
  difficultyLevel: z.enum([
    DifficultyLevel.Easy,
    DifficultyLevel.Medium,
    DifficultyLevel.Hard,
  ]),
  availableQuantity: z
    .number()
    .min(1, "Available quantity must be at least 1."),
  totalQuantity: z.number().min(1, "Total quantity must be at least 1."),
});

type GameFormValues = z.infer<typeof gameSchema>;

export default function EditGamePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const form = useForm<GameFormValues>({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      minPlayers: 1,
      maxPlayers: 1,
      difficultyLevel: DifficultyLevel.Easy,
      availableQuantity: 1,
      totalQuantity: 1,
    },
  });

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await apiClient.get(`api/Game/Edit/${id}`, {
          withCredentials: true,
        });
        const gameData: Game = {
          ...response.data,
          difficultyLevel:
            DifficultyLevel[
            response.data.difficultyLevel as keyof typeof DifficultyLevel
            ],
        };

        form.reset(gameData);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to load game details.";
        setError(errorMessage);
      }
    };

    if (id) fetchGameDetails();
  }, [id, form]);

  const onSubmit = async (data: GameFormValues) => {
    console.log("Form data being sent to the backend:", data);

    if (!id) {
      alert("Game ID is missing.");
      return;
    }

    try {
      const backendData = {
        ...data,
        difficultyLevel: getDifficultyLevelInt(data.difficultyLevel),
        id,
        model: "requiredModel",
      };

      console.log("Backend data:", backendData);

      const response = await apiClient.post(`api/Game/Edit/${id}`, backendData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        alert("Game updated successfully!");
        navigate("/games");
      } else {
        alert("Failed to update game. Please try again.");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update game.";
      alert(errorMessage);
    }
  };


  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-subtext pt-8 pb-8">
      <Form {...form}>
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-center">Edit Game</h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
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
                    <select
                      {...field}
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      {Object.values(DifficultyLevel).map((difficulty) => (
                        <option key={difficulty} value={difficulty}>
                          {difficulty}
                        </option>
                      ))}
                    </select>
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
            <div className="flex justify-between">
              <Button type="button" variant="outlinePrimary" onClick={() => navigate("/games")} size="lg">
                Cancel
              </Button>
              <Button type="submit" variant="default" size="lg">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
}