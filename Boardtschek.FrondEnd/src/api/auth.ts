// src/api/auth.ts
import apiClient from "@/api/axios";
import axios from "axios";

// Register User
interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    imageUrl: string;
}

export async function registerUser(data: RegisterPayload): Promise<string> {
    try {
        const response = await apiClient.post("/api/Auth/register", data);
        return response.data; 
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || error.message;
        } else {
            throw "An unexpected error occurred.";
        }
    }
}

// Login User
interface LoginPayload {
    email: string;
    password: string;
}

export async function loginUser(data: LoginPayload): Promise<string> {
    try {
        const response = await apiClient.post("/login", data);
        // eslint-disable-next-line no-debugger
        debugger;
        return response.data.accessToken; // Return the token
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data?.message || "Login failed.";
        } else {
            throw "An unexpected error occurred.";
        }
    }
}

// Change Password
interface ChangePasswordPayload {
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export async function changePassword(data: ChangePasswordPayload): Promise<string> {
    try {
        const response = await apiClient.post("/api/Auth/change-password", data);
        return response.data; // Return success message
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || error.message;
        } else {
            throw "An unexpected error occurred.";
        }
    }
}
export async function fetchUserProfile() {
    try {
        const response = await axios.get('/api/Auth/user', { withCredentials: true });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data || "Failed to fetch user profile");
        } else {
            throw new Error("Unexpected error occurred");
        }
    }
}
