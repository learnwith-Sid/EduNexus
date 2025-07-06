import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import QuickActionsPanel from './components/QuickActionsPanel';
import ActivityFeed from './components/ActivityFeed';
import AttendanceAlerts from './components/AttendanceAlerts';
import EventsCalendar from './components/EventsCalendar';
import SystemStatus from './components/SystemStatus';
import PerformanceChart from './components/PerformanceChart';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  const keyMetrics = [
    {
      title: currentLanguage === 'en' ? 'Total Students' : 'إجمالي الطلاب',
      value: '1,384',
      change: '+12 this month',
      changeType: 'increase',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: currentLanguage === 'en' ? 'Active Teachers' : 'المعلمون النشطون',
      value: '53',
      change: '+2 this month',
      changeType: 'increase',
      icon: 'UserCheck',
      color: 'success'
    },
    {
      title: currentLanguage === 'en' ? 'Attendance Rate' : 'معدل الحضور',
      value: '92.5%',
      change: '-1.2% from last week',
      changeType: 'decrease',
      icon: 'TrendingUp',
      color: 'warning'
    },
    {
      title: currentLanguage === 'en' ? 'Pending Assignments' : 'الواجبات المعلقة',
      value: '247',
      change: '+15 today',
      changeType: 'increase',
      icon: 'FileText',
      color: 'error'
    }
  ];

  const handleNavigateToTeacherDashboard = () => {
    navigate('/teacher-dashboard');
  };

  const formatCurrentTime = () => {
    return currentTime.toLocaleString(currentLanguage === 'en' ? 'en-US' : 'ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-text-primary mb-2">
                  {currentLanguage === 'en' ? 'Welcome back, Administrator' : 'مرحباً بعودتك، المدير'}
                </h1>
                <p className="text-text-secondary">
                  {formatCurrentTime()}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleNavigateToTeacherDashboard}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  {currentLanguage === 'en' ? 'Switch to Teacher View' : 'التبديل إلى عرض المعلم'}
                </Button>
                <Button
                  variant="primary"
                  onClick={() => console.log('Generate report')}
                  iconName="FileText"
                  iconPosition="left"
                >
                  {currentLanguage === 'en' ? 'Generate Report' : 'إنشاء تقرير'}
                </Button>
              </div>
            </div>
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {keyMetrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                color={metric.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Left Column - Quick Actions */}
            <div className="lg:col-span-3">
              <QuickActionsPanel currentLanguage={currentLanguage} />
            </div>

            {/* Center Column - Activity Feed and Alerts */}
            <div className="lg:col-span-6 space-y-6">
              <ActivityFeed currentLanguage={currentLanguage} />
              <AttendanceAlerts currentLanguage={currentLanguage} />
            </div>

            {/* Right Column - Calendar and System Status */}
            <div className="lg:col-span-3 space-y-6">
              <EventsCalendar currentLanguage={currentLanguage} />
              <SystemStatus currentLanguage={currentLanguage} />
            </div>
          </div>

          {/* Analytics Chart */}
          <div className="mb-8">
            <PerformanceChart currentLanguage={currentLanguage} />
          </div>

          {/* Additional Actions */}
          <div className="bg-surface rounded-lg p-6 shadow-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                {currentLanguage === 'en' ? 'Administrative Tools' : 'أدوات الإدارة'}
              </h3>
              <Icon name="Settings" size={20} className="text-accent-500" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                onClick={() => console.log('User management')}
                iconName="Users"
                iconPosition="left"
                className="justify-start"
              >
                {currentLanguage === 'en' ? 'User Management' : 'إدارة المستخدمين'}
              </Button>
              <Button
                variant="outline"
                onClick={() => console.log('Reports')}
                iconName="BarChart3"
                iconPosition="left"
                className="justify-start"
              >
                {currentLanguage === 'en' ? 'Reports' : 'التقارير'}
              </Button>
              <Button
                variant="outline"
                onClick={() => console.log('Settings')}
                iconName="Settings"
                iconPosition="left"
                className="justify-start"
              >
                {currentLanguage === 'en' ? 'System Settings' : 'إعدادات النظام'}
              </Button>
              <Button
                variant="outline"
                onClick={() => console.log('Support')}
                iconName="HelpCircle"
                iconPosition="left"
                className="justify-start"
              >
                {currentLanguage === 'en' ? 'Help & Support' : 'المساعدة والدعم'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;