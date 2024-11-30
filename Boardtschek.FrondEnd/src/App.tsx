import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import { CreateAccount } from './components/Auth/CreateAccount.tsx'
import { LoginForm } from './components/Auth/LoginForm.tsx'
import AuthGuard from './guards/AuthGuard';
import Header from "./components/Shared/Header.tsx";
import Homepage from "@/components/Homepage/Homepage.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/login" element={<LoginForm />} />
                <Route
                    path="/homepage"
                    element={
                        <AuthGuard>
                            <Homepage />
                        </AuthGuard>
                    }
                />
                <Route path="/" element={<Navigate to="/create-account" replace />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
