import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const navigate = useNavigate();

  const handleUserClick = (username) => {
    navigate('/report', { state: { username } });
  };

  return (
    <div className="container admin-container">
      <h1 className="admin-heading">Default Users List</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} onClick={() => handleUserClick(user.username)} style={{ cursor: 'pointer' }}>
              <td>{user.email}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
