import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";

// Sample list of games (you might get this from an API)
const games = [
  { id: "1", title: "Chess" },
  { id: "2", title: "Monopoly" },
  { id: "3", title: "Scrabble" },
  // Add more games here...
];

export default function EditGamePage() {
  const navigate = useNavigate();

  const handleEdit = (gameId: string) => {
    navigate(`/edit-game/${gameId}`); // Navigate to the EditGameById page with the selected game's ID
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-8 pb-8">
      <h1 className="text-2xl font-bold text-center">Edit a Game</h1>
      <p className="text-base text-gray-600 mt-4 text-center">
        Select a game to edit
      </p>

      {/* List of games */}
      <div className="space-y-4 mt-6">
        {games.map((game) => (
          <div key={game.id} className="flex items-center space-x-4">
            <p className="text-lg">{game.title}</p>
            <Button onClick={() => handleEdit(game.id)} className="w-24">
              Edit
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
