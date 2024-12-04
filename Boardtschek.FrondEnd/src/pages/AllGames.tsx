import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { GameCard } from "@/components/GameCard";
import SearchForm from "@/components/SearchForm";

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
      <section className="" data-sublocation="Hero" aria-hidden="false">
        <div
          className="inner pb-24"
          style={{
            marginTop: "calc(100 / 2000 * 100vw)",
            marginBottom: "calc(100 / 2000 * 100vw)",
          }}
        >
          <h1 className="mb-5 text-5xl text-background-text font-semibold uppercase text-center">
            Explore top board games
            <br />
            for your downtime
          </h1>

          <div className="justify-center">
            <p className="mb-10 text-lg text-background-subtext text-center ">
              Discover a world of fun and strategy with our exclusive collection{" "}
              <br />
              of board games, available for all Nemetschek employees.
            </p>
            <div className="flex flex-col justify-center sm:flex-row">
              <SearchForm size="large" />
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
              {(games ? games.highestRatedGames : Array(12).fill(null)).map(
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
