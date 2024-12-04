// src/api/game.ts
import axios from "axios";
import apiClient from "@/api/axios";

// Interfaces for form data
interface GameForm {
    title: string;
    description: string;
    imageUrl: string;
    minPlayers: number;
    maxPlayers: number;
    difficultyLevel: number; 
    totalQuantity: number;
}

interface GameEditForm extends GameForm {
    availableQuantity: number;
}

// Standard response format for API
interface ApiResponse {
    message: string;
    status: string;  // Add any other necessary fields
}

// Fetch all games (GET)
export async function fetchGames(): Promise<GameEditForm[]> {
    try {
        const response = await apiClient.get("/api/Game");
        return response.data;  // Assumes response is an array of games
    } catch (error) {
        console.error("Error fetching games:", error);
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "Failed to fetch games.";
            throw new Error(errorMessage);
        } else {
            throw new Error("Unexpected error occurred.");
        }
    }
}

// Add a new game (POST)
export async function addGame(game: GameForm): Promise<ApiResponse> {
    try {
        const response = await apiClient.post("http://localhost:5050/api/Game/Add", game);
        return response.data;  // Assumes response contains { message, status }
    } catch (error) {
        console.error("Error adding game:", error);
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "Failed to add game.";
            throw new Error(errorMessage);
        } else {
            throw new Error("Unexpected error occurred.");
        }
    }
}

// Edit an existing game (POST)
export async function editGame(id: string, game: GameEditForm): Promise<ApiResponse> {
    try {
        const response = await apiClient.post(`/api/Game/Edit/${id}`, game);
        return response.data;  // Assumes response contains { message, status }
    } catch (error) {
        console.error("Error editing game:", error);
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "Failed to edit game.";
            throw new Error(errorMessage);
        } else {
            throw new Error("Unexpected error occurred.");
        }
    }
}

// Delete a game (DELETE)
export async function deleteGame(id: string): Promise<ApiResponse> {
    try {
        const response = await axios.delete(`/api/Game/Delete/${id}`);
        return response.data;  // Assumes response contains { message, status }
    } catch (error) {
        console.error("Error deleting game:", error);
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "Failed to delete game.";
            throw new Error(errorMessage);
        } else {
            throw new Error("Unexpected error occurred.");
        }
    }
}
