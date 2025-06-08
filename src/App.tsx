import { AuthProvider } from "./contexts/AuthContext"
import AppRoutes from "./routes/components/AppRoutes"

function App() {
  return (
    <div className="min-h-screen bg-white">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  )
}

export default App
