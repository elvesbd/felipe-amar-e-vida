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

export interface PhotoUploadData {
  files: File[]
  altText: string
  category: string
}
