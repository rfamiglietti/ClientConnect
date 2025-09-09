// src/components/Header.jsx
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

function Header() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            ClientConnect
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Sair
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;