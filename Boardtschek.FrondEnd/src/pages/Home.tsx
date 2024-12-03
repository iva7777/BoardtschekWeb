import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GameCard } from "@/components/GameCard";
import { Input } from "@/components/ui/input";

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
        const response = await axios.get("/api/Home");
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
          className="inner pb-24"
          style={{
            marginTop: "calc(200 / 2000 * 100vw)",
            marginBottom: "calc(200 / 2000 * 100vw)",
          }}
        >
          <h1 className="mb-5 text-6xl text-background-text font-semibold uppercase text-center">
            Welcome to Boardtschek
          </h1>
          <div className="">
            <p className="mb-3 text-lg text-background-text text-center">
              Discover a world of fun and strategy with our exclusive collection
              of board games, available for all Nemetschek employees.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
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
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section
        className="absolute p-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-4xl bg-foreground shadow-lg rounded-lg"
        aria-labelledby="search-heading"
      >
        <h2 id="search-heading" className="sr-only">
          Search for Games
        </h2>
        <div className="flex w-full  items-center space-x-2">
          <Input
            type="search"
            placeholder="Search..."
            className="w-9/12 h-12 border border-subtext rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            aria-label="Search for board games"
          />
          <Button
            variant={"default"}
            size={"lg"}
            className="w-3/12 h-12 rounded-lg transition-all duration-300"
            type="submit"
          >
            Find Games
          </Button>
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
            paddingTop: "calc(200 / 2000 * 100vw)",
            paddingBottom: "calc(150 / 2000 * 100vw)",
          }}
        >
          <h2
            id="top-games-heading"
            className="text-4xl font-bold mb-6 text-center text-foreground-text"
          >
            Top Games
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
            <h3 className="text-xl font-medium mb-4 text-subtext">
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
