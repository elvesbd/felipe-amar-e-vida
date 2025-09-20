import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="py-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('about.title')}</h2>
        </div>

        {/* Primeiro bloco: Sobre o Projeto */}
        <div className="mb-16">
          {/* Layout para desktop (1024px+) */}
          <div className="hidden xl:grid xl:grid-cols-2 xl:gap-12 xl:items-start">
            <div className="w-full">
              <div className="aspect-[3/2] w-full rounded-lg overflow-hidden">
                <img
                  src="/about.png"
                  alt="Projeto Felipe A Maré Vida - Surfe Adaptado"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-gray-600 text-lg leading-relaxed text-justify">{t('about.description')}</p>
            </div>
          </div>

          {/* Layout em L para tablets (768px-1023px) */}
          <div className="hidden md:block xl:hidden">
            <div className="float-left mr-6 mb-4 w-1/2 max-w-sm">
              <div className="aspect-[3/2] w-full rounded-lg overflow-hidden">
                <img
                  src="/about.png"
                  alt="Projeto Felipe A Maré Vida - Surfe Adaptado"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-gray-600 text-base md:text-lg leading-relaxed text-justify">
              {t('about.description')}
            </div>
            <div className="clear-both"></div>
          </div>

          {/* Layout em coluna para mobile (<768px) */}
          <div className="md:hidden">
            <div className="mb-6">
              <div className="aspect-[3/2] w-full rounded-lg overflow-hidden">
                <img
                  src="/about.png"
                  alt="Projeto Felipe A Maré Vida - Surfe Adaptado"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-base leading-relaxed text-justify">{t('about.description')}</p>
            </div>
          </div>
        </div>

        {/* Segundo bloco: Fundador */}
        <div>
          {/* Layout para desktop (1024px+) */}
          <div className="hidden xl:grid xl:grid-cols-2 xl:gap-12 xl:items-start">
            <div className="w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('founder.title')}</h3>
              <p className="text-gray-600 text-lg leading-relaxed text-justify">{t('founder.description')}</p>
            </div>
            <div className="w-full">
              <div className="aspect-[4/3] w-full rounded-lg overflow-hidden">
                <img
                  src="/lg.jpg"
                  alt="Luiz Gustavo - Fundador do Projeto Felipe A Maré Vida"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Layout em L para tablets (768px-1023px) - Invertido */}
          <div className="hidden md:block xl:hidden">
            <div className="float-right ml-6 mb-4 w-1/2 max-w-sm">
              <div className="aspect-[4/3] w-full rounded-lg overflow-hidden">
                <img
                  src="/lg.jpg"
                  alt="Luiz Gustavo - Fundador do Projeto Felipe A Maré Vida"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-gray-600 text-base md:text-lg leading-relaxed text-justify">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{t('founder.title')}</h3>
              {t('founder.description')}
            </div>
            <div className="clear-both"></div>
          </div>

          {/* Layout em coluna para mobile (<768px) */}
          <div className="md:hidden">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('founder.title')}</h3>
            <div className="mb-6">
              <div className="aspect-[4/3] w-full rounded-lg overflow-hidden">
                <img
                  src="/lg.jpg"
                  alt="Luiz Gustavo - Fundador do Projeto Felipe A Maré Vida"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-base leading-relaxed text-justify">{t('founder.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}