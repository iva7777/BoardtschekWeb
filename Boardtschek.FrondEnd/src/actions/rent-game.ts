import * as z from "zod";

const rentalSchema = z.object({
  gameId: z.string().uuid(), // UUID
  startDate: z.string(), // yyyy-MM-dd
  startTime: z.string(), // HH:mm:ss
  endDate: z.string(), // yyyy-MM-dd
  endTime: z.string(), // HH:mm:ss
  quantity: z.number().min(1), // Quantity must be at least 1
});

export type RentalFormData = z.infer<typeof rentalSchema>;
function extractGameIdFromUrl(): string | null {
  const url = new URL(window.location.href);
  const gameId = url.pathname.split("/").pop(); 
  return gameId?.match(/^[0-9a-fA-F-]{36}$/) ? gameId : null; 
}

export async function rentGame(data: Omit<RentalFormData, "gameId">) {
  const gameId = extractGameIdFromUrl();
  if (!gameId) {
    return {
      success: false,
      message: "Unable to determine gameId from URL.",
    };
  }
  const rentalData = { ...data, gameId };
  const result = rentalSchema.safeParse(rentalData);

  if (!result.success) {
    return {
      success: false,
      message: "Invalid form data",
      errors: result.error.errors, 
    };
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch(`http://localhost:5050/api/Rental/Rent/${gameId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend Error:", errorData);
      return {
        success: false,
        message: errorData.message || "An error occurred while renting the game.",
        statusCode: response.status,
      };
    }


    return {
      success: true,
      message: "Game rented successfully!",
    };
  } catch (error) {
    console.error("Error during rentGame API call:", error);
    return {
      success: false,
      message: "Network error or server unavailable.",
    };
  }
}


