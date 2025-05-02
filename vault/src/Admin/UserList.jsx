import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css';

function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await axios.get('http://localhost:3000/user');
    setUsers(res.data.users || []);
    setLoading(false);
  };

  const handleBlock = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    await axios.patch(`http://localhost:3000/user/${id}/block`, { status: newStatus });
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`http://localhost:3000/user/${id}`);
      fetchUsers();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-users-container">
      <h2>All Users</h2>
      <table className="admin-users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.firstName} {u.lastName}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
              <td>{u.contactNum}</td>
              <td>
                <button onClick={() => handleBlock(u._id, u.status)}>
                  {u.status === "active" ? "Block" : "Unblock"}
                </button>
                <button onClick={() => handleDelete(u._id)} style={{ marginLeft: 8, color: "red" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUserList;
