import Card from "@/components/Card";
import { Users, ClipboardList, FileText } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const data = [
    { name: "Leads", value: 40 },
    { name: "Clientes", value: 30 },
    { name: "Tarefas", value: 30 },
  ];
  const COLORS = ["#00ffff", "#ff00ff", "#ffcc00"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card title="Leads Ativos" value={24} icon={<ClipboardList size={28} className="text-neon-cyan" />} />
      <Card title="Clientes" value={12} icon={<Users size={28} className="text-neon-magenta" />} />
      <Card title="Tarefas Pendentes" value={8} icon={<FileText size={28} className="text-neon-yellow" />} />

      <div className="col-span-full lg:col-span-2 card-glass">
        <h3 className="text-neon-cyan mb-4 font-semibold">Distribuição</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
