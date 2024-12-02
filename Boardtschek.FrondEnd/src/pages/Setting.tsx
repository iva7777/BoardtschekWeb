import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchUserProfile, changePassword } from "@/api/auth";
import { ProfileData } from "@/types/user";
import axios from "axios";

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Current password must be at least 6 characters long."),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters long."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirmation password do not match.",
    path: ["confirmPassword"],
  });

export default function SettingsPage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPasswordChangeVisible, setPasswordChangeVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserProfile();
        setProfileData(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching profile data:", error.message);
          alert(`Error: ${error.response?.data || error.message}`);
        } else {
          console.error("Unexpected error:", error);
          alert("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
    try {
      await changePassword({
        email: profileData?.email || "",
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      alert("Password changed successfully!");
      setPasswordChangeVisible(false);
    } catch (error: unknown) {
      alert(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!profileData) return <div>No profile data available.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">My Account</h1>

        {/* Profile Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="flex space-x-4 items-center">
            <img
              src={profileData.avatar || "https://via.placeholder.com/100"}
              alt="Avatar"
              className="w-24 h-24 rounded-full border"
            />
            <div>
              <p className="text-lg font-medium">
                {profileData.firstName} {profileData.lastName}
              </p>
              <p className="text-sm text-gray-500">{profileData.email}</p>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Security</h2>
          <button
            onClick={() => setPasswordChangeVisible((prev) => !prev)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isPasswordChangeVisible
              ? "Cancel Password Change"
              : "Change Password"}
          </button>
          {isPasswordChangeVisible && (
            <form
              onSubmit={handleSubmit(handlePasswordSubmit)}
              className="mt-4 space-y-4"
            >
              <div>
                <label>Current Password</label>
                <Input type="password" {...register("currentPassword")} />
                {errors.currentPassword && (
                  <p className="text-red-500">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>
              <div>
                <label>New Password</label>
                <Input type="password" {...register("newPassword")} />
                {errors.newPassword && (
                  <p className="text-red-500">{errors.newPassword.message}</p>
                )}
              </div>
              <div>
                <label>Confirm Password</label>
                <Input type="password" {...register("confirmPassword")} />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="bg-green-500 w-full">
                Submit Password Change
              </Button>
            </form>
          )}
        </div>

        {/* Liked Games */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Liked Games</h2>
          <ul className="list-disc pl-6">
            {profileData.likedGames && profileData.likedGames.length > 0 ? (
              profileData.likedGames.map((game, index) => (
                <li key={index}>{game.title || "Unknown Game"}</li>
              ))
            ) : (
              <p>No liked games yet.</p>
            )}
          </ul>
        </div>

        {/* Rentals */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Rentals</h2>
          <ul className="list-disc pl-6">
            {profileData.rentals && profileData.rentals.length > 0 ? (
              profileData.rentals.map((rental, index) => (
                <li key={index}>
                  {rental.title || "Unknown Game"} - Rented on{" "}
                  {rental.rentalDate
                    ? new Date(rental.rentalDate).toLocaleDateString()
                    : "Unknown Date"}
                </li>
              ))
            ) : (
              <p>No rentals yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
