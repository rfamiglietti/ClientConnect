// src/pages/Clients/ClientDetail.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { getTasksForClient, getInteractionsForClient, getAttachmentsForClient } from '../../utils/api'; 
import InteractionForm from '../../components/InteractionForm.jsx';
import TaskForm from '../../components/TaskForm.jsx';
import Attachments from '../../components/Attachments.jsx'; // Importe o componente

function ClientDetail() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [attachments, setAttachments] = useState([]); // Novo estado para anexos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClientData = async () => {
    setLoading(true);
    try {
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single();
      if (clientError) throw clientError;
      setClient(clientData);

      const fetchedTasks = await getTasksForClient(id);
      setTasks(fetchedTasks);

      const fetchedInteractions = await getInteractionsForClient(id);
      setInteractions(fetchedInteractions);

      const fetchedAttachments = await getAttachmentsForClient(id);
      setAttachments(fetchedAttachments); // Atualiza os anexos

    } catch (err) {
      setError('Falha ao carregar os detalhes do cliente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientData();
  }, [id]);

  if (loading) return <p className="text-center text-xl mt-10">Carregando detalhes do cliente...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!client) return <p className="text-center mt-10">Cliente não encontrado.</p>;

  return (
    <div className="p-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold">{client.name}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">{client.company}</p>
        <p>Email: {client.email}</p>
        <p>Telefone: {client.phone}</p>
        <p>Status: <span className="font-semibold">{client.status}</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coluna da esquerda: Formulários e Tarefas */}
        <div className="space-y-8">
          <TaskForm clientId={id} onTaskAdded={fetchClientData} />
          <InteractionForm clientId={id} onInteractionAdded={fetchClientData} />
          <Attachments clientId={id} /> {/* Novo componente de anexos */}
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Tarefas</h2>
            {tasks.length > 0 ? (
              <ul className="space-y-2">
                {tasks.map(task => (
                  <li key={task.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                    <p className="font-semibold">{task.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Vence em: {task.due_date}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Nenhuma tarefa para este cliente.</p>
            )}
          </div>
        </div>

        {/* Coluna da direita: Interações */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Histórico de Interações</h2>
            {interactions.length > 0 ? (
              <ul className="space-y-4">
                {interactions.map(interaction => (
                  <li key={interaction.id} className="border-l-4 border-blue-500 pl-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(interaction.created_at).toLocaleString()}
                    </p>
                    <p className="font-semibold capitalize">{interaction.type}</p>
                    <p>{interaction.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Nenhuma interação registrada.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDetail;