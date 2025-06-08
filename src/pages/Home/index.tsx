import Hero from "./components/Hero"
import About from "./components/About"
import Footer from "./components/Footer"
import Contact from "./components/Contact"
import Header from "../../components/Header"
import Schedule from "./components/Schedule"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col">
        <Hero />
        <About />
        <Schedule />
        <Contact />
      </div>
      <Footer />
    </div>
  )
}