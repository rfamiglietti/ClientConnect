import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Clientes from "./pages/Clientes";
import Interacoes from "./pages/Interacoes";
import Tarefas from "./pages/Tarefas";
import Pipeline from "./pages/Pipeline";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import Login from "./pages/Login";
import { useCRM } from "./lib/store";

function PrivateRoutes({ children }: { children: React.ReactNode }) {
  const user = useCRM((s) => s.usuario);
  if (!user) {
    return <Login />;
  }
  return <>{children}</>;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: (
      <PrivateRoutes>
        <Layout />
      </PrivateRoutes>
    ),
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/leads", element: <Leads /> },
      { path: "/clientes", element: <Clientes /> },
      { path: "/interacoes", element: <Interacoes /> },
      { path: "/tarefas", element: <Tarefas /> },
      { path: "/pipeline", element: <Pipeline /> },
      { path: "/relatorios", element: <Relatorios /> },
      { path: "/configuracoes", element: <Configuracoes /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Elemento root não encontrado no index.html");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
