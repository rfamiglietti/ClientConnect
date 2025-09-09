import React, { useState } from "react";
import { useCRM } from "@/lib/store";
import { Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Interacoes() {
  const interacoes = useCRM((s) => s.interacoes);
  const addInteracao = useCRM((s) => s.addInteracao);
  const removeInteracao = useCRM((s) => s.removeInteracao);

  const [nova, setNova] = useState({ titulo: "", descricao: "" });

  function handleAdd() {
    if (!nova.titulo || !nova.descricao) return;
    addInteracao(nova);
    setNova({ titulo: "", descricao: "" });
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Título"
          value={nova.titulo}
          onChange={(e) => setNova({ ...nova, titulo: e.target.value })}
          className="input-glass"
        />
        <input
          type="text"
          placeholder="Descrição"
          value={nova.descricao}
          onChange={(e) => setNova({ ...nova, descricao: e.target.value })}
          className="input-glass"
        />
        <button onClick={handleAdd} className="btn-neon">
          <Plus size={18} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {interacoes.map((i) => (
          <motion.div
            key={i.id}
            whileHover={{ scale: 1.03, boxShadow: "0px 0px 20px #ffcc00" }}
            className="bg-gray-800 p-4 rounded-xl relative"
          >
            <h3 className="text-white font-semibold">{i.descricao}</h3>
            <button
              onClick={() => removeInteracao(i.id)}
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
