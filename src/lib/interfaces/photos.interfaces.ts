export interface Photo {
  id: string
  size: string
  altText: string
  category: string
  publicUrl: string
  uploadDate: string
  originalName: string;
  thumbnailUrl?: string
}

export interface GalleryPhoto {
  id: string
  publicUrl: string
  category: string
  altTextEn: string
  altTextPt: string
}

export interface GalleryPhotoResponse {
  photos: GalleryPhoto[]
}

export interface RegisterPhotoData {
  photos: {
    altText: string
    publicUrl: string
  }[]
  category: string
}

export interface RegisterPhotoResponse {
  message: string;
}

export interface DeletePhotoResponse {
  message: string;
}

export interface UploadedPhotoFormData {
  category: string
  photos: Array<{
    file: File
    altText: string
    publicUrl: string
  }>
}

export interface PhotoUploadData {
  files: File[]
  altText: string
  category: string
}

export interface PhotoItem {
  file: File
  preview: string
  altText: string
  id: string
}
