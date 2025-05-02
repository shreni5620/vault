import React, { useState } from 'react';
import {
  LayoutDashboard, Car, Users, ClipboardList,
  BarChart2, Settings, ChevronLeft, ChevronRight,
  LogOut, HelpCircle, User, Lock, Bell, Palette, Database, ChevronDown, ChevronUp
} from 'lucide-react';
import './Sidebar.css';

function Sidebar({ currentPage, setCurrentPage, isCollapsed, toggleSidebar, activeSettingsTab, setActiveSettingsTab }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'vehicles', label: 'Vehicles', icon: <Car size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'listings', label: 'Listings', icon: <ClipboardList size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={20} />,
      subItems: [
        { id: 'profile', label: 'Profile', icon: <User size={18} /> },
        { id: 'account', label: 'Account & Security', icon: <Lock size={18} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
        { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
        { id: 'system', label: 'System', icon: <Database size={18} /> },
      ],
    },
  ];

  const handleSettingsClick = (subItemId) => {
    setCurrentPage('settings');
    setActiveSettingsTab(subItemId);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="logo-container">
          <Car size={28} className="logo-icon" />
          {!isCollapsed && <span className="logo-text">VehicleVault</span>}
        </div>
        <button
          onClick={toggleSidebar}
          className="toggle-button"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="sidebar-menu">
        <ul className="menu-list">
          {menuItems.map((item) => (
            <React.Fragment key={item.id}>
              <li
                onClick={() => {
                  if (item.id === 'settings') {
                    setIsSettingsOpen(!isSettingsOpen);
                  }
                  setCurrentPage(item.id);
                }}
                className={`menu-item ${currentPage === item.id ? 'active' : ''}`}
              >
                <div className="menu-item-content">
                  <span className="menu-icon">{item.icon}</span>
                  {!isCollapsed && (
                    <>
                      <span className="menu-label">{item.label}</span>
                      {item.subItems && (
                        <span className="submenu-icon">
                          {isSettingsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </li>
              {!isCollapsed && item.subItems && isSettingsOpen && currentPage === 'settings' && (
                <ul className="submenu-list">
                  {item.subItems.map((subItem) => (
                    <li
                      key={subItem.id}
                      onClick={() => handleSettingsClick(subItem.id)}
                      className={`submenu-item ${activeSettingsTab === subItem.id ? 'active' : ''}`}
                    >
                      <span className="submenu-icon">{subItem.icon}</span>
                      <span className="submenu-label">{subItem.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        {!isCollapsed ? (
          <div className="user-profile">
            <div className="user-avatar">AD</div>
            <div className="user-info">
              <p className="user-name">Admin User</p>
              <p className="user-role">Administrator</p>
            </div>
          </div>
        ) : (
          <div className="user-avatar collapsed">AD</div>
        )}

        <div className="footer-buttons">
          <button className="footer-button">
            <HelpCircle size={20} />
            {!isCollapsed && <span className="button-text">Help</span>}
          </button>
          <button className="footer-button">
            <LogOut size={20} />
            {!isCollapsed && <span className="button-text">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
