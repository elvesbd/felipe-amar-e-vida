import { createPortal } from "react-dom"

export default function FullPageLoader() {
  const container = document.getElementById("fullpage-loader-root")
  if (!container) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        {/* Spinner colado como borda */}
        <div className="absolute w-[88px] h-[88px] border-[3px] border-[#63A6DC] border-t-transparent rounded-full animate-spin" />

        {/* Logo */}
        <img
          src="/logo-footer.png"
          alt="Loading..."
          className="w-20 h-20 object-contain"
        />
      </div>
    </div>,
    container
  )
}
