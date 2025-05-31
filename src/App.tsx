"use client"

import { useState } from "react"
import { Routes, Route } from "react-router-dom"

import HomePage from "./pages/Home"
import GalleryPage from "./pages/Gallery"


function App() {
  const [language, setLanguage] = useState<"pt" | "en">("pt")

  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<HomePage language={language} setLanguage={setLanguage} />} />
        <Route path="/gallery" element={<GalleryPage language={language} setLanguage={setLanguage} />} />
      </Routes>
    </div>
  )
}

export default App
