import { Bell, UserCircle, Sun, Moon } from "lucide-react";
import { useCRM } from "@/lib/store";
import { useState, useEffect } from "react";

export default function Header() {
  const usuario = useCRM((s) => s.usuario);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <header className="flex items-center justify-between bg-gray-900 dark:bg-gray-900/90 p-4 border-b border-gray-700">
      <h2 className="text-xl font-bold text-neon-cyan">Olá, {usuario?.nome ?? "Visitante"}</h2>
      <div className="flex items-center gap-4">
        <button onClick={() => setDarkMode(!darkMode)} className="text-neon-cyan">
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <button className="relative">
          <Bell size={24} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>
        <UserCircle size={32} />
      </div>
    </header>
  );
}
