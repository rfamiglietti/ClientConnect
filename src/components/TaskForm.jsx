// src/components/TaskForm.jsx
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function TaskForm({ clientId, onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          client_id: clientId,
          title,
          due_date: dueDate,
        }]);

      if (error) throw error;
      alert('Tarefa criada com sucesso!');
      setTitle('');
      setDueDate('');
      onTaskAdded();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      alert('Erro ao criar tarefa.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      <h3 className="text-xl font-bold">Nova Tarefa</h3>
      <div>
        <label className="block text-sm font-medium">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-50 dark:bg-gray-700"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Data de Vencimento</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-50 dark:bg-gray-700"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Criando...' : 'Criar Tarefa'}
      </button>
    </form>
  );
}

export default TaskForm;