import type React from "react"
import HomePage from "../pages/Home"
import LoginPage from "../pages/Login"
import EventsPage from "../pages/Events"
import GalleryPage from "../pages/Gallery"
import AdminEvents from "../pages/admin/Events"
import AdminGallery from "../pages/admin/Gallery"
import TransparencyPage from "../pages/Transparency"
import AdminDashboard from "../pages/admin/Dashboard"

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
    path: "/galeria",
    component: GalleryPage,
  },
  {
    path: "/eventos",
    component: EventsPage,
  },
  {
    path: "/transparencia",
    component: TransparencyPage,
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
