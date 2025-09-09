import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Leads from "@/pages/Leads";
import Clientes from "@/pages/Clientes";
import Interacoes from "@/pages/Interacoes";
import Tarefas from "@/pages/Tarefas";
import Pipeline from "@/pages/Pipeline";
import Relatorios from "@/pages/Relatorios";
import Configuracoes from "@/pages/Configuracoes";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Dashboard />
              </motion.div>
            }
          />
          <Route path="leads" element={<Leads />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="interacoes" element={<Interacoes />} />
          <Route path="tarefas" element={<Tarefas />} />
          <Route path="pipeline" element={<Pipeline />} />
          <Route path="relatorios" element={<Relatorios />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
