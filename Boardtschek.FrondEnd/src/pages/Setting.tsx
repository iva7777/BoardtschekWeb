import { useEffect, useState } from "react";
import { fetchUsers } from "@/api/user";
import { User } from "@/types/user";
import { ActiveRentalCard } from "@/components/rental-cards/active";
import { OverdueRentalCard } from "@/components/rental-cards/overdue";
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
            {/* <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/rent">
                <Button className="mt-4" variant={"default"} size={"lg"}>
                  Start Renting Now
                </Button>
              </Link>
              <Link to="/rent">
                <Button className="mt-4" variant={"outlinePrimary"} size={"lg"}>
                  Browse Rentals
                </Button>
              </Link>
            </div> */}
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
              <ul className="list-disc">
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
              <ul className="list-disc">
                {user.overdueRentedGames &&
                user.overdueRentedGames.length > 0 ? (
                  user.overdueRentedGames.map((rental, index) => (
                    <ActiveRentalCard
                      key={index}
                      id={rental.id}
                      name={rental.title}
                      image={rental.imageUrl}
                      rentalDate={rental.startDate}
                      dueDate={rental.dueDate}
                    />
                  ))
                ) : (
                  <p>No active rentals yet.</p>
                )}
              </ul>
            </div>

            {/* Overdue Rentals */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Overdue Rentals</h2>
              <ul className="list-disc">
                {user.overdueRentedGames &&
                user.overdueRentedGames.length > 0 ? (
                  user.overdueRentedGames.map((rental, index) => (
                    <OverdueRentalCard
                      key={index}
                      id={rental.id}
                      name={rental.title}
                      image={rental.imageUrl}
                      rentalDate={rental.startDate}
                      dueDate={rental.dueDate}
                    />
                  ))
                ) : (
                  <p>No overdue rentals.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
