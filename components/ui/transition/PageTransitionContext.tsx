"use client"

import { createContext, useContext} from "react"

interface BackgroundColorContextType {
  backgroundColor: string
  isTransitioning: boolean
  setBackgroundColor: (color: string) => void
  startTransition: () => void
  endTransition: () => void
}

const BackgroundColorContext = createContext<BackgroundColorContextType>({
  backgroundColor: "transparent",
  isTransitioning: false,
  setBackgroundColor: () => {},
  startTransition: () => {},
  endTransition: () => {}
})

export function useBackgroundColor() {
  return useContext(BackgroundColorContext)
}
