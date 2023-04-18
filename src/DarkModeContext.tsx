import { createContext, useContext, useState } from "react"

interface DarkModeContextValue {
  darkMode: boolean
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

const DarkModeContext = createContext<DarkModeContextValue | undefined>(
  undefined,
)

export const useDarkMode = () => {
  const context = useContext(DarkModeContext)
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider")
  }
  return context
}

export const DarkModeProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}
