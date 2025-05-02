import React from 'react';
import { User, Lock, Bell, Palette, Database, Save } from 'lucide-react';
import './Settings.css';

function Settings({ activeTab, setActiveTab }) {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <h2 className="heading">Profile Settings</h2>
            <p className="subtext">Manage your personal information and preferences.</p>

            <div className="form-group">
              <div className="profile-pic">
                <div className="initials">AD</div>
                <button className="change-photo-btn">Change Photo</button>
              </div>

              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input className="input-field" defaultValue="Admin User" />
              </div>

              <div className="input-group">
                <div className="input-half">
                  <label className="input-label">Email Address</label>
                  <input className="input-field" defaultValue="admin@vehiclevault.com" />
                </div>
                <div className="input-half">
                  <label className="input-label">Phone Number</label>
                  <input className="input-field" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Role</label>
                <select className="input-field" defaultValue="admin">
                  <option value="admin">Administrator</option>
                  <option value="manager">Manager</option>
                  <option value="editor">Editor</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Biography</label>
                <textarea className="input-field" rows={4} placeholder="Tell us about yourself" />
              </div>

              <div className="button-group">
                <button className="reset-btn">Reset</button>
                <button className="save-btn">
                  <Save size={18} />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'account':
        return (
          <div>
            <h2 className="heading">Account & Security Settings</h2>
            <p className="subtext">Manage your account security and authentication preferences.</p>
            <div className="coming-soon">Coming soon...</div>
          </div>
        );

      case 'notifications':
        return (
          <div>
            <h2 className="heading">Notification Settings</h2>
            <p className="subtext">Configure how you receive notifications.</p>
            <div className="coming-soon">Coming soon...</div>
          </div>
        );

      case 'appearance':
        return (
          <div>
            <h2 className="heading">Appearance Settings</h2>
            <p className="subtext">Customize the look and feel of your dashboard.</p>
            <div className="coming-soon">Coming soon...</div>
          </div>
        );

      case 'system':
        return (
          <div>
            <h2 className="heading">System Settings</h2>
            <p className="subtext">Configure system-wide preferences and options.</p>
            <div className="coming-soon">Coming soon...</div>
          </div>
        );

      default:
        return <div className="coming-soon">Coming soon...</div>;
    }
  };

  return (
    <div className="settings-container">
      <div className="header">
        <h1 className="title">Settings</h1>
        <nav className="breadcrumb">
          <span>Home</span> / <span className="active">Settings</span>
        </nav>
      </div>
      <div className="settings-content">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default Settings;
