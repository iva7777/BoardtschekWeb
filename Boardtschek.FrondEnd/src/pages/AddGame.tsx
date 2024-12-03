import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addGame } from "@/api/game";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import axios from "axios";
import { difficultyMap } from "@/types/difficultyMappings";

// Define validation schema
const gameSchema = z.object({
  title: z.string().min(1, "Game title is required."),
  description: z.string().min(1, "Description is required."),
  imageUrl: z.string().url("Valid Image URL is required."),
  minPlayers: z
    .number()
    .min(1, "Minimum players must be at least 1.")
    .max(100, "Minimum players cannot exceed 100."),
  maxPlayers: z
    .number()
    .min(1, "Maximum players must be at least 1.")
    .max(100, "Maximum players cannot exceed 100."),
  difficultyLevel: z.enum(["Easy", "Medium", "Hard"]),
  totalQuantity: z
    .number()
    .min(1, "Total quantity must be at least 1.")
    .max(1000, "Total quantity cannot exceed 1000."),
});

// Custom validation for maxPlayers and totalQuantity
const customGameSchema = gameSchema.refine(
  (data) => data.maxPlayers >= data.minPlayers,
  {
    message:
      "Maximum players must be greater than or equal to Minimum players.",
    path: ["maxPlayers"],
  }
);

type GameFormValues = z.infer<typeof customGameSchema>;

export default function AddGamePage() {
  const navigate = useNavigate();
  const form = useForm<GameFormValues>({
    resolver: zodResolver(customGameSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      minPlayers: 1,
      maxPlayers: 1,
      difficultyLevel: "Easy",
      totalQuantity: 1,
    },
  });

  const onSubmit = async (data: GameFormValues) => {
    try {
      // Map difficulty level to number for the backend
      const backendData = {
        ...data,
        difficultyLevel: difficultyMap[data.difficultyLevel],
      };

      // Log the backend data to the console for debugging
      console.log("Prepared backend data:", backendData);

      // Send the data to the backend via the addGame API
      const message = await addGame(backendData);

      if (message) {
        alert(message || "Game added successfully!");
        navigate("/games");
      } else {
        alert("No response message from the server.");
      }
    } catch (error: unknown) {
      handleError(error); // Use a shared error handler
    }
  };
  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const response = error.response;
      if (response) {
        console.error("API Error Details:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
        });

        if (response.status === 400) {
          const errorMessage =
            response?.data?.message || "Invalid input. Please check the form.";
          alert(`Error: ${errorMessage}`);
        } else if (response.status === 500) {
          const errorMessage =
            response?.data?.message ||
            "An unexpected error occurred while adding the game.";
          alert(`Error: ${errorMessage}`);
        } else {
          alert("Failed to add game. Please try again.");
        }
      } else {
        console.error("Axios Error (No Response):", error.message);
        alert("Network error. Please check your connection.");
      }
    } else if (error instanceof Error) {
      console.error("Unexpected Error:", error);
      alert(`An unexpected error occurred: ${error.message}`);
    } else {
      console.error("Unknown Error:", error);
      alert("An unknown error occurred.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-8 pb-8">
      <Form {...form}>
        <div className="w-full max-w-md">
          {/* Headings */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">Add a New Game</h1>
            <p className="text-base text-gray-600 mt-4">
              Add a new game to the system
            </p>
          </div>

          {/* Form */}
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
                    <textarea
                      {...field}
                      placeholder="Description"
                      className="w-full p-2 border rounded resize-y min-h-[100px] max-h-[300px] placeholder-gray-800"
                      style={{ fontSize: "16px" }}
                    />
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
                    <Input
                      type="number"
                      min={1}
                      {...field}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        field.onChange(value); // Store the numeric value
                        if (value > form.getValues("maxPlayers")) {
                          form.setValue("maxPlayers", value); // Update maxPlayers automatically
                        }
                      }}
                    />
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
                    <Input
                      type="number"
                      min={form.getValues("minPlayers")}
                      {...field}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        const minPlayers = form.getValues("minPlayers");

                        if (value >= minPlayers) {
                          field.onChange(value);
                        } else {
                          alert(
                            `Max Players must be greater than or equal to Min Players (${minPlayers}).`
                          );
                        }
                      }}
                    />
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
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
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
                    <Input
                      type="number"
                      min={1}
                      {...field}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="mt-8">
              <Button type="submit" variant="default" className="w-full">
                Add Game
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
}
