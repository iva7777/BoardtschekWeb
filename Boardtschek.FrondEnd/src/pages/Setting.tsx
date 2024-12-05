import { useEffect, useState } from "react";
import { fetchUsers } from "@/api/user";
import { User } from "@/types/user";
import axios from "axios";

export default function SettingsPage() {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    imageUrl: "https://via.placeholder.com/100",
    likedGames: [],
    activeRentedGames: [],
    overdueRentedGames: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetchUsers();
        setUser(users[0]);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching profile data:", error.message);
          alert(`Error: ${error.response?.data || error.message}`);
        } else {
          console.error("Unexpected error:", error);
          alert("An unexpected error occurred.");
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">My Account</h1>

        {/* Profile Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="flex space-x-4 items-center">
            <img
              src={user.imageUrl || "https://via.placeholder.com/100"}
              alt="Avatar"
              className="w-24 h-24 rounded-full border"
            />
            <div>
              <h3 className="text-lg font-medium">
                {user.firstName} {user.lastName}
              </h3>
            </div>
          </div>
        </div>

        {/* Liked Games */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Liked Games</h2>
          <ul className="list-disc pl-6">
            {user.likedGames && user.likedGames.length > 0 ? (
              user.likedGames.map((game, index) => (
                <h3 key={index}>
                  {game.title || "Unknown Game"} -{" "}
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-12 h-12"
                  />
                </h3>
              ))
            ) : (
              <p>No liked games yet</p>
            )}
          </ul>
        </div>

        {/* Active Rentals */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Active Rentals</h2>
          <ul className="list-disc pl-6">
            {user.activeRentedGames && user.activeRentedGames.length > 0 ? (
              user.activeRentedGames.map((rental, index) => (
                <h3 key={index}>
                  {rental.title || "Unknown Game"} - Rented on{" "}
                  {rental.startDate
                    ? new Date(rental.startDate).toLocaleDateString()
                    : "Unknown Date"}
                  <br />
                  <img
                    src={rental.imageUrl}
                    alt={rental.title}
                    className="w-12 h-12"
                  />
                </h3>
              ))
            ) : (
              <p>No active rentals yet.</p>
            )}
          </ul>
        </div>

        {/* Overdue Rentals */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Overdue Rentals</h2>
          <ul className="list-disc pl-6">
            {user.overdueRentedGames && user.overdueRentedGames.length > 0 ? (
              user.overdueRentedGames.map((rental, index) => (
                <h3 key={index}>
                  {rental.title || "Unknown Game"} - Due on{" "}
                  {rental.dueDate
                    ? new Date(rental.dueDate).toLocaleDateString()
                    : "Unknown Date"}
                  <br />
                  <img
                    src={rental.imageUrl}
                    alt={rental.title}
                    className="w-12 h-12"
                  />
                </h3>
              ))
            ) : (
              <p>No overdue rentals.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
