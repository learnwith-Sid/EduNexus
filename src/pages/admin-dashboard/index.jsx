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

// The onLogout prop is passed down from App.jsx -> Routes.jsx
const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Get the username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setAdminName(storedUsername);
    }
    
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  const keyMetrics = [
    { title: 'Total Students', value: '1,384', change: '+12 this month', changeType: 'increase', icon: 'Users', color: 'primary' },
    { title: 'Active Teachers', value: '53', change: '+2 this month', changeType: 'increase', icon: 'UserCheck', color: 'success' },
    { title: 'Attendance Rate', value: '92.5%', change: '-1.2% from last week', changeType: 'decrease', icon: 'TrendingUp', color: 'warning' },
    { title: 'Pending Assignments', value: '247', change: '+15 today', changeType: 'increase', icon: 'FileText', color: 'error' }
  ];
  


  const formatCurrentTime = () => {
    return currentTime.toLocaleString('en-US', {
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
      <Header onLogout={onLogout}/>
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-text-primary mb-2">
                  Welcome back, {adminName || 'Administrator'}
                </h1>
                <p className="text-text-secondary">
                  {formatCurrentTime()}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <Button
                  variant="primary"
                  onClick={() => console.log('Generate report')}
                  iconName="FileText"
                  iconPosition="left"
                >
                  Generate Report
                </Button>
                {/* Logout Button */}
                
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
            <div className="lg:col-span-3">
              <QuickActionsPanel />
            </div>
            <div className="lg:col-span-6 space-y-6">
              <ActivityFeed />
              <AttendanceAlerts />
            </div>
            <div className="lg:col-span-3 space-y-6">
              <EventsCalendar />
              <SystemStatus />
            </div>
          </div>

          {/* Analytics Chart */}
          <div className="mb-8">
            <PerformanceChart />
          </div>

          {/* Additional Actions */}
          <div className="bg-surface rounded-lg p-6 shadow-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Administrative Tools
              </h3>
              <Icon name="Settings" size={20} className="text-accent-500" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" onClick={() => console.log('User management')} iconName="Users" iconPosition="left" className="justify-start">
                User Management
              </Button>
              <Button variant="outline" onClick={() => console.log('Reports')} iconName="BarChart3" iconPosition="left" className="justify-start">
                Reports
              </Button>
              <Button variant="outline" onClick={() => console.log('Settings')} iconName="Settings" iconPosition="left" className="justify-start">
                System Settings
              </Button>
              <Button variant="outline" onClick={() => console.log('Support')} iconName="HelpCircle" iconPosition="left" className="justify-start">
                Help & Support
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
