export interface LikedGame {
    title: string;
}

export interface Rental {
    title: string;
    rentalDate: string;
    actualReturnDate: string | null;
}

export interface Rating {
    score: number;
    comment: string;
    ratingDate: string;
    title: string;
}

export interface ProfileData {
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    likedGames: LikedGame[];
    rentals: Rental[];
    ratings: Rating[];
}
