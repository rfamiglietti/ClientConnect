import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useCRM } from "@/lib/store";

export default function Relatorios() {
  const leads = useCRM((s) => s.leads);
  const data = [
    { name: "Novo", value: leads.filter((l) => l.status === "novo").length },
    { name: "Contato", value: leads.filter((l) => l.status === "contato").length },
  { name: "Qualificado", value: leads.filter((l) => l.status === "qualificado").length },
  ];
  const COLORS = ["#00ffff", "#ff00ff", "#ffcc00"];

  return (
    <div className="bg-gray-800 p-5 rounded-xl">
      <h2 className="text-neon-cyan font-semibold mb-4">Relatórios de Leads</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
