import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Icon from '../AppIcon';

// The Header now accepts notification state and handlers as props
const Header = ({ onLogout, notifications, setNotifications }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userRole, setUserRole] = useState('admin');
  const [username, setUsername] = useState('Admin');

  useEffect(() => {
    // Determine user role and name from localStorage
    const savedRole = localStorage.getItem('role')?.toLowerCase() || 'admin';
    const savedUsername = localStorage.getItem('username') || 'Administrator';
    setUserRole(savedRole);
    setUsername(savedUsername);
  }, [location.pathname]);

  const navigationItems = [
    { label: 'Dashboard', path: userRole === 'admin' ? '/admin-dashboard' : '/teacher-dashboard', icon: 'LayoutDashboard', roles: ['admin', 'teacher'] },
    { label: 'Announcements', path: '/announcements', icon: 'Megaphone', roles: ['admin'] },
    { label: 'Users', path: '/users', icon: 'Users', roles: ['admin'] },
    { label: 'Classes', path: '/classes', icon: 'BookOpen', roles: ['teacher'] },
    { label: 'Attendance', path: '/attendance', icon: 'UserCheck', roles: ['admin', 'teacher'] },
    { label: 'Assignments', path: '/assignments', icon: 'FileText', roles: ['admin', 'teacher'] },
    { label: 'Reports', path: '/reports', icon: 'BarChart3', roles: ['admin'] },
    { label: 'Gradebook', path: '/gradebook', icon: 'BookMarked', roles: ['teacher'] },
    { label: 'Settings', path: '/settings', icon: 'Settings', roles: ['admin', 'teacher'] }
  ];

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-header">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-text-primary">SchoolHub</span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {filteredNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActiveRoute(item.path) ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            {/* Notification Bell */}
            <div className="relative">
                <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-all duration-200">
                    <Icon name="Bell" size={20} />
                    {notifications && notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">{notifications.length}</span>
                    )}
                </button>
                {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-surface rounded-lg shadow-modal border border-border z-dropdown">
                        <div className="p-3 border-b border-border flex justify-between items-center">
                            <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
                            {notifications && notifications.length > 0 && (
                                <button onClick={() => setNotifications([])} className="text-xs text-primary hover:underline">Mark all as read</button>
                            )}
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {notifications && notifications.length > 0 ? notifications.map((msg, index) => (
                                <div key={index} className="p-3 border-b border-border hover:bg-secondary-50"><p className="text-sm text-text-secondary">{msg}</p></div>
                            )) : <div className="p-4 text-center text-sm text-text-secondary">No new notifications</div>}
                        </div>
                    </div>
                )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-all duration-200"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <span className="hidden sm:inline text-sm font-medium text-text-primary">{username}</span>
                <Icon name="ChevronDown" size={16} />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-modal border border-border z-dropdown">
                  <div className="p-1">
                    <button
                      onClick={() => handleNavigation('/profile')}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-all duration-200"
                    >
                      <Icon name="User" size={16} />
                      <span>Profile</span>
                    </button>
                    <div className="border-t border-border my-1" />
                    <button
                      onClick={onLogout}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-error hover:bg-error-50 rounded-md transition-all duration-200"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-all duration-200"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        <div
          className={`
            lg:hidden border-t border-border bg-surface overflow-hidden
            transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <nav className="py-2 space-y-1">
            {filteredNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-3 w-full px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActiveRoute(item.path) ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
