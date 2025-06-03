interface SectionText {
  title: string;
  description: string;
}

interface ScheduleSection {
  title: string;
  days: string;
  time: string;
  location: string;
}

interface ContactSection {
  title: string;
  name: string;
  email: string;
  message: string;
  send: string;
  address: string;
  phone: string;
}

interface GallerySection {
  title: string;
  subtitle: string;
  cta: string;
}

export interface LanguageContent {
  // hero?: { cta: string }; // Caso volte a usar
  about: SectionText;
  founder: SectionText;
  schedule: ScheduleSection;
  contact: ContactSection;
  gallery: GallerySection;
}

export interface Content {
  [locale: string]: LanguageContent;
}
