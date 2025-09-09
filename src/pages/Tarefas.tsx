import React, { useState } from "react";
import { useCRM } from "@/lib/store";
import { Plus, Check, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Tarefas() {
  const tarefas = useCRM((s) => s.tarefas);
  const addTarefa = useCRM((s) => s.addTarefa);
  const toggleTarefa = useCRM((s) => s.toggleTarefa);
  const removeTarefa = useCRM((s) => s.removeTarefa);

  const [nova, setNova] = useState("");

  function handleAdd() {
    if (!nova) return;
    addTarefa({ titulo: nova });
    setNova("");
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Nova tarefa"
          value={nova}
          onChange={(e) => setNova(e.target.value)}
          className="input-glass"
        />
        <button onClick={handleAdd} className="btn-neon">
          <Plus size={18} />
        </button>
      </div>

      <div className="space-y-2">
        {tarefas.map((t) => (
          <motion.div
            key={t.id}
            whileHover={{ scale: 1.02 }}
            className={`flex items-center justify-between p-3 rounded-xl transition ${
              t.concluida ? "bg-green-800/40 line-through" : "bg-gray-800"
            }`}
          >
            <span>{t.titulo}</span>
            <div className="flex gap-2">
              <button onClick={() => toggleTarefa(t.id)} className="text-neon-cyan">
                <Check size={16} />
              </button>
              <button onClick={() => removeTarefa(t.id)} className="text-red-500">
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
