import axios from "axios";
import apiClient from "@/api/axios";
import { User } from "@/types/user";

export async function fetchUsers(): Promise<User[]> {
    try {
      const response = await apiClient.get("/api/Home/profile");
      console.log("Response data:", response.data); 
      if (!Array.isArray(response.data)) {
        return [response.data]; 
      }
      return response.data; 
    } catch (error) {
      console.error("Error fetching users:", error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Failed to fetch users.";
        throw new Error(errorMessage);
      } else {
        throw new Error("Unexpected error occurred while fetching users.");
      }
    }
  }