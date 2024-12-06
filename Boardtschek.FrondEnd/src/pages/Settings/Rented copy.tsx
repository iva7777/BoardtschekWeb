import { useEffect, useState } from "react";
import { ActiveRentalCard } from "@/components/rentals/active";
// import { OverdueRentalCard } from "@/components/rental-cards/overdue";
// import { RentalHistoryCard } from "@/components/rental-cards/history";
import { Button } from "@/components/ui/button";
import { fetchUsers } from "@/api/user";
import { User } from "@/types/user";
import axios from "axios";

const INITIAL_CARDS_TO_SHOW = 3;

export default function GameDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // const [activeRentals, setActiveRentals] = useState([]);
  // const [rentalHistory, setRentalHistory] = useState([]);
  const [activeRentalsToShow, setActiveRentalsToShow] = useState(
    INITIAL_CARDS_TO_SHOW
  );
  // const [rentalHistoryToShow, setRentalHistoryToShow] = useState(
  //   INITIAL_CARDS_TO_SHOW
  // );

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

  const handleSeeMoreActiveRentals = () => {
    setActiveRentalsToShow((prevCount) =>
      Math.min(prevCount + INITIAL_CARDS_TO_SHOW, ActiveRentalCard.length)
    );
  };

  const handleSeeLessActiveRentals = () => {
    setActiveRentalsToShow(INITIAL_CARDS_TO_SHOW);
  };

  // const handleSeeMoreRentalHistory = () => {
  //   setRentalHistoryToShow((prevCount) =>
  //     Math.min(prevCount + INITIAL_CARDS_TO_SHOW, rentalHistory.length)
  //   );
  // };

  // const handleSeeLessRentalHistory = () => {
  //   setRentalHistoryToShow(INITIAL_CARDS_TO_SHOW);
  // };
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

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Active Rentals
        </h2>
        {user.activeRentedGames?.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {user.activeRentedGames
              .slice(0, activeRentalsToShow)
              .map((rental, index) => (
                <ActiveRentalCard
                  key={index}
                  id={rental.id}
                  name={rental.title || "Unknown Game"}
                  image={rental.imageUrl}
                  rentalDate={
                    rental.startDate
                      ? new Date(rental.startDate).toLocaleDateString()
                      : "Unknown Date"
                  }
                  dueDate={
                    rental.dueDate
                      ? new Date(rental.dueDate).toLocaleDateString()
                      : "Unknown Date"
                  }
                />
              ))}
          </div>
        ) : (
          <p className="text-gray-500">No active rentals yet.</p>
        )}
        <div className="flex justify-center mt-4 space-x-4">
          {activeRentalsToShow < user.activeRentedGames?.length && (
            <Button
              onClick={handleSeeMoreActiveRentals}
              variant="outlinePrimary"
            >
              See More
            </Button>
          )}
          {activeRentalsToShow > INITIAL_CARDS_TO_SHOW && (
            <Button
              onClick={handleSeeLessActiveRentals}
              variant="outlinePrimary"
            >
              See Less
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
