import React from "react";
import { useCRM } from "@/lib/store";

export default function Configuracoes() {
  const usuario = useCRM((s) => s.usuario);
  const logout = useCRM((s) => s.logout);

  return (
    <div className="space-y-6">
      <h2 className="text-neon-cyan font-semibold">Configurações</h2>
      <p>Usuário logado: {usuario?.nome}</p>
      <button
        onClick={logout}
        className="btn-neon bg-red-600 hover:bg-red-500 w-max"
      >
        Sair
      </button>
    </div>
  );
}
