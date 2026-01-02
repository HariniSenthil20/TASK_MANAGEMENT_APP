import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = ({ onNavClick, activeTab }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNavClick = (tabId) => {
    if (onNavClick) {
      onNavClick(tabId);
    }
    if (location.pathname !== '/dashboard' && location.pathname !== '/tasks/new' && !location.pathname.startsWith('/tasks/edit')) {
      navigate('/dashboard');
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (tabId) => activeTab === tabId;

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          {!isCollapsed && <span className="logo-icon">📋</span>}
          {!isCollapsed && <span className="logo-text">Projects</span>}
        </div>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isCollapsed ? '☰' : '✕'}
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className={`nav-item ${isActive('dashboard') ? 'active' : ''}`} onClick={() => handleNavClick('dashboard')} title="Home">
            <span className="nav-icon">🏠</span>
            {!isCollapsed && <span>Home</span>}
          </div>
          <div className={`nav-item ${isActive('feed') ? 'active' : ''}`} onClick={() => handleNavClick('feed')} title="Feed">
            <span className="nav-icon">📰</span>
            {!isCollapsed && <span>Feed</span>}
          </div>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          {!isCollapsed && (
            <div className="user-details">
              <div className="user-name">{user?.name}</div>
              <div className="user-email">{user?.email}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

