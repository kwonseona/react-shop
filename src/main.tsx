import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { DarkModeProvider } from "./DarkModeContext"

const rootElement = document.getElementById("root")

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </React.StrictMode>,
  )
} else {
  console.error("Error: root element not found")
}
