import React from 'react';
import {
  LayoutDashboard, Car, Users, ClipboardList,
  BarChart2, Settings, ChevronLeft, ChevronRight,
  LogOut, HelpCircle
} from 'lucide-react';

function Sidebar({ currentPage, setCurrentPage, isCollapsed, toggleSidebar }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'vehicles', label: 'Vehicles', icon: <Car size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'listings', label: 'Listings', icon: <ClipboardList size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside
      className={`bg-gray-900 text-white h-screen flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Car size={28} className="text-blue-500" />
          {!isCollapsed && <span className="text-lg font-semibold">VehicleVault</span>}
        </div>
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto mt-4 px-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition ${
                currentPage === item.id
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-700 text-gray-300'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        {!isCollapsed ? (
          <div className="flex items-center mb-4 space-x-3">
            <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white">
              AD
            </div>
            <div>
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        ) : (
          <div className="mb-4 bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white">
            AD
          </div>
        )}

        <div className="space-y-2">
          <button className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-gray-700 rounded-md text-gray-300">
            <HelpCircle size={20} />
            {!isCollapsed && <span className="text-sm">Help</span>}
          </button>
          <button className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-gray-700 rounded-md text-gray-300">
            <LogOut size={20} />
            {!isCollapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
