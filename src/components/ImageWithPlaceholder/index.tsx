import { useState } from "react"

interface ImageWithPlaceholderProps {
  readonly src: string
  readonly alt: string
  readonly className?: string
}

export default function ImageWithPlaceholder({ src, alt, className = "" }: ImageWithPlaceholderProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative w-full h-full ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`
          max-w-full max-h-full object-contain mx-auto my-auto
          transition-opacity duration-300
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
        loading="lazy"
      />
    </div>
  )
}

