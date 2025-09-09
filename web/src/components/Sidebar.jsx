// src/components/Sidebar.jsx
import { Link, NavLink } from 'react-router-dom';

function Sidebar() {
  const activeLinkClass = "flex items-center p-2 text-white bg-blue-700 rounded-lg";
  const inactiveLinkClass = "flex items-center p-2 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700";

  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
              <span className="ml-3">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/clients" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
              <span className="ml-3">Clientes</span>
            </NavLink>
          </li>
          {/* Adicione outros links aqui */}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;