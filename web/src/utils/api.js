// src/utils/api.js
import { supabase } from '../lib/supabaseClient';

// A função getUserId foi removida daqui, vamos passar o ID diretamente.
// ... (mantenha todas as outras funções)

export async function createClient(clientData, ownerId) {
  const { data, error } = await supabase
    .from('clients')
    .insert([{ ...clientData, owner_id: ownerId }])
    .select();
  
  if (error) throw error;
  return data[0];
}


 // Funções de CRUD para a tabela 'clients'
 
export async function getClients({ page = 1, pageSize = 10 }) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  
  const { data, error, count } = await supabase
    .from('clients')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);
    
  if (error) throw error;
  return { clients: data, count };
}

// export async function createClient(clientData) {
//   const { data, error } = await supabase
//     .from('clients')
//     .insert([{ ...clientData, owner_id: getUserId() }])
//     .select();
  
//   if (error) throw error;
//   return data[0];
// }

export async function updateClient(clientId, updateData) {
  const { data, error } = await supabase
    .from('clients')
    .update(updateData)
    .eq('id', clientId)
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function deleteClient(clientId) {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', clientId);
  
  if (error) throw error;
  return true;
}

/**
 * Funções de CRUD para a tabela 'tasks'
 */
export async function getTasksForClient(clientId) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('client_id', clientId)
    .order('due_date', { ascending: true });
  
  if (error) throw error;
  return data;
}

/**
 * Funções de CRUD para a tabela 'interactions'
 */
export async function getInteractionsForClient(clientId) {
  const { data, error } = await supabase
    .from('interactions')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

/**
 * Funções de CRUD para a tabela 'attachments'
 */
export async function getAttachmentsForClient(clientId) {
  const { data, error } = await supabase
    .from('attachments')
    .select('*')
    .eq('client_id', clientId)
    .order('uploaded_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function uploadAttachment(file, clientId) {
  const fileExtension = file.name.split('.').pop();
  const filePath = `${clientId}/${Date.now()}.${fileExtension}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('attachments')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Erro no upload do arquivo:', uploadError);
    throw uploadError;
  }

  const { data: attachmentRecord, error: dbError } = await supabase
    .from('attachments')
    .insert([
      {
        client_id: clientId,
        filename: file.name,
        path: uploadData.path,
        uploaded_by_id: getUserId(),
      },
    ])
    .select();

  if (dbError) {
    await supabase.storage.from('attachments').remove([uploadData.path]);
    console.error('Erro ao salvar metadados do anexo:', dbError);
    throw dbError;
  }

  return attachmentRecord[0];
}