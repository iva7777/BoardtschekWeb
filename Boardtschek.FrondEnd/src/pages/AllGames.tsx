import { useEffect, useState } from "react";
import { GameCard } from "@/components/GameCard";
import apiClient from "@/api/axios";

interface Game {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
  quantity: number;
  nextAvailable: string;
}

export default function AllGamesPage() {
  const [games, setGames] = useState<Game[] | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await apiClient.get("/api/Game/All");
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
            paddingTop: "calc(100 / 2000 * 100vw)",
            paddingBottom: "calc(100 / 2000 * 100vw)",
          }}
        >
          {/* Highest Rated Games */}
          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(games ? games : Array(12).fill(null)).map((game, index) => (
                <GameCard
                  key={game?.id || index}
                  title={game?.title || "Loading..."}
                  image={game?.imageUrl || "https://via.placeholder.com/150"}
                  id={game?.id || index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
