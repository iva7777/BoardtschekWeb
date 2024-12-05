import axios from "axios";
import apiClient from "@/api/axios";


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

interface ApiResponse {
    message: string;
    status: string;  
}

export async function fetchGames(): Promise<GameEditForm[]> {
    try {
        const response = await apiClient.get("/api/Game");
        return response.data; 
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

export async function addGame(game: GameForm): Promise<ApiResponse> {
    try {
        const response = await apiClient.post("/api/Game/Add", game);
        return response.data;  
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

export async function editGame(id: string, game: GameEditForm): Promise<ApiResponse> {
    try {
        const response = await apiClient.post(`/api/Game/Edit/${id}`, game);
        return response.data;  
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

export async function deleteGame(id: string): Promise<ApiResponse> {
    try {
        const response = await axios.delete(`/api/Game/Delete/${id}`);
        return response.data;  
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

export async function fetchGamesDetails(): Promise<GameEditForm[]> {
    try {
        const response = await apiClient.get("/api/Game/Details");
        return response.data; 
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