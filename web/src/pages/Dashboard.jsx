// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ clients: 0, openTasks: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Contagem de clientes do usuário
        const { count: clientsCount, error: clientsError } = await supabase
          .from('clients')
          .select('*', { count: 'exact', head: true });
        if (clientsError) throw clientsError;
        
        // Contagem de tarefas abertas do usuário
        const { count: tasksCount, error: tasksError } = await supabase
          .from('tasks')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'open')
          .eq('owner_id', supabase.auth.user().id);
        if (tasksError) throw tasksError;

        setStats({ clients: clientsCount, openTasks: tasksCount });
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Carregando dashboard...</p>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card de Clientes */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Clientes Totais</h2>
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{stats.clients}</p>
        </div>
        
        {/* Card de Tarefas */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Tarefas Abertas</h2>
          <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">{stats.openTasks}</p>
        </div>
        
        {/* Adicione mais cards aqui se quiser */}
      </div>
      
      {/* Aqui podemos adicionar uma lista de clientes recentes ou tarefas pendentes */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Ações Rápidas</h2>
        {/* Coloque aqui links para clientes recentes, tarefas, etc */}
      </div>
    </div>
  );
}

export default Dashboard;