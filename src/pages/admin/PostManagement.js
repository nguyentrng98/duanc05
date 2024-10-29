import React, { useState } from 'react';

const PostManagement = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('public');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, content, status, type: 'technology' };
    
    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        alert('Post added successfully');
        setTitle('');
        setContent('');
      } else {
        alert('Failed to add post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Post Management</h1>
      
      {/* Form thêm bài viết */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <label className="block">Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Content</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 w-full">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default PostManagement;