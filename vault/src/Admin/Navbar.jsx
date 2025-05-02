import React, { useState } from 'react';
import {
  Bell, Search, Menu, X, Sun, Moon,
  MessageSquare, User, Car
} from 'lucide-react';

function Navbar({ currentPage, toggleSidebar }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);

  const formatPageTitle = (page) =>
    page.charAt(0).toUpperCase() + page.slice(1);

  const notifications = [
    {
      id: 1,
      title: 'New vehicle listing',
      message: 'A new BMW X5 has been listed for approval',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: 2,
      title: 'User reported issue',
      message: 'User John reported an issue with vehicle ID #12345',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      title: 'System update',
      message: 'System maintenance scheduled for tonight at 2:00 AM',
      time: '3 hours ago',
      read: true,
    },
  ];

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-gray-600 dark:text-gray-300">
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          {formatPageTitle(currentPage)}
        </h1>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="flex items-center w-full max-w-md mx-6 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
          <Search size={18} className="text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search vehicles, users, listings..."
            className="flex-1 bg-transparent px-2 py-1 text-sm text-gray-800 dark:text-gray-200 outline-none"
            autoFocus
          />
          <button onClick={toggleSearch} className="text-gray-500 dark:text-gray-400">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Right */}
      <div className="flex items-center gap-4">
        {!searchOpen && (
          <button
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
            onClick={toggleSearch}
          >
            <Search size={20} />
          </button>
        )}

        <button
          className="text-gray-600 dark:text-gray-300 hover:text-yellow-500"
          onClick={toggleDarkMode}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="relative text-gray-600 dark:text-gray-300 hover:text-red-500"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              2
            </span>
          </button>
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50">
              <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                <button className="text-sm text-blue-500 hover:underline">Mark all as read</button>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 border-b dark:border-gray-700 ${
                      !n.read ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                  >
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-700 rounded-full flex items-center justify-center">
                      {n.title.includes('vehicle') ? (
                        <Car size={16} className="text-blue-600 dark:text-white" />
                      ) : n.title.includes('User') ? (
                        <User size={16} className="text-blue-600 dark:text-white" />
                      ) : (
                        <MessageSquare size={16} className="text-blue-600 dark:text-white" />
                      )}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-200">
                      <p className="font-medium">{n.title}</p>
                      <p className="text-xs">{n.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
                <button className="text-sm text-blue-500 hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
          AD
        </div>
      </div>
    </header>
  );
}

export default Navbar;
