import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GameCard } from "@/components/GameCard";

interface Game {
  id: string;
  title: string;
  imageUrl: string;
}

interface HomePageGamesOverview {
  highestRatedGames: Game[];
  mostBorrowedGames: Game[];
}

export default function AllGamesPage() {
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
      {/* <header className="secondary-header sticky top-0 z-50 w-full border-border/40 bg-white supports-[backdrop-filter]:bg-background/60">
        <div className="search-container">
          <div className="flex flex-row justify-center items-center space-x-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-2/3 h-12 p-3 border border-subtext rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              aria-label="Search for board games"
            />
            <Button
              variant={"secondary"}
              size={"lg"}
              className="w-1/4 h-12 rounded-lg hover:bg-orange-500 transition-all duration-300"
            >
              Search
            </Button>
          </div>
          <Button
            variant={"secondary"}
            size={"lg"}
            className="w-1/4 h-12 rounded-lg hover:bg-orange-500 transition-all duration-300"
          >
            Search
          </Button>
          <Button
            variant={"secondary"}
            size={"lg"}
            className="w-1/4 h-12 rounded-lg hover:bg-orange-500 transition-all duration-300"
          >
            Search
          </Button>
        </div>
      </header> */}
      <section className="" data-sublocation="Hero" aria-hidden="false">
        <div
          className="inner pb-24"
          style={{
            marginTop: "calc(200 / 2000 * 100vw)",
            marginBottom: "calc(200 / 2000 * 100vw)",
          }}
        >
          <h1 className="mb-5 text-6xl font-semibold uppercase text-center">
            Welcome to Boardtschek
          </h1>
          <div className="">
            <p className="mb-3 text-lg text-neutral-700 text-center">
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
      {/* Top Games Section */}
      <section
        className="bg-gray-200 section-ranks"
        aria-labelledby="top-games-heading"
      >
        <div
          className="inner"
          style={{
            paddingTop: "calc(200 / 2000 * 100vw)",
            paddingBottom: "calc(150 / 2000 * 100vw)",
          }}
        >
          {/* Highest Rated Games */}
          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(games ? games.highestRatedGames : Array(4).fill(null)).map(
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
          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>
      </section>
    </main>
  );
}
