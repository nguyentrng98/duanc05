import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import PostManagement from './pages/admin/PostManagement';
import UserManagement from './pages/admin/UserManagement';
import { Login } from './pages/client/Login';
import { Register } from './pages/client/Register';
import Sidebar from './components/partial/Sidebar';
import { Home } from './pages/client/Home';
import { useContext } from "react";
import { InfoContext } from "./components/context/InfoContext";
import { Main } from './pages/client/Main';
import { Create } from './pages/client/Create';
import { Post } from './pages/client/Post';
import { EditPost } from './pages/client/EditPost';
import { Profile } from './pages/client/Profile';
import { EditProfile } from './pages/client/EditProfile';

function App() {
  const { user } = useContext(InfoContext);
  console.log("app.user", user);

  return (
    <Routes>
      {
        user ? (
          <>
            {/* Client Routes */}
            <Route path="/" element={<Main />} >
              <Route path="home" element={<Home />} />
              <Route path="create" element={<Create />} />
              <Route path="posts" element={<Post />} />
              <Route path="edit/:postId" element={<EditPost />} />
              <Route path="profile" element={<Profile />} />
              <Route path="editProfile" element={<EditProfile />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="posts" element={<PostManagement />} />
              <Route path="users" element={<UserManagement />} />
            </Route>
          </>
        ) : (
          <>
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )
      }
      <Route path="/sidebar" element={<Sidebar />} />
    </Routes>
  );
}

export default App;