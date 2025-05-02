import React from 'react';
import { Search, MoreVertical, Edit, Trash2, UserCheck, Plus } from 'lucide-react';
import './UserList.css';

function UsersList() {
  // Mock user data
  const users = [
    {
      id: 'USR-1001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'Customer',
      status: 'active',
      registrationDate: 'Jan 15, 2025',
      lastLogin: '2 hours ago',
      listings: 3
    },
    {
      id: 'USR-1002',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      role: 'Dealer',
      status: 'active',
      registrationDate: 'Feb 23, 2025',
      lastLogin: '1 day ago',
      listings: 12
    },
    {
      id: 'USR-1003',
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      role: 'Customer',
      status: 'inactive',
      registrationDate: 'Mar 12, 2025',
      lastLogin: '1 month ago',
      listings: 0
    },
    {
      id: 'USR-1004',
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      role: 'Dealer',
      status: 'active',
      registrationDate: 'Apr 5, 2025',
      lastLogin: '5 hours ago',
      listings: 8
    },
    {
      id: 'USR-1005',
      name: 'David Wilson',
      email: 'david.w@example.com',
      role: 'Admin',
      status: 'active',
      registrationDate: 'Dec 8, 2024',
      lastLogin: 'Just now',
      listings: 0
    }
  ];

  return (
    <div className="user-list-container">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
        <div className="breadcrumb">
          <a href="#">Home</a>
          <span className="breadcrumb-separator">/</span>
          <span>Users</span>
        </div>
      </div>

      {/* Actions */}
      <div className="actions-container">
        <div className="filters-container">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="search-input"
            />
          </div>
          <div className="filter-selectors">
            <select className="filter-select">
              <option value="">All Roles</option>
              <option value="customer">Customer</option>
              <option value="dealer">Dealer</option>
              <option value="admin">Admin</option>
            </select>
            <select className="filter-select">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <button className="add-user-button">
          <Plus size={18} />
          <span>Add User</span>
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <UserCheck size={20} />
          <div>
            <h4 className="stat-value">15,230</h4>
            <p className="stat-label">Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <UserCheck size={20} />
          <div>
            <h4 className="stat-value">14,325</h4>
            <p className="stat-label">Active Users</p>
          </div>
        </div>
        <div className="stat-card">
          <UserCheck size={20} />
          <div>
            <h4 className="stat-value">1,582</h4>
            <p className="stat-label">Dealers</p>
          </div>
        </div>
        <div className="stat-card">
          <UserCheck size={20} />
          <div>
            <h4 className="stat-value">483</h4>
            <p className="stat-label">New This Month</p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Registered</th>
              <th>Last Active</th>
              <th>Listings</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.registrationDate}</td>
                <td>{user.lastLogin}</td>
                <td>{user.listings}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-button edit">
                      <Edit size={16} />
                    </button>
                    <button className="action-button delete">
                      <Trash2 size={16} />
                    </button>
                    <button className="action-button more">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <span className="pagination-info">Showing 1-5 of 15,230 users</span>
        <div className="pagination-buttons">
          <button className="pagination-button" disabled>Previous</button>
          <button className="pagination-button active">1</button>
          <button className="pagination-button">2</button>
          <button className="pagination-button">3</button>
          <span className="pagination-ellipsis">...</span>
          <button className="pagination-button">3048</button>
          <button className="pagination-button">Next</button>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
