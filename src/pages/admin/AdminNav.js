import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/admin/dashboard" className="text-white">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/posts" className="text-white">Manage Posts</Link>
        </li>
        <li>
          <Link to="/admin/users" className="text-white">Manage Users</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;