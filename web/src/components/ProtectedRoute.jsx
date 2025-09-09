// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se não houver usuário, redireciona para a página de login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Se o usuário estiver logado, renderiza o componente filho
  return <Outlet />;
}