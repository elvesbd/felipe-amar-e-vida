// i18n.ts
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        translation: {
          nav: {
            home: "Início",
            about: "Sobre",
            gallery: "Galeria",
            events: "Eventos",
            contact: "Contato",
          },
        },
      },
      en: {
        translation: {
          nav: {
            home: "Home",
            about: "About",
            gallery: "Gallery",
            events: "Events",
            contact: "Contact",
          },
        },
      },
    },
    lng: "pt",
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
