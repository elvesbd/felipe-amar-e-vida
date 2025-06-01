"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "../Button"

interface MobileMenuProps {
  language: "pt" | "en"
}

export default function MobileMenu({ language }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const content = {
    pt: {
      nav: {
        home: "Início",
        about: "Sobre",
        gallery: "Galeria",
        events: "Eventos",
        contact: "Contato",
      },
    },
    en: {
      nav: {
        home: "Home",
        about: "About",
        gallery: "Gallery",
        events: "Events",
        contact: "Contact",
      },
    },
  }

  const t = content[language]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false)

    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          const headerHeight = 72
          const elementPosition = element.offsetTop - headerHeight
          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          })
        }
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerHeight = 72
        const elementPosition = element.offsetTop - headerHeight
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        })
      }
    }
  }

  const handleGalleryClick = () => {
    setIsOpen(false)
    navigate("/gallery")
  }

  const handleEventsClick = () => {
    setIsOpen(false)
    navigate("/events")
  }

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="text-gray-700 hover:bg-gray-100"
        aria-label="Menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleMenu} />}

      {/* Menu Móvel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold text-lg">Menu</span>
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-gray-700">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex flex-col p-4">
          <button
            onClick={() => scrollToSection("home")}
            className="py-3 px-4 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="py-3 px-4 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            {t.nav.about}
          </button>
          <button
            onClick={handleGalleryClick}
            className="py-3 px-4 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            {t.nav.gallery}
          </button>
          <button
            onClick={handleEventsClick}
            className="py-3 px-4 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            {t.nav.events}
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="py-3 px-4 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            {t.nav.contact}
          </button>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex justify-center space-x-4">
            <img src="/logo-oficial.png" alt="Logo" className="h-10 w-10" />
          </div>
        </div>
      </div>
    </div>
  )
}
