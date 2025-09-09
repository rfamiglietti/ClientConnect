# 🚀 ClientConnect — CRM Simplificado para Pequenas Empresas

![Versão do App](https://img.shields.io/badge/Versão-1.0.0-blue)
![Tecnologias](https://img.shields.io/badge/React%20%7C%20Supabase%20%7C%20Tailwind-green)
![Status](https://img.shields.io/badge/Status-Concluído-success)

## 📝 Visão Geral do Projeto

O **ClientConnect** é um sistema de CRM leve e intuitivo, projetado para ajudar pequenas empresas e freelancers a gerenciar seus leads e clientes de forma eficiente. Ele oferece funcionalidades essenciais como:

* **Autenticação de Usuários:** Cadastro e login seguros.
* **Gestão de Clientes:** CRUD completo (Criar, Ler, Atualizar, Deletar) de clientes e leads.
* **Registro de Interações:** Linha do tempo de chamadas, emails e reuniões.
* **Gerenciamento de Tarefas:** Crie e gerencie tarefas de acompanhamento.
* **Anexos:** Faça upload de documentos e arquivos importantes para cada cliente.

## 📦 Tecnologias Utilizadas

* **Frontend:** [React](https://reactjs.org/) (com [Vite](https://vitejs.dev/))
* **Backend:** [Supabase](https://supabase.com/) (como BaaS - Backend-as-a-Service)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Roteamento:** [React Router DOM](https://reactrouter.com/)
* **Testes:** [Vitest](https://vitest.dev/) (Unitários), [Playwright](https://playwright.dev/) (E2E)

## 🛠️ Como Rodar Localmente

Siga estes passos para configurar e rodar o projeto na sua máquina.

### 1. Pré-requisitos

* Node.js (versão 18 ou superior)
* npm (já vem com o Node.js)
* Git
* Uma conta e um projeto no [Supabase](https://supabase.com/).

### 2. Configuração do Projeto

1.  Clone o repositório:
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd clientconnect/web
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Configure as variáveis de ambiente:
    * Crie um arquivo chamado `.env.local` na pasta `web/`.
    * Copie o conteúdo do `.env.example` para ele e preencha com as chaves do seu projeto Supabase.

    ```text
    VITE_SUPABASE_URL="https://SEU_PROJECT_REF.supabase.co"
    VITE_SUPABASE_ANON_KEY="SEU_ANON_KEY"
    ```

### 3. Configuração do Supabase

1.  **Crie as tabelas e políticas RLS:**
    * No painel do seu projeto Supabase, vá em **SQL Editor**.
    * Cole o conteúdo do arquivo `clientconnect_schema_migration.sql` (disponível na raiz do repositório) e clique em "Run". Isso criará todas as tabelas, políticas de segurança e triggers.

2.  **Crie o bucket de Storage:**
    * Vá para a seção **Storage** e crie um novo bucket chamado `attachments`. Deixe-o **privado**.

### 4. Executando a Aplicação

1.  Na pasta `web/`, inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

2.  Abra seu navegador e acesse a URL que aparecerá no terminal (geralmente `http://localhost:5173`).

## ✅ Como Rodar os Testes

* **Testes Unitários (Vitest):**
    ```bash
    npm test
    ```
* **Testes E2E (Playwright):**
    ```bash
    npx playwright install
    npx playwright test
    ```

## 🚀 Deploy

O deploy é simples, usando a integração do Vercel com o GitHub.

1.  Conecte sua conta Vercel ao seu repositório GitHub.
2.  Importe o projeto. A Vercel vai detectar que é um app Vite e configurar a build automaticamente.
3.  Adicione as variáveis de ambiente (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) nas configurações de "Environment Variables" do seu projeto na Vercel.

O deploy será feito automaticamente em cada `git push` para a branch principal (`main`).

## ✍️ Próximos Passos

* [ ] Adicionar relatórios simples (dashboard).
* [ ] Implementar paginação e filtros avançados na listagem de clientes.
* [ ] Adicionar notificações em tempo real usando o Supabase Realtime.
* [ ] Configurar as GitHub Actions para CI/CD.

---