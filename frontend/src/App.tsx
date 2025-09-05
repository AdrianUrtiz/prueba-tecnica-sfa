import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import UsuariosPage from "@/pages/UsuariosPage"
import LoginPage from "@/pages/LoginPage"
import { useAuth } from "@/context/AuthContext"

function App() {
    const { token } = useAuth()
    const isAuthenticated = !!token

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
                <Route
                    path="/dashboard"
                    element={
                        isAuthenticated ? <UsuariosPage /> : <Navigate to="/" replace />
                    }
                />
                <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App