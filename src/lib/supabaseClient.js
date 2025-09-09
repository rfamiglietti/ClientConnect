// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Se as chaves não existirem, lançamos um erro.
// Isso evita problemas no build e no desenvolvimento.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("As variáveis de ambiente do Supabase não estão configuradas. Crie um arquivo .env.local na pasta web.");
}

/**
 * Cria o cliente Supabase para ser usado em todo o app.
 * As variáveis de ambiente são lidas do .env.local pelo Vite.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);