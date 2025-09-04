import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="bg-slate-900/50 border-cyan-500/30 hover:bg-slate-800/50 hover:border-cyan-400 text-white subtle-glow transition-all duration-300 hover:scale-105 magnetic">
          <Sun className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-400" />
          <Moon className="absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 text-white">
        <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-white/10 focus:bg-white/10 font-mono tracking-wider transition-all duration-300 magnetic">
          <Sun className="w-4 h-4 mr-2 text-yellow-400" />
          <span>LIGHT</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-white/10 focus:bg-white/10 font-mono tracking-wider transition-all duration-300 magnetic">
          <Moon className="w-4 h-4 mr-2 text-blue-400" />
          <span>DARK</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="hover:bg-white/10 focus:bg-white/10 font-mono tracking-wider transition-all duration-300 magnetic">
          <Monitor className="w-4 h-4 mr-2 text-slate-400" />
          <span>SYSTEM</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
