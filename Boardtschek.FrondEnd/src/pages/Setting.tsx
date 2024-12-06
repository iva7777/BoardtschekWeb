import { useEffect, useState } from "react";
import { fetchUsers } from "@/api/user";
import { User } from "@/types/user";
import { ActiveRentalCard } from "@/components/rentals/active";
import { OverdueRentalCard } from "@/components/rentals/overdue";
import axios from "axios";
import { GameCard } from "@/components/GameCard";

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
    <main id="content" className="min-h-[100dvh]" tabIndex={-1}>
      <section className="" data-sublocation="Hero" aria-hidden="false">
        <div
          className="inner"
          style={{
            marginTop: "calc(100 / 2000 * 100vw)",
            marginBottom: "calc(100 / 2000 * 100vw)",
          }}
        >
          <h1 className="mb-5 text-5xl text-background-text font-semibold">
            Hey {user.firstName} 👋
          </h1>
          <div className="">
            <p className="mb-10 text-2xl text-background-subtext">
              Welcome back! Here's what's new while you were away.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-foreground">
        <div className="min-h-screen p-8">
          <div className="mx-auto shadow rounded-lg bg-background p-14">
            {/* Profile Details */}

            {/* Liked Games */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Liked Games</h2>
              <div className="flex flex-wrap gap-6">
                {user.likedGames && user.likedGames.length > 0 ? (
                  user.likedGames.map((game, index) => (
                    <div
                      key={game?.id || index}
                      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                    >
                      <GameCard
                        title={game?.title || "Loading..."}
                        image={
                          game?.imageUrl || "https://via.placeholder.com/150"
                        }
                        id={String(game?.id || index)} // Ensure id is a string
                      />
                    </div>
                  ))
                ) : (
                  <p>No liked games yet</p>
                )}
              </div>
            </div>

            {/* Active Rentals */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Active Rentals</h2>
              <div className="flex flex-wrap gap-6">
                {user.activeRentedGames && user.activeRentedGames.length > 0 ? (
                  user.activeRentedGames.map((rental, index) => (
                    <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
                      <ActiveRentalCard
                        id={rental.id}
                        name={rental.title}
                        image={rental.imageUrl}
                        rentalDate={rental.startDate}
                        dueDate={rental.dueDate}
                      />
                    </div>
                  ))
                ) : (
                  <p>No active rentals yet.</p>
                )}
              </div>
            </div>

            {/* Overdue Rentals */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Overdue Rentals</h2>
              <div className="flex flex-wrap gap-6">
                {user.overdueRentedGames &&
                user.overdueRentedGames.length > 0 ? (
                  user.overdueRentedGames.map((rental, index) => (
                    <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
                      <OverdueRentalCard
                        id={rental.id}
                        name={rental.title}
                        image={rental.imageUrl}
                        rentalDate={rental.startDate}
                        dueDate={rental.dueDate}
                      />
                    </div>
                  ))
                ) : (
                  <p>No overdue rentals.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
