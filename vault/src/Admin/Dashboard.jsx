import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DashboardHome from './DashboardHome';
import VehiclesList from './VehiclesList';
import UsersList from './UserList';
import ListingsManagement from './ListingsManagement';
import Analytics from './Analytics';
import Settings from './Settings';
import NotificationManager from './NotificationManager';
import './Dashboard.css';

function Dashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSettingsTabChange = (tabId) => {
    setActiveSettingsTab(tabId);
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
      case 'notifications':
        return <NotificationManager />;
      case 'settings':
        return <Settings activeTab={activeSettingsTab} setActiveTab={handleSettingsTabChange} />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="dashboard-root">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isCollapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
        activeSettingsTab={activeSettingsTab}
        setActiveSettingsTab={handleSettingsTabChange}
      />
      <div className={`dashboard-main${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
        <Navbar currentPage={currentPage} toggleSidebar={toggleSidebar} />
        <main className="dashboard-content">{renderPage()}</main>
      </div>
    </div>
  );
}

export default Dashboard;
