import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Inicializa a aplicação Flask e o CORS
app = Flask(__name__)
CORS(app)

# Configuração do cliente Supabase
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# --- Funções de Resposta Padrão ---
def success_response(data, status_code=200):
    return jsonify(data), status_code

def error_response(message, status_code=400):
    return jsonify({"error": message}), status_code

@app.route('/')
def index():
    return "<h1>API do CRM está no ar!</h1><p>Use os endpoints como /clients para interagir.</p>"


# --- CRUD para CLIENTS ---

@app.route('/clients', methods=['POST'])
def create_client():
    """Cria um novo cliente."""
    data = request.get_json()
    if not data or not 'nome' in data:
        return error_response("'nome' é obrigatório.")
    
    try:
        response = supabase.table('clients').insert(data).execute()
        return success_response(response.data[0], 201)
    except Exception as e:
        return error_response(str(e), 500)

@app.route('/clients', methods=['GET'])
def get_all_clients():
    """Lista todos os clientes."""
    try:
        response = supabase.table('clients').select('*').order('id').execute()
        return success_response(response.data)
    except Exception as e:
        return error_response(str(e), 500)

@app.route('/clients/<int:client_id>', methods=['GET'])
def get_client_by_id(client_id):
    """Busca um cliente e todos os seus dados relacionados."""
    try:
        # Busca o cliente principal
        client_res = supabase.table('clients').select('*').eq('id', client_id).single().execute()
        if not client_res.data:
            return error_response("Cliente não encontrado", 404)
        
        client_data = client_res.data

        # Busca dados relacionados
        interactions_res = supabase.table('interactions').select('*').eq('client_id', client_id).execute()
        tasks_res = supabase.table('tasks').select('*').eq('client_id', client_id).execute()
        sales_res = supabase.table('sales').select('*').eq('client_id', client_id).execute()

        # Monta o perfil completo
        client_data['interactions'] = interactions_res.data
        client_data['tasks'] = tasks_res.data
        client_data['sales'] = sales_res.data
        
        return success_response(client_data)
    except Exception as e:
        return error_response(str(e), 500)


@app.route('/clients/<int:client_id>', methods=['PUT'])
def update_client(client_id):
    """Atualiza um cliente."""
    data = request.get_json()
    try:
        response = supabase.table('clients').update(data).eq('id', client_id).execute()
        if not response.data:
            return error_response("Cliente não encontrado", 404)
        return success_response(response.data[0])
    except Exception as e:
        return error_response(str(e), 500)

@app.route('/clients/<int:client_id>', methods=['DELETE'])
def delete_client(client_id):
    """Deleta um cliente e seus dados em cascata."""
    try:
        response = supabase.table('clients').delete().eq('id', client_id).execute()
        if not response.data:
            return error_response("Cliente não encontrado", 404)
        return success_response({"message": "Cliente deletado com sucesso"})
    except Exception as e:
        return error_response(str(e), 500)

# --- CRUD para INTERACTIONS ---

@app.route('/interactions', methods=['POST'])
def create_interaction():
    """Cria uma nova interação para um cliente."""
    data = request.get_json()
    if not data or not 'client_id' in data or not 'tipo' in data:
        return error_response("'client_id' e 'tipo' são obrigatórios.")
    
    try:
        response = supabase.table('interactions').insert(data).execute()
        return success_response(response.data[0], 201)
    except Exception as e:
        return error_response(str(e), 500)

@app.route('/interactions/<int:interaction_id>', methods=['DELETE'])
def delete_interaction(interaction_id):
    """Deleta uma interação."""
    try:
        response = supabase.table('interactions').delete().eq('id', interaction_id).execute()
        if not response.data:
            return error_response("Interação não encontrada", 404)
        return success_response({"message": "Interação deletada com sucesso"})
    except Exception as e:
        return error_response(str(e), 500)

# --- CRUD para TASKS ---

@app.route('/tasks', methods=['POST'])
def create_task():
    """Cria uma nova tarefa para um cliente."""
    data = request.get_json()
    if not data or not 'client_id' in data or not 'descricao' in data:
        return error_response("'client_id' e 'descricao' são obrigatórios.")
    
    try:
        response = supabase.table('tasks').insert(data).execute()
        return success_response(response.data[0], 201)
    except Exception as e:
        return error_response(str(e), 500)

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    """Atualiza uma tarefa (ex: marcar como concluída)."""
    data = request.get_json()
    try:
        response = supabase.table('tasks').update(data).eq('id', task_id).execute()
        if not response.data:
            return error_response("Tarefa não encontrada", 404)
        return success_response(response.data[0])
    except Exception as e:
        return error_response(str(e), 500)

# --- Ponto de entrada da aplicação ---
if __name__ == '__main__':
    app.run(debug=True, port=5000)
