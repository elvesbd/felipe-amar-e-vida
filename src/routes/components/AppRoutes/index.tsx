import { Routes, Route } from "react-router-dom"
import { routes } from "../.."
import ProtectedRoute from "../ProtectedRoute"

interface AppRoutesProps {
  readonly language: string
  readonly setLanguage: (lang: "pt" | "en") => void
}

export default function AppRoutes({ language, setLanguage }: AppRoutesProps) {
  return (
    <Routes>
      {routes.map((route) => {
        const Component = route.component
        const element = <Component language={language} setLanguage={setLanguage} />

        if (route.protected) {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<ProtectedRoute adminOnly={route.adminOnly}>{element}</ProtectedRoute>}
            />
          )
        }

        return <Route key={route.path} path={route.path} element={element} />
      })}
    </Routes>
  )
}
