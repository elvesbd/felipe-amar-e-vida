import type React from "react"
import HomePage from "../pages/Home"
import GalleryPage from "../pages/Gallery"
import EventsPage from "../pages/Events"
import LoginPage from "../pages/Login"
import AdminDashboard from "../pages/admin/Dashboard"
import AdminEvents from "../pages/admin/Events"
import AdminGallery from "../pages/admin/Gallery"

export interface RouteConfig {
  path: string
  component: React.ComponentType<any>
  exact?: boolean
  protected?: boolean
  adminOnly?: boolean
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/gallery",
    component: GalleryPage,
  },
  {
    path: "/events",
    component: EventsPage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/admin",
    component: AdminDashboard,
    protected: true,
    adminOnly: true,
  },
  {
    path: "/admin/events",
    component: AdminEvents,
    protected: true,
    adminOnly: true,
  },
  {
    path: "/admin/gallery",
    component: AdminGallery,
    protected: true,
    adminOnly: true,
  },
]
