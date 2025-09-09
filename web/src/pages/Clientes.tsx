import React, { useState } from "react";
import { useCRM } from "@/lib/store";
import { Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Clientes() {
  const clientes = useCRM((s) => s.clientes);
  const addCliente = useCRM((s) => s.addCliente);
  const removeCliente = useCRM((s) => s.removeCliente);

  const [novoCliente, setNovoCliente] = useState({ nome: "", empresa: "", email: "" });

  function handleAdd() {
    if (!novoCliente.nome || !novoCliente.empresa || !novoCliente.email) return;
    addCliente(novoCliente);
    setNovoCliente({ nome: "", empresa: "", email: "" });
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Nome"
          value={novoCliente.nome}
          onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
          className="input-glass"
        />
        <input
          type="text"
          placeholder="Empresa"
          value={novoCliente.empresa}
          onChange={(e) => setNovoCliente({ ...novoCliente, empresa: e.target.value })}
          className="input-glass"
        />
        <input
          type="email"
          placeholder="Email"
          value={novoCliente.email}
          onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
          className="input-glass"
        />
        <button onClick={handleAdd} className="btn-neon">
          <Plus size={18} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clientes.map((c) => (
          <motion.div
            key={c.id}
            whileHover={{ scale: 1.03, boxShadow: "0px 0px 20px #ff00ff" }}
            className="bg-gray-800 p-4 rounded-xl relative"
          >
            <h3 className="text-white font-semibold">{c.nome}</h3>
            <p className="text-gray-400">{c.empresa}</p>
            <p className="text-gray-500 text-sm">{c.email}</p>
            <button
              onClick={() => removeCliente(c.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
