// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; // Certifique-se da extensão .jsx
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ClientsList from './pages/Clients/ClientsList.jsx';
import ClientDetail from './pages/Clients/ClientsDe.jsx';
import ClientForm from './components/ClientForm.jsx';
import MainLayout from './components/MainLayout.jsx'; // Importe o novo layout
import { useAuth } from './hooks/useAuth.js';
import Dashboard from './pages/Dashboard.jsx'; // Importe o Dashboard

function App() {
  const { loading } = useAuth(); 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">Conectando ao universo Supabase...</p>
      </div>
    );
  }

    return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} /> {/* Rota principal para o Dashboard */}
          <Route path="clients" element={<ClientsList />} /> {/* Rota separada para a lista de clientes */}
          <Route path="clients/new" element={<ClientForm />} />
          <Route path="clients/edit/:id" element={<ClientForm isEditing={true} />} />
          <Route path="clients/:id" element={<ClientDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;