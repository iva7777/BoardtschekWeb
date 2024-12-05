"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

type Game = {
  id: string;
  title: string;
  imageUrl?: string;
  availableQuantity: number;
  rentedOn?: string;
  dueDate?: string;
  returnedOn?: string;
};

export default function MyRentedGamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [historyGames, setHistoryGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const mockGames: Game[] = [
          {
            id: "1",
            title: "Game 1",
            availableQuantity: 1,
            rentedOn: "2023-05-01",
          },
          {
            id: "2",
            title: "Game 2",
            availableQuantity: 0,
            dueDate: "2023-04-30",
          },
          {
            id: "3",
            title: "Game 3",
            availableQuantity: -1,
            returnedOn: "2023-04-25",
          },
        ];
        setGames(mockGames.filter((game) => game.availableQuantity >= 0));
        setHistoryGames(
          mockGames.filter((game) => game.availableQuantity === -1)
        );
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  const handleReturnGame = async (gameId: string) => {
    setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
    setHistoryGames((prevHistory) => [
      ...prevHistory,
      {
        ...games.find((game) => game.id === gameId)!,
        availableQuantity: -1,
        returnedOn: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-800 text-white">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Account Dashboard</h1>
        <p className="text-yellow-400">Welcome, Player!</p>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Active Rentals</h2>
          {games.map((game) => (
            <Card key={game.id} className="bg-gray-700 text-white mb-4">
              <CardContent className="p-6">
                <Badge
                  className="mb-2"
                  variant={
                    game.availableQuantity > 0 ? "default" : "destructive"
                  }
                >
                  {game.availableQuantity > 0 ? "Currently Active" : "Overdue"}
                </Badge>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={game.imageUrl || "/placeholder.svg?height=50&width=50"}
                    alt={game.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{game.title}</h3>
                    <p className="text-sm text-yellow-400">
                      {game.availableQuantity > 0
                        ? `Rented on: ${new Date(
                            game.rentedOn!
                          ).toLocaleDateString()}`
                        : `Overdue since: ${new Date(
                            game.dueDate!
                          ).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    View Details
                  </Button>
                  {game.availableQuantity > 0 && (
                    <Button
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={() => handleReturnGame(game.id)}
                    >
                      Return Game
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <Separator className="my-8" />

        <section>
          <h2 className="text-2xl font-semibold mb-4">Rental History</h2>
          {historyGames.map((game) => (
            <Card key={game.id} className="bg-gray-700 text-white mb-4">
              <CardContent className="p-6">
                <Badge
                  variant="secondary"
                  className="mb-2"
                  style={{ color: "black" }}
                >
                  Returned
                </Badge>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={game.imageUrl || "/placeholder.svg?height=50&width=50"}
                    alt={game.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{game.title}</h3>
                    <p className="text-sm text-yellow-400">
                      Returned on:{" "}
                      {new Date(game.returnedOn!).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button className="bg-orange-500 hover:bg-gray-600">
                  View Details
                </Button>
                 {game.availableQuantity > 0 && (
                    <Button
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={() => handleReturnGame(game.id)}
                    >
                      Return Game
                    </Button>
                  )}
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
}
