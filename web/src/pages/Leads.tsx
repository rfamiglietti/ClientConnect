// src/pages/Leads.tsx
import React, { useState } from "react";
import { useCRM } from "@/lib/store";
import { Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Leads() {
  const leads = useCRM((s) => s.leads);
  const addLead = useCRM((s) => s.addLead);
  const removeLead = useCRM((s) => s.removeLead);

  const [novoLead, setNovoLead] = useState({ nome: "", empresa: "", email: "" });

  function handleAdd() {
    if (!novoLead.nome || !novoLead.empresa || !novoLead.email) return;
    addLead(novoLead);
    setNovoLead({ nome: "", empresa: "", email: "" });
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Nome"
          value={novoLead.nome}
          onChange={(e) => setNovoLead({ ...novoLead, nome: e.target.value })}
          className="input-glass"
        />
        <input
          type="text"
          placeholder="Empresa"
          value={novoLead.empresa}
          onChange={(e) => setNovoLead({ ...novoLead, empresa: e.target.value })}
          className="input-glass"
        />
        <input
          type="email"
          placeholder="Email"
          value={novoLead.email}
          onChange={(e) => setNovoLead({ ...novoLead, email: e.target.value })}
          className="input-glass"
        />
        <button onClick={handleAdd} className="btn-neon">
          <Plus size={18} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leads.map((lead) => (
          <motion.div
            key={lead.id}
            whileHover={{ scale: 1.03, boxShadow: "0px 0px 20px #00ffff" }}
            className="bg-gray-800 p-4 rounded-xl relative"
          >
            <h3 className="text-white font-semibold">{lead.nome}</h3>
            <p className="text-gray-400">{lead.empresa}</p>
            <p className="text-gray-500 text-sm">{lead.email}</p>
            <button
              onClick={() => removeLead(lead.id)}
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

