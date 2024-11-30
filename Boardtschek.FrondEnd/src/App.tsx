import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "./components/Auth/LoginForm";
import { CreateAccount } from "./components/Auth/CreateAccount";
import Homepage from "./components/Homepage/Homepage";
import Profile from "./components/Shared/Profile";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";
import Footer from "./components/Shared/Footer";
import AddGame from "./components/admin/AddGame"; 
import EditGame from "./components/admin/EditGame"; 
import EditGameById from "./components/admin/EditGameById";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <GuestGuard>
                            <LoginForm />
                        </GuestGuard>
                    }
                />
                <Route
                    path="/create-account"
                    element={
                        <GuestGuard>
                            <CreateAccount />
                        </GuestGuard>
                    }
                />
                <Route
                    path="/homepage"
                    element={
                        <AuthGuard>
                            <Homepage />
                        </AuthGuard>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <AuthGuard>
                            <Profile />
                        </AuthGuard>
                    }
                />
                <Route
                    path="/add-game"
                    element={
                        <AuthGuard>
                            <AddGame />
                        </AuthGuard>
                    }
                />
                 <Route
                    path="/edit-game"
                    element={
                        <AuthGuard>
                            <EditGame />
                        </AuthGuard>
                    }
                />
                <Route
                    path="/edit-game/:id"
                    element={
                        <AuthGuard>
                            <EditGameById />
                        </AuthGuard>
                    }
                />
                <Route path="/" element={<Navigate to="/create-account" replace />} />
                <Route path="/" element={<Navigate to="/create-account" replace />} />
            </Routes>
            {/* Footer */}
            <Footer />
        </BrowserRouter>
    );
}

export default App;
