import { useTranslation } from "react-i18next"
import { useNavigate, useLocation } from "react-router-dom"

import MobileMenu from "../MobileMenu"

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t, i18n } = useTranslation()

  const language = i18n.language

  const changeLanguage = (lng: "pt" | "en") => {
    i18n.changeLanguage(lng)
  }

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

  const handleEventsClick = () => {
    navigate("/events")
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="hidden lg:flex items-center justify-between">
          <button className="flex items-center space-x-3 cursor-pointer p-0" onClick={() => navigate("/")}>
            <div className="flex-shrink-0">
              <img src="/logo-oficial.png" alt="Felipe A Maré Vida" className="w-12 h-12 object-contain" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg md:text-xl font-bold text-gray-900 leading-tight">{t('project.title')}</span>
              <span className="text-xs text-gray-600">{t('project.subtitle')}</span>
            </div>
          </button>

          <nav className="flex items-center space-x-6">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-700 hover:text-[#63A6DC] transition-colors font-medium text-sm"
            >
              {t("nav.home")}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-[#63A6DC] transition-colors font-medium text-sm"
            >
              {t("nav.about")}
            </button>
            <button
              onClick={handleGalleryClick}
              className="text-gray-700 hover:text-[#63A6DC] transition-colors font-medium text-sm"
            >
              {t("nav.gallery")}
            </button>
            <button
              onClick={handleEventsClick}
              className="text-gray-700 hover:text-[#63A6DC] transition-colors font-medium text-sm"
            >
              {t("nav.events")}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-[#63A6DC] transition-colors font-medium text-sm"
            >
              {t("nav.contact")}
            </button>
          </nav>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => changeLanguage("pt")}
              className={`text-xl transition-all duration-200 hover:scale-110 ${language === "pt" ? "opacity-100 scale-110" : "opacity-60"
                }`}
              title="Português"
            >
              🇧🇷
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className={`text-xl transition-all duration-200 hover:scale-110 ${language === "en" ? "opacity-100 scale-110" : "opacity-60"
                }`}
              title="English"
            >
              🇺🇸
            </button>
          </div>
        </div>

        {/* Layout Mobile: Menu | Logo | Bandeiras */}
        <div className="flex lg:hidden items-center justify-between">
          {/* Menu Hamburguer */}
          <div className="flex-shrink-0">
            <MobileMenu />
          </div>

          <div className="flex-1 flex justify-center">
            <button className="cursor-pointer p-0" onClick={() => navigate("/")}>
              <img src="/logo-oficial.png" alt="Felipe A Maré Vida" className="w-10 h-10 object-contain" />
            </button>
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => changeLanguage("pt")}
              className={`text-lg transition-all duration-200 hover:scale-110 ${language === "pt" ? "opacity-100 scale-110" : "opacity-60"
                }`}
              title="Português"
            >
              🇧🇷
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className={`text-lg transition-all duration-200 hover:scale-110 ${language === "en" ? "opacity-100 scale-110" : "opacity-60"
                }`}
              title="English"
            >
              🇺🇸
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
