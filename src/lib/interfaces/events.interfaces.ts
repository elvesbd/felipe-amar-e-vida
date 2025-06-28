export interface Event {
  id: string;
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  descriptionEn: string;
  fullDescriptionPt: string;
  fullDescriptionEn: string;
  publicUrl: string;
  location: string;
  isoDateBR: string; // formato: dd/mm/yyyy
  isoDateUS: string; // formato: yyyy-mm-dd
  startTime: string; // formato: HH:mm
  endTime: string;   // formato: HH:mm
  timezone: string;  // ex: "America/Sao_Paulo"
}

export interface EventResponse {
  events: Event[];
}

export interface IEvent {
  id?: string
  publicUrl: string
  isoDate: string | null
  startTime: string
  endTime: string
  timezone: string
  title: string
  description: string
  fullDescription?: string
  location: string
}

export interface RegisterEventResponse {
  message: string;
}

export interface DeleteEventResponse {
  message: string
}
