// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCRM } from "../lib/store";

export default function Login() {
  const navigate = useNavigate();

  // Usa o login do store (não setUsuario)
  const login = useCRM((s) => s.login);
  const usuarios = useCRM((s) => s.usuarios);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    // Verifica se o e-mail existe (store atual faz autenticação mock)
    const user = usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      setErro("Usuário não encontrado. Use um e-mail cadastrado.");
      return;
    }

    // OBS: o store 'login' aqui só recebe email — não valida senha.
    // Se quiser validar senha, implemente no backend/Supabase e substitua este fluxo.
    login(email);
    navigate("/");
  }

  return (
    <div className="min-h-screen grid place-items-center bg-base-900 bg-grid p-4">
      <div className="w-full max-w-md card-glass rounded-2xl p-6 border border-white/10">
        <h1 className="text-2xl font-semibold text-center mb-3">Entrar no ClientConnect</h1>
        <p className="text-sm opacity-70 text-center mb-4">Use um e-mail cadastrado (ex.: gerente@cliente.com)</p>

        {erro && (
          <div className="bg-red-900/60 text-red-200 text-sm p-2 mb-4 rounded">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-xs opacity-70">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full card-glass rounded-xl px-3 py-2 outline-none placeholder:opacity-60"
            placeholder="seu@email.com"
          />

          <label className="text-xs opacity-70">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full card-glass rounded-xl px-3 py-2 outline-none placeholder:opacity-60"
            placeholder="••••••••"
          />

          <button
            type="submit"
            className="mt-2 w-full rounded-xl px-4 py-2 bg-neon.cyan/20 hover:bg-neon.cyan/30 text-white font-semibold transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-xs opacity-60 mt-4">Dica: usuários de exemplo: <code>gerente@cliente.com</code>, <code>vendedora@cliente.com</code></p>
      </div>
    </div>
  );
}
