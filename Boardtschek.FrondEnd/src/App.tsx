import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginFormPage from "./pages/Login";
import CreateAccountPage from "./pages/Signup";
import SettingsPage from "./pages/Setting";
import HomePage from "./pages/Home";
import AddGamePage from "./pages/AddGame";
import EditGamePage from "./pages/EditGame";
import EditGameByIdPage from "./pages/EditGame/[id]";
import GameDetails from "./pages/GameDetails";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

import "./App.css";
import AllGamesPage from "./pages/AllGames";

function App() {
  const location = useLocation();
  const hideLayout = ["/login", "/create-account"].includes(location.pathname);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
            path="/add-game"
            element={
              <AuthGuard>
                <AddGamePage />
              </AuthGuard>
            }
          />
          <Route
            path="/edit-game"
            element={
              <AuthGuard>
                <EditGamePage />
              </AuthGuard>
            }
          />
          <Route
            path="/edit-game/:id"
            element={
              <AuthGuard>
                <EditGameByIdPage />
              </AuthGuard>
            }
          />
          <Route
            path="/GameDetails"
            element={
              <AuthGuard>
                <Route path="/game-details" element={<GameDetails />} />
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
          <Route path="/" element={<Navigate to="/create-account" replace />} />
        </Routes>
        {!hideLayout && <Footer />}
      </ThemeProvider>
    </>
  );
}

export default App;
