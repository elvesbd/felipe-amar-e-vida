"use client"
import { useNavigate, useLocation } from "react-router-dom"

interface HeaderProps {
  readonly language: "pt" | "en"
  readonly setLanguage: (lang: "pt" | "en") => void
}

export default function Header({ language, setLanguage }: HeaderProps) {
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

  const scrollToSection = (sectionId: string) => {
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
    navigate("/gallery")
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <button className="flex items-center space-x-3 cursor-pointer p-0" onClick={() => navigate("/")}>
          <div className="flex-shrink-0">
            <img src="/logo-oficial.png" alt="Felipe A Maré Vida" className="w-12 h-12 object-contain" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-lg md:text-xl font-bold text-gray-900 leading-tight">Felipe A Maré Vida</span>
            <span className="text-xs text-gray-600 hidden md:block">Surfe Adaptado</span>
          </div>
        </button>

        <nav className="hidden lg:flex items-center space-x-6">
          <button
            onClick={() => scrollToSection("home")}
            className="text-gray-700 hover:text-[#63A6DC] transition-colors font-medium text-sm"
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-gray-700 hover:text-[#63A6DC] transition-colors font-medium text-sm"
          >
            {t.nav.about}
          </button>
          <button
            onClick={handleGalleryClick}
            className="text-gray-700 hover:text-[#63A6DC] transition-colors font-medium text-sm"
          >
            {t.nav.gallery}
          </button>
          <button
            onClick={() => scrollToSection("events")}
            className="text-gray-700 hover:text-[#63A6DC] transition-colors font-medium text-sm"
          >
            {t.nav.events}
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-gray-700 hover:text-[#63A6DC] transition-colors font-medium text-sm"
          >
            {t.nav.contact}
          </button>
        </nav>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setLanguage("pt")}
            className={`text-xl transition-all duration-200 hover:scale-110 ${language === "pt" ? "opacity-100 scale-110" : "opacity-60"
              }`}
            title="Português"
          >
            🇧🇷
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`text-xl transition-all duration-200 hover:scale-110 ${language === "en" ? "opacity-100 scale-110" : "opacity-60"
              }`}
            title="English"
          >
            🇺🇸
          </button>
        </div>
      </div>
    </header>
  )
}
