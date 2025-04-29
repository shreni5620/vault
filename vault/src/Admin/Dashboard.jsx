import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DashboardHome from './DashboardHome';
import VehiclesList from './VehiclesList';
import UsersList from './UserList';
import ListingsManagement from './ListingsManagement';
import Analytics from './Analytics';
import Settings from './Settings';

function Dashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'vehicles':
        return <VehiclesList />;
      case 'users':
        return <UsersList />;
      case 'listings':
        return <ListingsManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } bg-white shadow-md`}
      >
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isCollapsed={sidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <Navbar currentPage={currentPage} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 overflow-y-auto">{renderPage()}</main>
      </div>
    </div>
  );
}

export default Dashboard;
