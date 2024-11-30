import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "./components/Auth/LoginForm";
import { CreateAccount } from "./components/Auth/CreateAccount";
import Homepage from "./components/Homepage/Homepage";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";

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
                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
