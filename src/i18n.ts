// i18n.ts
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        translation: {
          project: {
            title: "Felipe A Maré Vida",
            subtitle: "Surfe Adaptado"
          },
          nav: {
            projectName: "Felipe A Maré Vida",
            home: "Início",
            about: "Sobre",
            gallery: "Galeria",
            events: "Eventos",
            contact: "Contato",
            transparency: "Transparência",
          },
          gallery: {
            categories: {
              all: "Todas",
              aulas: "Aulas",
              eventos: "Eventos",
              equipamentos: "Equipamentos",
            },
            backToHome: "Voltar ao Início",
            noPhotos: "Nenhuma foto encontrada nesta categoria.",
            loading: "Carregando fotos...",
          },
          footer: {
            message: "© 2025 Felipe A Maré Vida. Transformando vidas através do surfe."
          },
          about: {
            title: "Sobre o Projeto",
            description: `Felipe A Maré Vida é um programa social que promove a inclusão, a saúde, a proteção ao meio ambiente e a transformação de pessoas em situação de vulnerabilidade social e econômica, dando prioridade àquelas que não têm acesso a práticas esportivas, lazer ou atividades recreativas adaptadas — especialmente em áreas periféricas e comunidades de difícil acesso. Atuamos por meio do surf adaptado e do jiu-jitsu, oferecendo acesso gratuito ao esporte e proporcionando autonomia, autoestima e qualidade de vida por meio de experiências únicas de superação. Além das aulas regulares, desenvolvemos oficinas de sensibilização, capacitamos voluntários e firmamos parcerias com escolas, instituições e profissionais da saúde. Também promovemos a conscientização ambiental, incentivando o respeito e o cuidado com a natureza — fundamentais para garantir a sustentabilidade das práticas esportivas e o bem-estar das comunidades envolvidas. Acreditamos no poder transformador do esporte e no fortalecimento dos laços comunitários como caminho para a construção de um futuro mais justo, inclusivo, solidário e sustentável.`,
          },
          founder: {
            title: "Idealizador",
            description: `Luis Gustavo é um profissional dedicado e apaixonado pela educação física, com ampla experiência na área e uma trajetória marcada pelo compromisso com a inclusão e o desenvolvimento humano. Surfista e faixa-preta de jiu-jitsu, ele alia disciplina, ética e perseverança, refletindo esses valores em sua liderança à frente da instituição. Além de suas conquistas profissionais, Luis é um homem dedicado à família, marido da Dani e pai orgulhoso de Felipe e Mel. Sua postura ética, aliada a um caráter brilhante e inspirador, faz dele uma referência para todos que têm o privilégio de conviver e trabalhar com ele. Sob sua presidência, a instituição avança com foco na transformação social, na valorização das pessoas e na promoção de oportunidades reais para comunidades em situação de vulnerabilidade.`,
          },
          schedule: {
            title: "Horários das Aulas",
            days: "Terças e Quintas-feiras",
            time: "14h45 às 17h",
            location: "PF Surf School",
          },
          contact: {
            title: "Entre em Contato",
            subtitle: "Envie uma mensagem e entraremos em contato em breve.",
            name: "Nome",
            email: "E-mail",
            message: "Mensagem",
            send: "Enviar Mensagem",
            sending: "Enviando mensagem...",
            address: "Av. Clóvis Arrais Maia, 3070 - Vicente Pinzon, Fortaleza - CE",
            phone: "(85) 98837-8608",
            socialTitle: "Siga nas redes sociais"
          },
          eventsPage: {
            backToHome: "Voltar ao Início",
            noEvents: "Nenhum evento encontrado.",
            previous: "Anterior",
            next: "Próxima"
          },
          transparencyPage: {
            description:
              "Com o objetivo de prestar contas à sociedade, disponibilizamos neste espaço o arquivo com informações relacionadas aos recursos recebidos de emendas parlamentares para projetos da instituição.",
            noAmendments: "Nenhuma Emenda Registrada",
            noAmendmentsDescription:
              "Até o momento, este projeto não recebeu nenhuma emenda parlamentar. Quando houver movimentações, todos os documentos serão publicados aqui.",
            followUpdates: "Acompanhe esta página para futuras atualizações",
            whatAreAmendments: "O que são emendas?",
            amendmentsDescription:
              "Emendas parlamentares são recursos destinados por deputados e senadores para projetos específicos em municípios e estados.",
            ourCommitment: "Nosso compromisso",
            commitmentDescription:
              "Quando recebermos recursos, publicaremos aqui todos os documentos, valores e destinações de forma clara e acessível.",
          },
        },
      },
      en: {
        translation: {
          project: {
            title: "Felipe A Maré Vida",
            subtitle: "Adaptive Surfing"
          },
          nav: {
            home: "Home",
            about: "About",
            gallery: "Gallery",
            events: "Events",
            contact: "Contact",
            transparency: "Transparency",
          },
          gallery: {
            categories: {
              all: "All",
              aulas: "Classes",
              eventos: "Events",
              equipamentos: "Equipments",
            },
            backToHome: "Back to Home",
            noPhotos: "No photos found in this category.",
            loading: "Loading photos...",
          },
          footer: {
            message: "© 2025 Felipe A Maré Vida. Transforming lives through surfing."
          },
          about: {
            title: "About the Project",
            description: `Felipe A Maré Vida is a social program that promotes inclusion, health, environmental protection, and the transformation of individuals living in situations of social and economic vulnerability. It prioritizes those who lack access to sports, leisure, or adapted recreational activities—especially in underserved areas and hard-to-reach communities. We operate through adaptive surfing and jiu-jitsu, offering free access to sports and providing autonomy, self-esteem, and quality of life through unique experiences of overcoming challenges. In addition to regular classes, we develop awareness workshops, train volunteers, and build partnerships with schools, institutions, and healthcare professionals. We also promote environmental awareness by encouraging respect for and care of nature—both essential to ensuring the sustainability of sports practices and the well-being of the communities we serve. We believe in the transformative power of sport and in strengthening community bonds as a path toward building a more just, inclusive, supportive, and sustainable future.`,
          },
          founder: {
            title: "Visionary",
            description: `Luis Gustavo is a dedicated professional with a passion for physical education, extensive experience in the field, and a career marked by a strong commitment to inclusion and human development. A surfer and black belt in jiu-jitsu, he combines discipline, ethics, and perseverance—values that are clearly reflected in his leadership of the institution. In addition to his professional achievements, Luis is a devoted family man, husband to Dani and proud father of Felipe and Mel. His ethical conduct, combined with a brilliant and inspiring character, makes him a role model for everyone who has the privilege of working and interacting with him. Under his leadership, the institution moves forward with a focus on social transformation, valuing people, and promoting real opportunities for communities in vulnerable situations.
            `,
          },
          schedule: {
            title: "Class Schedule",
            days: "Tuesdays and Thursdays",
            time: "2:45 PM to 5:00 PM",
            location: "PF Surf School",
          },
          contact: {
            title: "Get in Touch",
            subtitle: "Send us a message and we will get back to you soon.",
            name: "Name",
            email: "Email",
            message: "Message",
            send: "Send Message",
            sending: "Sending message...",
            address: "Av. Clóvis Arrais Maia, 3070 - Vicente Pinzon, Fortaleza - CE",
            phone: "+55 85 98837-8608",
            socialTitle: "Follow us on social media"
          },
          eventsPage: {
            backToHome: "Back to Home",
            noEvents: "No events found.",
            previous: "Previous",
            next: "Next"
          },
          transparencyPage: {
            description:
              "With the aim of being accountable to society, we provide in this space the file with information related to funds received from parliamentary amendments for the institution's projects.",
            noAmendments: "No Amendments Registered",
            noAmendmentsDescription:
              "So far, this project has not received any parliamentary amendments. When there are movements, all documents will be published here.",
            followUpdates: "Follow this page for future updates",
            whatAreAmendments: "What are amendments?",
            amendmentsDescription:
              "Parliamentary amendments are resources allocated by deputies and senators for specific projects in municipalities and states.",
            ourCommitment: "Our commitment",
            commitmentDescription:
              "When we receive resources, we will publish here all documents, amounts and allocations in a clear and accessible way.",
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
