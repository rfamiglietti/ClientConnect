// src/components/Attachments.jsx
import { useState, useEffect } from 'react';
import { getAttachmentsForClient, uploadAttachment } from '../utils/api';
import { supabase } from '../lib/supabaseClient';

function Attachments({ clientId }) {
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAttachments = async () => {
    setLoading(true);
    try {
      const fetchedAttachments = await getAttachmentsForClient(clientId);
      setAttachments(fetchedAttachments);
    } catch (err) {
      setError('Falha ao carregar anexos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttachments();
  }, [clientId]);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      await uploadAttachment(file, clientId);
      alert('Anexo enviado com sucesso!');
      fetchAttachments(); // Recarrega a lista
    } catch (err) {
      alert('Erro ao enviar o anexo.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const getSignedUrl = async (path) => {
    const { data } = await supabase.storage.from('attachments').getPublicUrl(path);
    return data.publicUrl;
  };

  if (loading) return <p>Carregando anexos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      <h3 className="text-xl font-bold">Anexos</h3>
      <div className="flex flex-col items-start space-y-2">
        <label className="bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-700">
          {uploading ? 'Enviando...' : 'Carregar Anexo'}
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {attachments.length > 0 && (
        <ul className="space-y-2">
          {attachments.map(attachment => (
            <li key={attachment.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md flex justify-between items-center">
              <span className="font-medium truncate">{attachment.filename}</span>
              <a
                href={getSignedUrl(attachment.path)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
              >
                Abrir
              </a>
            </li>
          ))}
        </ul>
      )}
      {attachments.length === 0 && !uploading && (
        <p className="text-gray-500 dark:text-gray-400">Nenhum anexo para este cliente.</p>
      )}
    </div>
  );
}

export default Attachments;