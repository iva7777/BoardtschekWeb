import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginFormPage from "./pages/Login";
import CreateAccountPage from "./pages/Signup";
import SettingsPage from "./pages/Setting";
import HomePage from "./pages/Home";
import AddGamePage from "./pages/AddGame";
import SearchResultsPage from "./pages/SearchResults";
import EditGameByIdPage from "./pages/EditGame/[id]";
import GameDetails from "./pages/Game/[id]";
import MyRentedGamesPage from "./pages/Settings/Rented";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";
import { ThemeProvider } from "@/components/theme-provider/ThemeProvider";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { Toaster } from "./components/ui/toaster";
import "./App.css";
import AllGamesPage from "./pages/AllGames";

function App() {
  const location = useLocation();
  const hideLayout = ["/login", "/create-account"].includes(location.pathname);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        {!hideLayout && <Navbar />}
        <Routes>
          <Route
            path="/login"
            element={
              <GuestGuard>
                <LoginFormPage />
              </GuestGuard>
            }
          />
          <Route
            path="/create-account"
            element={
              <GuestGuard>
                <CreateAccountPage />
              </GuestGuard>
            }
          />
          <Route
            path="/home"
            element={
              <AuthGuard>
                <HomePage />
              </AuthGuard>
            }
          />
          <Route
            path="/settings"
            element={
              <AuthGuard>
                <SettingsPage />
              </AuthGuard>
            }
          />
          <Route
            path="/settings/rents"
            element={
              <AuthGuard>
                <MyRentedGamesPage />
              </AuthGuard>
            }
          />
          <Route
            path="/add-game"
            element={
              <AuthGuard requiredRole="admin">
                <AddGamePage />
              </AuthGuard>
            }
          />
          <Route
            path="/edit-game/:id"
            element={
              <AuthGuard requiredRole="admin">
                <EditGameByIdPage />
              </AuthGuard>
            }
          />
          <Route
            path="/game/:gameId"
            element={
              <AuthGuard>
                <GameDetails />
              </AuthGuard>
            }
          />
          <Route
            path="/games"
            element={
              <AuthGuard>
                <AllGamesPage />
              </AuthGuard>
            }
          />
          {/* Add the Search Route */}
          <Route
            path="/search/:query"
            element={
              <AuthGuard>
                <SearchResultsPage />
              </AuthGuard>
            }
          />
          <Route path="/" element={<Navigate to="/create-account" replace />} />
        </Routes>
        {!hideLayout && <Footer />}
      </ThemeProvider>
    </>
  );
}

export default App;
