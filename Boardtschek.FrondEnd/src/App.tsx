import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { CreateAccount } from './components/CreateAccount'
import { LoginForm } from './components/LoginForm'

function App() {

  return (
    <>
      <BrowserRouter>
            <Routes>
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/login" element={<LoginForm />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
