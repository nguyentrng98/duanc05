import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const AdminLayout = () => {
  // State to manage dropdown visibility
  const [isPostDropdownOpen, setPostDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white">
          <div className="p-4 text-lg font-semibold border-b border-gray-700">
            Admin Panel
          </div>
          <nav className="mt-4">
            <ul>
              <li>
                <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-700">
                  Dashboard
                </Link>
              </li>
              {/* Post Management with Dropdown */}
              <li className="relative">
                <button
                  onClick={() => setPostDropdownOpen(!isPostDropdownOpen)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 flex justify-between items-center"
                >
                  Post Management
                  <span>{isPostDropdownOpen ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}</span>
                </button>
                {isPostDropdownOpen && (
                  <ul className="bg-gray-700">
                    <li>
                      <Link to="/admin/posts/list" className="block px-6 py-2 hover:bg-gray-600">
                        List
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/posts/edit" className="block px-6 py-2 hover:bg-gray-600">
                        Edit
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* User Management with Dropdown */}
              <li className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!isUserDropdownOpen)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 flex justify-between items-center"
                >
                  User Management
                  <span>{isUserDropdownOpen ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}</span>
                </button>
                {isUserDropdownOpen && (
                  <ul className="bg-gray-700">
                    <li>
                      <Link to="/admin/users/list" className="block px-6 py-2 hover:bg-gray-600">
                        List
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/users/edit" className="block px-6 py-2 hover:bg-gray-600">
                        Edit
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Logout Link */}
              <li>
                <Link to="/admin/logout" className="block px-4 py-2 text-red-500 hover:bg-gray-700 flex items-center">
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;