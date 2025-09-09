// src/utils/storage.js
import { supabase } from '../lib/supabaseClient';

/**
 * Faz o upload de um arquivo para o bucket 'attachments' do Supabase.
 * @param {File} file O arquivo a ser enviado.
 * @param {string} clientId O ID do cliente a que o arquivo pertence.
 */
export async function uploadAttachment(file, clientId) {
  // Gera um nome único para o arquivo para evitar colisões
  const fileExtension = file.name.split('.').pop();
  const filePath = `${clientId}/${Date.now()}.${fileExtension}`;

  const { data, error } = await supabase.storage
    .from('attachments')
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  // Após o upload, salva os metadados na tabela 'attachments'
  const { data: attachmentRecord, error: dbError } = await supabase
    .from('attachments')
    .insert([
      {
        client_id: clientId,
        filename: file.name,
        path: filePath,
        uploaded_by_id: supabase.auth.user().id,
      },
    ])
    .select();

  if (dbError) {
    // Se a inserção falhar, tentamos deletar o arquivo do storage
    await supabase.storage.from('attachments').remove([filePath]);
    throw dbError;
  }

  return attachmentRecord[0];
}