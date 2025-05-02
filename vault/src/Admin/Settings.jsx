import React, { useState } from 'react';
import {
  User, Lock, Bell, Palette, Database, Save
} from 'lucide-react';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { key: 'profile', label: 'Profile', icon: <User size={18} /> },
    { key: 'account', label: 'Account & Security', icon: <Lock size={18} /> },
    { key: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { key: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { key: 'system', label: 'System', icon: <Database size={18} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">Profile Settings</h2>
            <p className="text-gray-500 mb-6">Manage your personal information and preferences.</p>

            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 text-white flex items-center justify-center rounded-full text-lg font-semibold">AD</div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Change Photo
                </button>
              </div>

              <div>
                <label className="block font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input
                  className="w-full mt-1 border rounded px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  defaultValue="Admin User"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <input
                    className="w-full mt-1 border rounded px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    defaultValue="admin@vehiclevault.com"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                  <input
                    className="w-full mt-1 border rounded px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    defaultValue="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 dark:text-gray-300">Role</label>
                <select
                  className="w-full mt-1 border rounded px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  defaultValue="admin"
                >
                  <option value="admin">Administrator</option>
                  <option value="manager">Manager</option>
                  <option value="editor">Editor</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 dark:text-gray-300">Biography</label>
                <textarea
                  className="w-full mt-1 border rounded px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  rows={4}
                  placeholder="Tell us about yourself"
                />
              </div>

              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300">
                  Reset
                </button>
                <button className="px-4 py-2 bg-green-600 text-white flex items-center space-x-2 rounded-md hover:bg-green-700 transition">
                  <Save size={18} />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <p className="text-gray-500">Coming soon...</p>;
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
        <nav className="text-gray-500 text-sm mt-1">
          <span>Home</span> / <span className="text-black dark:text-white">Settings</span>
        </nav>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <ul className="space-y-2">
            {tabs.map(tab => (
              <li
                key={tab.key}
                className={`flex items-center px-4 py-2 rounded cursor-pointer transition ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                <div className="mr-2">{tab.icon}</div>
                <span>{tab.label}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-6 rounded-lg shadow">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}

export default Settings;
