import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../../../components/Button";
import { useState } from "react";

export interface HeroProps {
  readonly content: any
  readonly language: string
}

export default function Hero({ content, language }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      image:
        "/banner_1.jpeg",
      /* title: language === "pt" ? "Transformando Vidas Através do Surfe" : "Transforming Lives Through Surfing",
      subtitle:
        language === "pt"
          ? "Aulas gratuitas de surfe adaptado na Praia do Futuro"
          : "Free adaptive surf lessons at Praia do Futuro", */
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80",
      /* title: language === "pt" ? "Inclusão e Superação" : "Inclusion and Overcoming",
      subtitle:
        language === "pt" ? "Quebrando barreiras e construindo sonhos" : "Breaking barriers and building dreams", */
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80",
      /* title: language === "pt" ? "Surfe Para Todos" : "Surfing For Everyone",
      subtitle: language === "pt" ? "Adaptando o esporte para cada necessidade" : "Adapting the sport for every need", */
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  /* const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 72
      const elementPosition = element.offsetTop - headerHeight

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  } */

  return (
    <section id="home" className="relative h-[600px] overflow-hidden">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <img src={slide.image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            {/* <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">{slide.title}</h1>
                <p className="text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed">{slide.subtitle}</p>
                <Button
                  size="lg"
                  className="bg-[#63A6DC] hover:bg-[#4a8bc4] text-white px-8 py-3 text-lg"
                  onClick={() => scrollToSection("about")}
                >
                  {content.hero.cta}
                </Button>
              </div>
            </div> */}
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}