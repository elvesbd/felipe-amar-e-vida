import { Routes, Route } from "react-router-dom"

import { routes } from "../.."
import ProtectedRoute from "../ProtectedRoute"

export default function AppRoutes() {
  return (
    <Routes>
      {routes.map((route) => {
        const Component = route.component
        const element = <Component />

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
