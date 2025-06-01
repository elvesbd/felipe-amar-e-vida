interface AboutProps {
  readonly content: any
}

export default function About({ content }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content.about.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative h-105">
            <img
              src="/about.jpg"
              alt="Projeto Felipe A Maré Vida - Surfe Adaptado"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed text-justify">{content.about.description}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{content.founder.title}</h3>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed text-justify">{content.founder.description}</p>
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
  )
}