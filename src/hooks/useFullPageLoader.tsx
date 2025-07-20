import { useState, useCallback } from "react"
import FullPageLoader from "../components/FullPageLoader"

export function useFullPageLoader() {
  const [loading, setLoading] = useState(false)

  const showLoader = useCallback(() => setLoading(true), [])
  const hideLoader = useCallback(() => setLoading(false), [])

  const Loader = loading ? <FullPageLoader /> : null

  return { showLoader, hideLoader, Loader }
}
