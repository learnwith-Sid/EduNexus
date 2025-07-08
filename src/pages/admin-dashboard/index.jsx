import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import QuickActionsPanel from './components/QuickActionsPanel';
import ActivityFeed from './components/ActivityFeed';
import AttendanceAlerts from './components/AttendanceAlerts';
import EventsCalendar from './components/EventsCalendar';
import NotificationsPanel from './components/NotificationsPanel';
import PerformanceChart from './components/PerformanceChart';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { getAllUsers } from '../../services/userService'; // Import the new user service

const AdminDashboard = ({ onLogout, notifications, setNotifications }) => {
  const [adminName, setAdminName] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // State to hold the dynamic metrics from the API
  const [keyMetrics, setKeyMetrics] = useState([
    { title: 'Total Students', value: '...', icon: 'Users', color: 'primary', change: '', changeType: 'increase' },
    { title: 'Active Teachers', value: '...', icon: 'UserCheck', color: 'success', change: '', changeType: 'increase' },
    { title: 'Total Parents', value: '...', icon: 'UserHeart', color: 'warning', change: '', changeType: 'increase' },
    { title: 'Total Admins', value: '...', icon: 'Shield', color: 'error', change: '', changeType: 'increase' }
  ]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setAdminName(storedUsername);
    }
    
    // Fetch user data to populate metric cards
    const controller = new AbortController();
    const fetchUserMetrics = async () => {
        try {
            const users = await getAllUsers(controller.signal);
            
            // Calculate counts based on roles
            const studentCount = users.filter(u => u.role === 'Student').length;
            const teacherCount = users.filter(u => u.role === 'Teacher').length;
            const parentCount = users.filter(u => u.role === 'Parent').length;
            const adminCount = users.filter(u => u.role === 'Admin').length;

            setKeyMetrics([
                { title: 'Total Students', value: studentCount.toLocaleString(), icon: 'Users', color: 'primary', change: '+12 this month', changeType: 'increase' },
                { title: 'Active Teachers', value: teacherCount.toLocaleString(), icon: 'UserCheck', color: 'success', change: '+2 this month', changeType: 'increase' },
                { title: 'Total Parents', value: parentCount.toLocaleString(), icon: 'UserHeart', color: 'warning', change: '-5 from last week', changeType: 'decrease' },
                { title: 'Total Admins', value: adminCount.toLocaleString(), icon: 'Shield', color: 'error', change: '+1 this month', changeType: 'increase' }
            ]);

        } catch (error) { // ** THE FIX **: Corrected the catch block syntax here.
            console.error("Error setting up user metrics:", error);
        }
    };

    fetchUserMetrics();
    
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    
    // Cleanup function to abort fetch and clear timer
    return () => {
        controller.abort();
        clearInterval(timer);
    };
  }, []);

  const formatCurrentTime = () => {
    return currentTime.toLocaleString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onLogout={onLogout} 
        notifications={notifications} 
        setNotifications={setNotifications} 
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-text-primary mb-2">
                  Welcome back, {adminName || 'Administrator'}
                </h1>
                <p className="text-text-secondary">{formatCurrentTime()}</p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <Button variant="primary" onClick={() => console.log('Generate report')} iconName="FileText" iconPosition="left">Generate Report</Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {keyMetrics.map((metric, index) => <MetricCard key={index} {...metric} />)}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            <div className="lg:col-span-3"><QuickActionsPanel /></div>
            <div className="lg:col-span-6 space-y-6"><ActivityFeed /><AttendanceAlerts /></div>
            <div className="lg:col-span-3 space-y-6">
              <EventsCalendar />
              <NotificationsPanel />
            </div>
          </div>

          <div className="mb-8"><PerformanceChart /></div>

          <div className="bg-surface rounded-lg p-6 shadow-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Administrative Tools</h3>
              <Icon name="Settings" size={20} className="text-accent-500" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" iconName="Users" iconPosition="left" className="justify-start">User Management</Button>
              <Button variant="outline" iconName="BarChart3" iconPosition="left" className="justify-start">Reports</Button>
              <Button variant="outline" iconName="Settings" iconPosition="left" className="justify-start">System Settings</Button>
              <Button variant="outline" iconName="HelpCircle" iconPosition="left" className="justify-start">Help & Support</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;


 // const keyMetrics = [
  //   { title: 'Total Students', value: '1,384', change: '+12 this month', changeType: 'increase', icon: 'Users', color: 'primary' },
  //   { title: 'Active Teachers', value: '53', change: '+2 this month', changeType: 'increase', icon: 'UserCheck', color: 'success' },
  //   { title: 'Attendance Rate', value: '92.5%', change: '-1.2% from last week', changeType: 'decrease', icon: 'TrendingUp', color: 'warning' },
  //   { title: 'Pending Assignments', value: '247', change: '+15 today', changeType: 'increase', icon: 'FileText', color: 'error' }
  // ];