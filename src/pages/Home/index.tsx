"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Phone, Mail, Clock } from "lucide-react"

import Header from "../../components/Header"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { Textarea } from "../../components/TextArea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Card"

interface HomePageProps {
  readonly language: "pt" | "en"
  readonly setLanguage: (lang: "pt" | "en") => void
}

export default function HomePage({ language, setLanguage }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80",
      title: language === "pt" ? "Transformando Vidas Através do Surfe" : "Transforming Lives Through Surfing",
      subtitle:
        language === "pt"
          ? "Aulas gratuitas de surfe adaptado na Praia do Futuro"
          : "Free adaptive surf lessons at Praia do Futuro",
    },
    {
      image:
        "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80",
      title: language === "pt" ? "Inclusão e Superação" : "Inclusion and Overcoming",
      subtitle:
        language === "pt" ? "Quebrando barreiras e construindo sonhos" : "Breaking barriers and building dreams",
    },
    {
      image:
        "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80",
      title: language === "pt" ? "Surfe Para Todos" : "Surfing For Everyone",
      subtitle: language === "pt" ? "Adaptando o esporte para cada necessidade" : "Adapting the sport for every need",
    },
  ]

  const content = {
    pt: {
      hero: {
        cta: "Conheça Nossa História",
      },
      about: {
        title: "Sobre o Projeto",
        description:
          "O projeto Felipe Amar e Vida, também conhecido como 'A Maré Vida', oferece aulas gratuitas de surfe adaptado para pessoas com deficiência física, visual e cognitiva na Praia do Futuro, em Fortaleza. Fundado em 2016, o projeto atende atualmente 12 alunos ativos com idades entre 8 e 47 anos.",
      },
      founder: {
        title: "Luiz Gustavo - Fundador",
        description:
          "Conhecido como Gustavim, proprietário da PF Surf School, fundou o projeto com o sonho de tornar o surfe acessível a todos, independentemente de limitações físicas ou cognitivas. As aulas acontecem às terças e quintas-feiras, das 14h45 às 17h, na PF Surf School localizada na Praia do Futuro.",
      },
      schedule: {
        title: "Horários das Aulas",
        days: "Terças e Quintas-feiras",
        time: "14h45 às 17h",
        location: "PF Surf School - Praia do Futuro",
      },
      contact: {
        title: "Entre em Contato",
        name: "Nome",
        email: "E-mail",
        message: "Mensagem",
        send: "Enviar Mensagem",
        address: "Av. Clóvis Arrais Maia, 3070 - Vicente Pinzon, Fortaleza - CE",
        phone: "(85) 98837-8608",
      },
      gallery: {
        title: "Galeria",
        subtitle: "Veja nossos momentos especiais",
        cta: "Ver Todas as Fotos",
      },
    },
    en: {
      hero: {
        cta: "Learn Our Story",
      },
      about: {
        title: "About the Project",
        description:
          "The Felipe Amar e Vida project, also known as 'A Maré Vida', offers free adaptive surf lessons for people with physical, visual and cognitive disabilities at Praia do Futuro, in Fortaleza. Founded in 2016, the project currently serves 12 active students aged between 8 and 47 years old.",
      },
      founder: {
        title: "Luiz Gustavo - Founder",
        description:
          "Known as Gustavim, owner of PF Surf School, founded the project with the dream of making surfing accessible to everyone, regardless of physical or cognitive limitations. Classes take place on Tuesdays and Thursdays, from 2:45 PM to 5:00 PM, at PF Surf School located at Praia do Futuro.",
      },
      schedule: {
        title: "Class Schedule",
        days: "Tuesdays and Thursdays",
        time: "2:45 PM to 5:00 PM",
        location: "PF Surf School - Praia do Futuro",
      },
      contact: {
        title: "Get in Touch",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message",
        address: "Av. Clóvis Arrais Maia, 3070 - Vicente Pinzon, Fortaleza - CE",
        phone: "(85) 98837-8608",
      },
      gallery: {
        title: "Gallery",
        subtitle: "See our special moments",
        cta: "View All Photos",
      },
    },
  }

  const t = content[language]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const scrollToSection = (sectionId: string) => {
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

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} setLanguage={setLanguage} />

      {/* Hero Section */}
      <section id="home" className="relative h-[600px] overflow-hidden">
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
            >
              <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-4">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">{slide.title}</h1>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed">{slide.subtitle}</p>
                  <Button
                    size="lg"
                    className="bg-[#63A6DC] hover:bg-[#4a8bc4] text-white px-8 py-3 text-lg"
                    onClick={() => scrollToSection("about")}
                  >
                    {t.hero.cta}
                  </Button>
                </div>
              </div>
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
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.about.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-80">
              <img
                src="/about.jpg"
                alt="Projeto Felipe A Maré Vida - Surfe Adaptado"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{t.about.description}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.founder.title}</h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{t.founder.description}</p>
            </div>
            <div className="relative h-80">
              <img
                src="/lg.jpg"
                alt="Luiz Gustavo - Fundador do Projeto Felipe A Maré Vida"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-16 bg-[#63A6DC] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">{t.schedule.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Calendar className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.schedule.days}</h3>
            </div>
            <div>
              <Clock className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.schedule.time}</h3>
            </div>
            <div>
              <MapPin className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.schedule.location}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 bg-gray-50 min-h-[80vh]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === "pt" ? "Eventos" : "Events"}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            {language === "pt"
              ? "Acompanhe nossos próximos eventos e atividades"
              : "Follow our upcoming events and activities"}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-[#63A6DC] mt-1 flex-shrink-0" />
                  <span className="text-gray-600 leading-relaxed">{t.contact.address}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-[#63A6DC] flex-shrink-0" />
                  <span className="text-gray-600">{t.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-[#63A6DC] flex-shrink-0" />
                  <span className="text-gray-600">lgustavim@felipeamarevida.com.br</span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Siga nas redes sociais</h3>
                <div className="flex space-x-6">
                  <a href="#" className="hover:opacity-80 transition-opacity" title="Facebook">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                        fill="#1877F2"
                      />
                    </svg>
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity" title="Instagram">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                      <defs>
                        <radialGradient id="instagram-gradient" cx="0.5" cy="1" r="1">
                          <stop offset="0%" stopColor="#FED373" />
                          <stop offset="15%" stopColor="#F15245" />
                          <stop offset="40%" stopColor="#D92E7F" />
                          <stop offset="70%" stopColor="#9B2FAE" />
                          <stop offset="95%" stopColor="#8B3DFF" />
                        </radialGradient>
                      </defs>
                      <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                        fill="url(#instagram-gradient)"
                      />
                    </svg>
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity" title="YouTube">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                        fill="#FF0000"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t.contact.title}</CardTitle>
                <CardDescription>
                  {language === "pt"
                    ? "Envie uma mensagem e entraremos em contato em breve."
                    : "Send us a message and we will get back to you soon."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder={t.contact.name} />
                <Input type="email" placeholder={t.contact.email} />
                <Textarea placeholder={t.contact.message} rows={4} />
                <Button className="w-full bg-[#63A6DC] hover:bg-[#4a8bc4] text-white">{t.contact.send}</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo-footer.png" alt="Felipe A Maré Vida" className="w-12 h-12" />
          </div>
          <p className="text-gray-400">
            {language === "pt"
              ? "© 2024 Felipe A Maré Vida. Transformando vidas através do surfe."
              : "© 2024 Felipe A Maré Vida. Transforming lives through surfing."}
          </p>
        </div>
      </footer>
    </div>
  )
}
