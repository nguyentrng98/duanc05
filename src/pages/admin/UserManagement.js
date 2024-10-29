import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Lấy danh sách người dùng
    axios.get('http://localhost:3000/users', {
      headers: { Authorization: 'Bearer your-token-here' }
    })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Username</th>
            <th className="py-2">Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.username}>
              <td className="py-2">{user.username}</td>
              <td className="py-2">{user.dob}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;