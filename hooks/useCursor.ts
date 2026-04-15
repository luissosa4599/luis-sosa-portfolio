"use client"

import {
  createContext,
  createElement,
  useContext,
  useState,
  type ReactNode,
} from "react"

type CursorLabel = "" | "read" | "view" | "send" | string

interface CursorContextValue {
  label: CursorLabel
  setLabel: (label: CursorLabel) => void
}

const CursorContext = createContext<CursorContextValue>({
  label: "",
  setLabel: () => {},
})

interface CursorProviderProps {
  children: ReactNode
}

function CursorProvider({ children }: CursorProviderProps) {
  const [label, setLabel] = useState<CursorLabel>("")

  return createElement(
    CursorContext.Provider,
    { value: { label, setLabel } },
    children,
  )
}

function useCursor(): CursorContextValue {
  return useContext(CursorContext)
}

export { CursorProvider, useCursor }
