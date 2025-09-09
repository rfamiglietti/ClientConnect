// src/components/ClientForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient, updateClient } from '../utils/api';
import { useAuth } from '../hooks/useAuth'; // Importe o hook de autenticação

function ClientForm({ client, isEditing, onSave }) {
  const { user } = useAuth(); // <--- Pega o usuário logado
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'lead',
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditing && client) {
      setFormData(client);
    }
  }, [isEditing, client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEditing) {
        await updateClient(client.id, formData);
        alert('Cliente atualizado com sucesso!');
      } else {
        // Chamada da API, passando o ownerId agora
        await createClient(formData, user.id); 
        alert('Cliente criado com sucesso!');
      }
      onSave();
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar o cliente:', error);
      alert('Ocorreu um erro. Verifique o console.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold">{isEditing ? 'Editar Cliente' : 'Novo Cliente'}</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-50 dark:bg-gray-700" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Empresa</label>
        <input type="text" name="company" value={formData.company} onChange={handleChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-50 dark:bg-gray-700" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-50 dark:bg-gray-700" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-50 dark:bg-gray-700" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
        <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-50 dark:bg-gray-700">
          <option value="lead">Lead</option>
          <option value="prospect">Prospect</option>
          <option value="cliente">Cliente</option>
        </select>
      </div>
      <button type="submit" disabled={isLoading} className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
        {isLoading ? 'Salvando...' : 'Salvar Cliente'}
      </button>
    </form>
  );
}

export default ClientForm;