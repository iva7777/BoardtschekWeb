import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';

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
    const [error, setError] = useState<string | null>(null); // For error handling

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('/api/Home');
                console.log('Fetched games:', response.data); // Debugging: Log response
                setGames(response.data);
            } catch (error) {
                console.error('Error fetching games:', error);
                setError('Failed to fetch games. Please try again later.');
            }
        };

        fetchGames();
    }, []);

    if (error) {
        return <div className="text-red-500 text-center mt-8">{error}</div>;
    }

    if (!games) {
        return <div className="text-center mt-8">Loading...</div>;
    }

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

            {/* Top Games by Category */}
            <div className="py-8 px-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Top Games by Category</h2>

                {/* Highest Rated Games */}
                <div className="mb-12">
                    <h3 className="text-xl font-semibold mb-4">Highest Rated Games</h3>
                    {games.highestRatedGames.length > 0 ? (
                        <div className="grid grid-cols-3 gap-6">
                            {games.highestRatedGames.map((game) => (
                                <div key={game.id} className="bg-white shadow rounded overflow-hidden">
                                    <img
                                        src={game.imageUrl || 'https://via.placeholder.com/150'}
                                        alt={game.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h4 className="text-lg font-bold">{game.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 text-center">No highest-rated games found.</div>
                    )}
                </div>

                {/* Most Borrowed Games */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Most Borrowed Games</h3>
                    {games.mostBorrowedGames.length > 0 ? (
                        <div className="grid grid-cols-3 gap-6">
                            {games.mostBorrowedGames.map((game) => (
                                <div key={game.id} className="bg-white shadow rounded overflow-hidden">
                                    <img
                                        src={game.imageUrl || 'https://via.placeholder.com/150'}
                                        alt={game.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h4 className="text-lg font-bold">{game.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 text-center">No most-borrowed games found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
