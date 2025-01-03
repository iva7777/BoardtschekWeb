
# Boardtschek 🎲

Boardtschek is a full-stack web application for renting and managing board games. It offers a seamless experience for users and administrators to explore, rent, and interact with a wide range of games.

---

## Tech Stack  👩🏼‍💻

### Frontend 🎀

- **Framework:** React
- **UI Library:** ShadCN UI
- **State Management:** React Hooks and Context
- **Authentication:** Bearer Tokens
- **Styling:** Tailwind CSS (via ShadCN)

### Backend 🗄️

- **Framework:** ASP.NET Core Web API
- **Database:** SQL Server (via SSMS)
- **Authentication:** ASP.NET Identity with Bearer Tokens

---

## Features  🪄

### User Features  👤

1. **Game Rental:**
    - Rent up to 5 games at a time.
    - Return rented games.
2. **Rating and Comments:**
    - Rate games on a scale of 1-5.
    - Add comments for each game.
3. **Game Requests:**
    - Request the admin to add new games.
4. **Profile Section:**
    - View rented games and rental history.
    - Overdue games are displayed at the top.
5. **Favorites:**
    - Mark games as favorites for easy access.
6. **Search and Filter:**
    - Search games by title, description, or keywords.
    - Filter games by difficulty, player count, and more.

### Admin Features 📘

1. **Game Management:**
    - Create, edit, and delete games.
2. **Manage User Requests:**
    - Review and approve requests for new games.

### Additional Features 🤸‍♂️

- **Homepage:**
    - Displays the most-borrowed and most-liked games.
- **Authentication:**
    - Only authorized users can access the application.

---

## Architecture  🗃️

### Backend Architecture:

- **Common:**
    - Entity validations.
- **Models:**
    - Database models and enums.
- **Data Project:**
    - Migrations and DbContext for connecting with the SQL Server database.
- **Services:**
    - Abstractions and implementations for business logic.
- **Infrastructure:**
    - Extensions and configurations.
- **ViewModels:**
    - DTOs to interact with the frontend.
- **WebAPI:**
    - RESTful endpoints.

### Frontend Architecture:

- **Components:**
    - Reusable UI components.
- **Services:**
    - Corresponding services for backend APIs.
- **Hooks:**
    - Custom React hooks for logic encapsulation.
- **Types:**
    - TypeScript types mirroring backend models.
- **Guards:**
    - Client-side authentication guards.
- **UI:**
    - ShadCN components for consistent styling.

---

## Database Structure 📂

### Entities and Relationships

#### Users

- **UserId:** Primary key.
- **Username:** User's unique name.
- **Email:** Email address.
- **PasswordHash:** Hashed password.
- **DateJoined:** Date the user registered.

#### Game

- **GameId:** Primary key.
- **Title:** Name of the game.
- **Picture:** Image URL of the game.
- **MinPlayers:** Minimum players required.
- **MaxPlayers:** Maximum players supported.
- **Description:** Game description.
- **Difficulty:** Difficulty level.
- **AvailableQuantity:** Quantity available for rental.
- **TotalQuantity:** Total copies of the game.
- **DateAdded:** Date the game was added.

#### Rentals

- **Id:** Primary key.
- **UserId:** Foreign key referencing `Users`.
- **GameId:** Foreign key referencing `Game`.
- **RentalDate:** Date of rental.
- **ExpectedReturnDate:** Expected date of return.
- **ActualReturnDate:** Actual date of return.

#### Rating

- **Id:** Primary key.
- **UserId:** Foreign key referencing `Users`.
- **GameId:** Foreign key referencing `Game`.
- **Rating:** Rating given to the game (1-5).
- **Comment:** Optional user comment.
- **RatingDate:** Date the rating was given.

---

## Prerequisites 💽

### Backend Requirements:

- **.NET SDK:** Version 6 or higher.
- **SQL Server:** Ensure the database is running.
- **Environment Variables:**
    - `ConnectionStrings:DefaultConnection` for the database.
    - `JWT_Secret` for token generation.

### Frontend Requirements:

- **Node.js:** Version 16 or higher.
- **Package Manager:** npm or yarn.

---

## Installation and Setup  💽

### Backend:

1. Clone the repository:
    
    ```bash
    git clone https://github.com/your-username/boardtschek-backend.git
    cd boardtschek-backend
    ```
    
2. Configure `appsettings.json`:
    
    ```json
    {
      "ConnectionStrings": {
        "DefaultConnection": "Your-Database-Connection-String"
      },
      "JWT_Secret": "Your-Secret-Key"
    }
    ```
    
3. Run migrations and start the server:
    
    ```bash
    dotnet ef database update
    dotnet run
    ```
    

### Frontend:

1. Clone the repository:
    
    ```bash
    git clone https://github.com/your-username/boardtschek-frontend.git
    cd boardtschek-frontend
    ```
    
2. Install dependencies:
    
    ```bash
    npm install
    ```
    
3. Start the development server:
    
    ```bash
    npm start
    ```
    

---

## Usage ▶️

1. Access the application in your browser at `http://localhost:3000`.
2. Register or log in to access features.
3. Start renting, rating, and managing board games!

---