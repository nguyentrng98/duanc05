import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded">
          <h2 className="text-lg">Total Posts</h2>
          <p className="text-2xl">50</p> {/* Lấy từ API */}
        </div>
        <div className="bg-green-500 text-white p-4 rounded">
          <h2 className="text-lg">Total Users</h2>
          <p className="text-2xl">10</p> {/* Lấy từ API */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;