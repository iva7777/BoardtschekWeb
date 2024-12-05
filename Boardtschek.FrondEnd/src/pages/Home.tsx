import { useEffect, useState } from "react";
import { GameCard } from "@/components/GameCard";
import apiClient from "@/api/axios";
interface Game {
  id: string;
  title: string;
  imageUrl: string;
}

interface HomePageGamesOverview {
  highestRatedGames: Game[];
  mostBorrowedGames: Game[];
}

export default function HomePage() {
  const [games, setGames] = useState<HomePageGamesOverview | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await apiClient.get("/api/Home");
        console.log(response);
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
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
          <h1 className="mb-5 text-5xl text-background-text font-semibold uppercase text-center">
            Welcome to Boardtschek
          </h1>
          <div className="">
            <p className="mb-10 text-lg text-background-subtext text-center ">
              Discover a world of fun and strategy with our exclusive collection{" "}
              <br />
              of board games, available for all Nemetschek employees.
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

      {/* Top Games Section */}
      <section
        className="section-ranks bg-foreground"
        aria-labelledby="top-games-heading"
      >
        <div
          className="inner"
          style={{
            paddingTop: "calc(100 / 2000 * 100vw)",
            paddingBottom: "calc(100 / 2000 * 100vw)",
          }}
        >
          <h2
            id="top-games-heading"
            className="text-4xl font-bold mb-6 text-center text-foreground-text"
          >
            🏆Top Games🏆
          </h2>

          {/* Highest Rated Games */}
          <div className="mb-12">
            <h3 className="text-xl font-medium mb-4 text-foreground-subtext">
              Highest Rated Games
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(games ? games.highestRatedGames : Array(3).fill(null)).map(
                (game, index) => (
                  <GameCard
                    key={game?.id || index}
                    title={game?.title || "Loading..."}
                    image={game?.imageUrl || "https://via.placeholder.com/150"}
                    rating={game?.rating || 0}
                    quantity={game?.quantity || 0}
                    nextAvailable={game?.nextAvailable || ""}
                  />
                )
              )}
            </div>
          </div>

          {/* Most Borrowed Games */}
          <div className="">
            <h3 className="text-xl font-medium mb-4 text-foreground-subtext">
              Most Borrowed Games
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(games ? games.mostBorrowedGames : Array(3).fill(null)).map(
                (game, index) => (
                  <GameCard
                    key={game?.id || index}
                    title={game?.title || "Loading..."}
                    image={game?.imageUrl || "https://via.placeholder.com/150"}
                    rating={game?.rating || 0}
                    quantity={game?.quantity || 0}
                    nextAvailable={game?.nextAvailable || ""}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
