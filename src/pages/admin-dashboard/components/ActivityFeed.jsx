import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ currentLanguage }) => {
  const activities = [
    {
      id: 1,
      type: 'user_login',
      user: 'Sarah Johnson',
      action: currentLanguage === 'en' ? 'logged into the system' : 'سجل دخول إلى النظام',
      time: '2 minutes ago',
      icon: 'LogIn',
      color: 'success'
    },
    {
      id: 2,
      type: 'assignment_submitted',
      user: 'Michael Chen',
      action: currentLanguage === 'en' ? 'submitted Math Assignment #5' : 'قدم واجب الرياضيات رقم 5',
      time: '15 minutes ago',
      icon: 'FileText',
      color: 'primary'
    },
    {
      id: 3,
      type: 'attendance_marked',
      user: 'Emily Rodriguez',
      action: currentLanguage === 'en' ? 'marked attendance for Grade 10A' : 'سجل الحضور للصف العاشر أ',
      time: '32 minutes ago',
      icon: 'UserCheck',
      color: 'warning'
    },
    {
      id: 4,
      type: 'user_created',
      user: 'Admin',
      action: currentLanguage === 'en' ? 'created new student account for Alex Thompson' : 'أنشأ حساب طالب جديد لأليكس تومسون',
      time: '1 hour ago',
      icon: 'UserPlus',
      color: 'success'
    },
    {
      id: 5,
      type: 'report_generated',
      user: 'David Wilson',
      action: currentLanguage === 'en' ? 'generated monthly attendance report' : 'أنشأ تقرير الحضور الشهري',
      time: '2 hours ago',
      icon: 'BarChart3',
      color: 'secondary'
    },
    {
      id: 6,
      type: 'system_backup',
      user: 'System',
      action: currentLanguage === 'en' ? 'completed automated backup' : 'أكمل النسخ الاحتياطي التلقائي',
      time: '3 hours ago',
      icon: 'Download',
      color: 'primary'
    }
  ];

  const getIconColor = (color) => {
    switch (color) {
      case 'success':
        return 'text-success-600';
      case 'warning':
        return 'text-warning-600';
      case 'error':
        return 'text-error-600';
      case 'secondary':
        return 'text-secondary-600';
      default:
        return 'text-primary-600';
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {currentLanguage === 'en' ? 'Recent Activity' : 'النشاط الأخير'}
        </h3>
        <Icon name="Activity" size={20} className="text-accent-500" />
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-secondary-50 ${getIconColor(activity.color)}`}>
              <Icon name={activity.icon} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary">
                <span className="font-medium">{activity.user}</span>
                {' '}
                <span className="text-text-secondary">{activity.action}</span>
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-smooth">
          {currentLanguage === 'en' ? 'View All Activity' : 'عرض جميع الأنشطة'}
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;