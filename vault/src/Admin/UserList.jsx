import React from 'react';
import { Search, MoreVertical, Edit, Trash2, UserCheck, Plus } from 'lucide-react';

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
    <div className="space-y-8 px-4 md:px-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <div className="text-sm text-gray-500">
          <a href="#">Home</a>
          <span className="mx-2">/</span>
          <span>Users</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-lg">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="bg-transparent outline-none"
            />
          </div>
          <div className="flex space-x-2">
            <select className="bg-gray-200 p-2 rounded-lg">
              <option value="">All Roles</option>
              <option value="customer">Customer</option>
              <option value="dealer">Dealer</option>
              <option value="admin">Admin</option>
            </select>
            <select className="bg-gray-200 p-2 rounded-lg">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <button className="bg-blue-600 text-white p-2 rounded-lg flex items-center space-x-2">
          <Plus size={18} />
          <span>Add User</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 text-white p-4 rounded-lg flex items-center space-x-4">
          <UserCheck size={20} />
          <div>
            <h4 className="text-xl font-semibold">15,230</h4>
            <p className="text-sm">Total Users</p>
          </div>
        </div>
        <div className="bg-gray-800 text-white p-4 rounded-lg flex items-center space-x-4">
          <UserCheck size={20} />
          <div>
            <h4 className="text-xl font-semibold">14,325</h4>
            <p className="text-sm">Active Users</p>
          </div>
        </div>
        <div className="bg-gray-800 text-white p-4 rounded-lg flex items-center space-x-4">
          <UserCheck size={20} />
          <div>
            <h4 className="text-xl font-semibold">1,582</h4>
            <p className="text-sm">Dealers</p>
          </div>
        </div>
        <div className="bg-gray-800 text-white p-4 rounded-lg flex items-center space-x-4">
          <UserCheck size={20} />
          <div>
            <h4 className="text-xl font-semibold">483</h4>
            <p className="text-sm">New This Month</p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">User ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Registered</th>
              <th className="px-4 py-2 text-left">Last Active</th>
              <th className="px-4 py-2 text-left">Listings</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'Customer' ? 'bg-green-100 text-green-800' : user.role === 'Dealer' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2">{user.registrationDate}</td>
                <td className="px-4 py-2">{user.lastLogin}</td>
                <td className="px-4 py-2">{user.listings}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
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
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">Showing 1-5 of 15,230 users</span>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600" disabled>Previous</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600">2</button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600">3</button>
          <span className="text-gray-500">...</span>
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600">3048</button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600">Next</button>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
