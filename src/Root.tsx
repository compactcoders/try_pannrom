import { ThemeProvider } from "@/components/theme-provider"
import App from "./App"

function Root() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  )
}

export default Root
