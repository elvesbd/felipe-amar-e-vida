import { useEffect, useState } from "react"

import AppRoutes from "./routes/components/AppRoutes"
import { useTranslation } from "react-i18next"


function App() {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState(i18n.language)

  useEffect(() => {
    const handler = (lng: string) => setLanguage(lng)
    i18n.on("languageChanged", handler)

    return () => {
      i18n.off("languageChanged", handler)
    }
  }, [i18n])

  return (
    <div className="min-h-screen bg-white">
      <AppRoutes language={language} setLanguage={(lng) => {
        i18n.changeLanguage(lng)
        setLanguage(lng)
      }} />
    </div>
  )
}

export default App
