// src/pages/Clients/ClientsList.jsx
import { useState, useEffect } from 'react';
import { getClients, deleteClient } from '../../utils/api';
import { Link } from 'react-router-dom';

function ClientsList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const { clients: fetchedClients } = await getClients({});
      setClients(fetchedClients);
    } catch (err) {
      setError('Falha ao carregar os clientes.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (clientId) => {
    if (window.confirm('Tem certeza que deseja deletar este cliente?')) {
      try {
        await deleteClient(clientId);
        // Atualiza a lista removendo o cliente deletado
        setClients(clients.filter(client => client.id !== clientId));
      } catch (error) {
        alert('Erro ao deletar o cliente.');
        console.error(error);
      }
    }
  };

  if (loading) return <p>Carregando clientes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Meus Clientes</h1>
        <Link to="/clients/new" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          + Adicionar Novo
        </Link>
      </div>
      {clients.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum cliente encontrado. Adicione um para começar!</p>
      ) : (
        <ul className="space-y-4">
          {clients.map(client => (
            <li key={client.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <Link to={`/clients/${client.id}`} className="text-lg font-semibold text-blue-600 hover:underline">
                  {client.name}
                </Link>
                <p className="text-gray-500 text-sm">{client.company}</p>
              </div>
              <div className="space-x-2">
                <Link to={`/clients/edit/${client.id}`} className="text-blue-500 hover:text-blue-700">
                  Editar
                </Link>
                <button onClick={() => handleDelete(client.id)} className="text-red-500 hover:text-red-700">
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClientsList;