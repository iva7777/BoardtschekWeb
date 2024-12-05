export interface LikedGame {
    title: string;
}

export interface LikedGames {
    id: string;
    title: string;
    imageUrl: string;
  }
  
  export interface RentedGame {
    id: string;
    title: string;
    imageUrl: string;
    startDate: string;
    dueDate: string;
  }
  
  export interface User {
    firstName: string;
    lastName: string;
    imageUrl: string;
    activeRentedGames: RentedGame[];
    overdueRentedGames: RentedGame[];
    likedGames: LikedGames[];
  }