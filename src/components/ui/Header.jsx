import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('admin');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Determine user role based on current path
    if (location.pathname.includes('teacher')) {
      setUserRole('teacher');
    } else if (location.pathname.includes('admin')) {
      setUserRole('admin');
    }
  }, [location.pathname]);

  const navigationItems = [
    {
      label: currentLanguage === 'en' ? 'Dashboard' : 'لوحة التحكم',
      path: userRole === 'admin' ? '/admin-dashboard' : '/teacher-dashboard',
      icon: 'LayoutDashboard',
      roles: ['admin', 'teacher']
    },
    {
      label: currentLanguage === 'en' ? 'Users' : 'المستخدمون',
      path: '/users',
      icon: 'Users',
      roles: ['admin']
    },
    {
      label: currentLanguage === 'en' ? 'Classes' : 'الفصول',
      path: '/classes',
      icon: 'BookOpen',
      roles: ['teacher']
    },
    {
      label: currentLanguage === 'en' ? 'Attendance' : 'الحضور',
      path: '/attendance',
      icon: 'UserCheck',
      roles: ['admin', 'teacher']
    },
    {
      label: currentLanguage === 'en' ? 'Assignments' : 'الواجبات',
      path: '/assignments',
      icon: 'FileText',
      roles: ['admin', 'teacher']
    },
    {
      label: currentLanguage === 'en' ? 'Reports' : 'التقارير',
      path: '/reports',
      icon: 'BarChart3',
      roles: ['admin']
    },
    {
      label: currentLanguage === 'en' ? 'Gradebook' : 'سجل الدرجات',
      path: '/gradebook',
      icon: 'BookMarked',
      roles: ['teacher']
    },
    {
      label: currentLanguage === 'en' ? 'Settings' : 'الإعدادات',
      path: '/settings',
      icon: 'Settings',
      roles: ['admin', 'teacher']
    }
  ];

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  const notifications = [
    {
      id: 1,
      title: currentLanguage === 'en' ? 'New Assignment Submitted' : 'تم تسليم واجب جديد',
      message: currentLanguage === 'en' ? 'John Doe submitted Math Assignment #3' : 'قام جون دو بتسليم واجب الرياضيات رقم 3',
      time: '5 min ago',
      unread: true
    },
    {
      id: 2,
      title: currentLanguage === 'en' ? 'Attendance Alert' : 'تنبيه الحضور',
      message: currentLanguage === 'en' ? '3 students marked absent today' : 'تم تسجيل غياب 3 طلاب اليوم',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      title: currentLanguage === 'en' ? 'System Update' : 'تحديث النظام',
      message: currentLanguage === 'en' ? 'SchoolHub will be updated tonight at 11 PM' : 'سيتم تحديث SchoolHub الليلة في الساعة 11 مساءً',
      time: '2 hours ago',
      unread: false
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    setShowUserMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-header">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-text-primary">
                SchoolHub
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {filteredNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth hover-scale ${
                  isActiveRoute(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth"
              >
                <Icon name="Bell" size={20} />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-surface rounded-lg shadow-modal border border-border z-dropdown">
                  <div className="p-4 border-b border-border">
                    <h3 className="text-sm font-semibold text-text-primary">
                      {currentLanguage === 'en' ? 'Notifications' : 'الإشعارات'}
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-border hover:bg-secondary-50 transition-smooth ${
                          notification.unread ? 'bg-primary-50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.unread ? 'bg-primary' : 'bg-secondary-200'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-text-primary">
                              {notification.title}
                            </p>
                            <p className="text-xs text-text-secondary mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-text-secondary mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <Button
                      variant="ghost"
                      onClick={() => setShowNotifications(false)}
                      className="w-full text-sm"
                    >
                      {currentLanguage === 'en' ? 'View All' : 'عرض الكل'}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <Icon name="ChevronDown" size={16} />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-modal border border-border z-dropdown">
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium text-text-primary">
                      {userRole === 'admin' ? 'Administrator' : 'Teacher'}
                    </p>
                    <p className="text-xs text-text-secondary">
                      admin@schoolhub.com
                    </p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={() => handleNavigation('/profile')}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-smooth"
                    >
                      <Icon name="User" size={16} />
                      <span>{currentLanguage === 'en' ? 'Profile' : 'الملف الشخصي'}</span>
                    </button>
                    <div className="border-t border-border my-1" />
                    <button
                      onClick={() => handleLanguageChange(currentLanguage === 'en' ? 'ar' : 'en')}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-smooth"
                    >
                      <Icon name="Globe" size={16} />
                      <span>{currentLanguage === 'en' ? 'العربية' : 'English'}</span>
                    </button>
                    <div className="border-t border-border my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-error hover:bg-error-50 rounded-md transition-smooth"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>{currentLanguage === 'en' ? 'Logout' : 'تسجيل الخروج'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-surface">
            <nav className="py-4 space-y-1">
              {filteredNavItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 text-sm font-medium transition-smooth ${
                    isActiveRoute(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;