interface FooterProps {
  readonly language: string
}

export default function Footer({ language }: FooterProps) {
  return (
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
  )
}