import { useEffect, useState } from "react";
import { ActiveRentalCard } from "@/components/rentals/active";
// import { OverdueRentalCard } from "@/components/rental-cards/overdue";
// import { RentalHistoryCard } from "@/components/rental-cards/history";
import { fetchUsers } from "@/api/user";
import { User } from "@/types/user";
import axios from "axios";

export default function GameDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>No user data available.</div>;
  return (
    <div className="container mx-auto p-6 space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">
          Hey {user.firstName}, Welcome back! Here's what's new while you were
          away.
        </h1>
      </header>

      <section className="space-y-4 ">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Active Rentals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.activeRentedGames && user.activeRentedGames.length > 0 ? (
              user.activeRentedGames.map((rental, index) => (
                <ActiveRentalCard
                  key={index}
                  id={rental.id}
                  name={rental.title || "Unknown Game"}
                  image={rental.imageUrl || "/placeholder-image.png"}
                  rentalDate={rental.startDate || new Date().toISOString()}
                  dueDate={rental.dueDate || new Date().toISOString()}
                />
              ))
            ) : (
              <p className="text-muted-foreground">No active rentals yet.</p>
            )}
          </div>
        </div>
      </section>
      <section className="space-y-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Overdue Rentals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.activeRentedGames && user.activeRentedGames.length > 0 ? (
              user.activeRentedGames.map((rental, index) => (
                <ActiveRentalCard
                  key={index}
                  id={rental.id}
                  name={rental.title || "Unknown Game"}
                  image={rental.imageUrl || "/placeholder-image.png"}
                  rentalDate={rental.startDate || new Date().toISOString()}
                  dueDate={rental.dueDate || new Date().toISOString()}
                />
              ))
            ) : (
              <p className="text-muted-foreground">No active rentals yet.</p>
            )}
          </div>
        </div>
      </section>
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
  );
}
