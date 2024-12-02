import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section
        className="flex items-center justify-between px-8 py-12 max-w-7xl mx-auto"
        data-sublocation="Hero"
        aria-labelledby="hero-heading"
      >
        <div className="w-1/2">
          <h1 id="hero-heading" className="text-4xl font-bold">
            Welcome to Boardtschek
          </h1>
          <p className="text-lg mt-4">
            Discover a world of fun and strategy with our exclusive collection
            of board games, available for all Nemetschek employees.
          </p>
          <Link to="/rent">
            {" "}
            {/* Use Link for navigation */}
            <Button className="mt-4" variant={"default"} size={"lg"}>
              Rent
            </Button>
          </Link>
        </div>
        <div className="w-1/2 flex justify-center">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Board games preview"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Search Section */}
      <section
        className="bg-gray-200 py-4 px-6"
        aria-labelledby="search-heading"
      >
        <h2 id="search-heading" className="sr-only">
          Search for Games
        </h2>
        <div className="flex justify-center items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-1/2 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search for board games"
          />
          <Button>Search</Button>
        </div>
      </section>

      {/* Top Games Section */}
      <section
        className="section-ranks py-8 px-4 max-w-7xl mx-auto"
        aria-labelledby="top-games-heading"
      >
        <h2
          id="top-games-heading"
          className="text-2xl font-bold mb-6 text-center text-primary"
        >
          Top Games
        </h2>

        {/* Highest Rated Games */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Highest Rated Games</h3>
          <div className="grid grid-cols-3 gap-6">
            {(games ? games.highestRatedGames : Array(3).fill(null)).map(
              (game, index) => (
                <article
                  key={game?.id || index}
                  className="bg-white shadow rounded-lg overflow-hidden"
                  aria-labelledby={`game-${game?.id || index}`}
                >
                  <img
                    src={game?.imageUrl || "https://via.placeholder.com/150"}
                    alt={game?.title || "Loading..."}
                    className={`w-full h-40 object-cover ${
                      !game && "bg-gray-300"
                    }`}
                  />
                  <div className="p-4">
                    <h4
                      id={`game-${game?.id || index}`}
                      className="text-lg font-bold"
                    >
                      {game?.title || "Loading..."}
                    </h4>
                    <Link to={`/game/${game?.id}`}>
                      <Button className="mt-2" variant="default" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </article>
              )
            )}
          </div>
        </div>

        {/* Most Borrowed Games */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Most Borrowed Games</h3>
          <div className="grid grid-cols-3 gap-6 text-ac">
            {(games ? games.mostBorrowedGames : Array(3).fill(null)).map(
              (game, index) => (
                <article
                  key={game?.id || index}
                  className="bg-white shadow rounded-lg overflow-hidden"
                  aria-labelledby={`game-${game?.id || index}`}
                >
                  <img
                    src={game?.imageUrl || "https://via.placeholder.com/150"}
                    alt={game?.title || "Loading..."}
                    className={`w-full h-40 object-cover ${
                      !game && "bg-gray-300"
                    }`}
                  />
                  <div className="p-4">
                    <h4
                      id={`game-${game?.id || index}`}
                      className="text-lg font-bold"
                    >
                      {game?.title || "Loading..."}
                    </h4>
                    <Link to={`/game/${game?.id}`}>
                      <Button className="mt-2" variant="default" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </article>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
