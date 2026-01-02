import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const Header = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'tasks', label: 'Tasks' },
    
  ];

  return (
    <div className="header">
      <div className="header-top">
        <div className="header-left">
          <h1 className="project-name">My Tasks</h1>
          
        </div>
        <div className="header-right">
          
          <div className="user-menu" ref={userMenuRef}>
            <div 
              className="user-avatar-small" 
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-dropdown-header">
                  <div className="user-dropdown-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
                  <div>
                    <div className="user-dropdown-name">{user?.name}</div>
                    <div className="user-dropdown-email">{user?.email}</div>
                  </div>
                </div>
                <div className="user-dropdown-divider"></div>
                <div className="user-dropdown-item" onClick={() => { setShowUserMenu(false); }}>
                  Profile Settings
                </div>
                <div className="user-dropdown-item" onClick={() => { setShowUserMenu(false); }}>
                  Preferences
                </div>
                <div className="user-dropdown-item" onClick={() => { setShowUserMenu(false); }}>
                  Help & Support
                </div>
                <div className="user-dropdown-divider"></div>
                <div className="user-dropdown-item logout" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="header-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;

