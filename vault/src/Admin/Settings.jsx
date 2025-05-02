import React, { useRef, useState } from 'react';
import { User, Lock, Bell, Palette, Database, Save } from 'lucide-react';
import './Settings.css';

function Settings({ activeTab, setActiveTab }) {
  const [profilePic, setProfilePic] = useState(null);
  const fileInputRef = useRef(null);

  // Use state for editable fields
  const [adminName, setAdminName] = useState(localStorage.getItem('adminName') || "Admin User");
  const [adminEmail, setAdminEmail] = useState(localStorage.getItem('adminEmail') || "admin@vehiclevault.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [role, setRole] = useState("admin");
  const [bio, setBio] = useState("");

  // For reset: store initial values
  const initialProfile = {
    adminName: localStorage.getItem('adminName') || "Admin User",
    adminEmail: localStorage.getItem('adminEmail') || "admin@vehiclevault.com",
    phone: "+1 (555) 123-4567",
    role: "admin",
    bio: ""
  };

  const handleReset = () => {
    setAdminName(initialProfile.adminName);
    setAdminEmail(initialProfile.adminEmail);
    setPhone(initialProfile.phone);
    setRole(initialProfile.role);
    setBio(initialProfile.bio);
    setProfilePic(null);
  };

  const handleSave = () => {
    // You can also send these values to your backend here!
    localStorage.setItem('adminName', adminName);
    localStorage.setItem('adminEmail', adminEmail);
    alert('Profile saved!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <h2 className="heading">Profile Settings</h2>
            <p className="subtext">Manage your personal information and preferences.</p>

            <div className="form-group">
              <div className="profile-pic">
                <div className="initials">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover" }}
                    />
                  ) : (
                    "AD"
                  )}
                </div>
                <button
                  className="change-photo-btn"
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                >
                  Change Photo
                </button>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => setProfilePic(ev.target.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input
                  className="input-field"
                  value={adminName}
                  onChange={e => setAdminName(e.target.value)}
                />
              </div>

              <div className="input-group">
                <div className="input-half">
                  <label className="input-label">Email Address</label>
                  <input
                    className="input-field"
                    value={adminEmail}
                    onChange={e => setAdminEmail(e.target.value)}
                  />
                </div>
                <div className="input-half">
                  <label className="input-label">Phone Number</label>
                  <input
                    className="input-field"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Role</label>
                <select
                  className="input-field"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                >
                  <option value="admin">Administrator</option>
                  <option value="manager">Manager</option>
                  <option value="editor">Editor</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Biography</label>
                <textarea
                  className="input-field"
                  rows={4}
                  placeholder="Tell us about yourself"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                />
              </div>

              <div className="button-group">
                <button className="reset-btn" type="button" onClick={handleReset}>Reset</button>
                <button className="save-btn" type="button" onClick={handleSave}>
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
