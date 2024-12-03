import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "@/api/axios";

interface Game {
  id: string;
  title: string;
}

export default function EditGameSelectionPage() {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchGames = async () => {
      setError("");
      try {
        const response = await apiClient.get("/Game/List", {
          withCredentials: true,
        });
        setGames(response.data);
        setLoading(false);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.message || "Failed to load games.");
        } else {
          setError("An unexpected error occurred.");
        }
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleEditClick = (id: string) => {
    navigate(`/edit/${id}`);
  };

  if (loading) return <p>Loading games...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-8 pb-8">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">
          Select a Game to Edit
        </h1>
        <ul className="space-y-4 mt-6">
          {games.map((game) => (
            <li key={game.id}>
              <div className="flex justify-between items-center">
                <span>{game.title}</span>
                <button
                  onClick={() => handleEditClick(game.id)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
