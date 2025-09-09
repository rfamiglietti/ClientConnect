// src/components/Sidebar.tsx
import { motion } from "framer-motion";
import { Home, Users, ClipboardList, Settings, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Dashboard", icon: Home, path: "/" },
  { label: "Leads", icon: ClipboardList, path: "/leads" },
  { label: "Clientes", icon: Users, path: "/clientes" },
  { label: "Interações", icon: FileText, path: "/interacoes" },
  { label: "Tarefas", icon: ClipboardList, path: "/tarefas" },
  { label: "Pipeline", icon: FileText, path: "/pipeline" },
  { label: "Relatórios", icon: FileText, path: "/relatorios" },
  { label: "Configurações", icon: Settings, path: "/configuracoes" },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <motion.div
      initial={{ width: 80 }}
      animate={{ width: 240 }}
      className="bg-gray-800 flex flex-col p-4 space-y-4 shadow-xl"
    >
      <h1 className="text-xl font-bold text-neon-cyan mb-4 text-center">ClientConnect</h1>
      {links.map((link) => {
        const Icon = link.icon;
        const active = location.pathname === link.path;
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition ${
              active ? "bg-gray-700" : ""
            }`}
          >
            <Icon size={20} className={active ? "text-neon-cyan" : "text-white"} />
            <span className="font-medium">{link.label}</span>
          </Link>
        );
      })}
    </motion.div>
  );
}
