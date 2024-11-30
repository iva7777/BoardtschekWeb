import React, { useEffect, useState } from "react";
import axios from "@/api/axios";

interface Game {
    id: string;
    title: string;
    imageUrl: string;
}

interface HomePageGamesOverview {
    highestRatedGames: Game[];
    mostBorrowedGames: Game[];
}

const HomePage: React.FC = () => {
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
        <div className="min-h-screen bg-gray-100">
            {/* Header Section */}
            <div className="flex items-center justify-between px-8 py-12 bg-[#E6E7E9] max-w-7xl mx-auto">
                <div className="w-1/2">
                    <h1 className="text-4xl font-bold">Welcome to the Boardtschek</h1>
                    <p className="text-lg mt-4">
                        Discover a world of fun and strategy with our exclusive collection
                        of board games, available for all Nemetschek employees.
                    </p>
                    <button className="mt-6 px-6 py-2 bg-[#FF6F59] text-white rounded shadow hover:bg-[#FFC857]">
                        Rent
                    </button>
                </div>
                <div className="w-1/2 flex justify-center">
                    <img
                        src="https://via.placeholder.com/400x300"
                        alt="Board games preview"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-gray-200 py-4 px-6">
                <div className="flex justify-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-1/2 p-2 border rounded-l"
                    />
                    <button className="bg-[#FCB94D] text-white px-4 rounded-r hover:bg-[#F58220]">
                        Search
                    </button>
                </div>
            </div>

            {/* Top Games Section */}
            <div className="py-8 px-4 max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#457B9D]">Top Games</h2>

                {/* Highest Rated Games */}
                <div className="mb-12">
                    <h3 className="text-xl font-semibold mb-4">Highest Rated Games</h3>
                    <div className="grid grid-cols-3 gap-6">
                        {(games ? games.highestRatedGames : Array(3).fill(null)).map((game, index) => (
                            <div
                                key={game?.id || index}
                                className="bg-white shadow rounded overflow-hidden"
                            >
                                <img
                                    src={game?.imageUrl || "https://via.placeholder.com/150"}
                                    alt={game?.title || "Loading..."}
                                    className={`w-full h-40 object-cover ${!game && "bg-gray-300"}`}
                                />
                                <div className="p-4">
                                    <h4 className="text-lg font-bold">
                                        {game?.title || "Loading..."}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Most Borrowed Games */}
                <div className="mb-12">
                    <h3 className="text-xl font-semibold mb-4">Most Borrowed Games</h3>
                    <div className="grid grid-cols-3 gap-6">
                        {(games ? games.mostBorrowedGames : Array(3).fill(null)).map((game, index) => (
                            <div
                                key={game?.id || index}
                                className="bg-white shadow rounded overflow-hidden"
                            >
                                <img
                                    src={game?.imageUrl || "https://via.placeholder.com/150"}
                                    alt={game?.title || "Loading..."}
                                    className={`w-full h-40 object-cover ${!game && "bg-gray-300"}`}
                                />
                                <div className="p-4">
                                    <h4 className="text-lg font-bold">
                                        {game?.title || "Loading..."}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
