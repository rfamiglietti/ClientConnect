// src/components/InteractionForm.jsx
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function InteractionForm({ clientId, onInteractionAdded }) {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('email');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('interactions')
        .insert([{
          client_id: clientId,
          description,
          type,
        }]);

      if (error) throw error;
      alert('Interação registrada com sucesso!');
      setDescription('');
      onInteractionAdded();
    } catch (error) {
      console.error('Erro ao registrar interação:', error);
      alert('Erro ao registrar interação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      <h3 className="text-xl font-bold">Nova Interação</h3>
      <div>
        <label className="block text-sm font-medium">Tipo de Interação</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-50 dark:bg-gray-700"
        >
          <option value="email">E-mail</option>
          <option value="phone">Ligação</option>
          <option value="meeting">Reunião</option>
          <option value="other">Outro</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-50 dark:bg-gray-700"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Salvando...' : 'Registrar Interação'}
      </button>
    </form>
  );
}

export default InteractionForm;