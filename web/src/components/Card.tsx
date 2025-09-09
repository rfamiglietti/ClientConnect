// src/components/Card.tsx
import { motion } from "framer-motion";

export default function Card({ title, value, icon }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px #00ffff" }}
      className="bg-gray-800 p-5 rounded-xl flex items-center gap-4 transition-shadow"
    >
      {icon}
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </motion.div>
  );
}
