import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatus = ({ currentLanguage }) => {
  const systemMetrics = [
    {
      id: 1,
      name: currentLanguage === 'en' ? 'Server Status' : 'حالة الخادم',
      status: 'online',
      value: '99.9%',
      description: currentLanguage === 'en' ? 'Uptime' : 'وقت التشغيل',
      icon: 'Server'
    },
    {
      id: 2,
      name: currentLanguage === 'en' ? 'Database' : 'قاعدة البيانات',
      status: 'online',
      value: '2.3ms',
      description: currentLanguage === 'en' ? 'Response Time' : 'وقت الاستجابة',
      icon: 'Database'
    },
    {
      id: 3,
      name: currentLanguage === 'en' ? 'Storage' : 'التخزين',
      status: 'warning',
      value: '78%',
      description: currentLanguage === 'en' ? 'Used' : 'مستخدم',
      icon: 'HardDrive'
    },
    {
      id: 4,
      name: currentLanguage === 'en' ? 'Backup' : 'النسخ الاحتياطي',
      status: 'online',
      value: '2 hours ago',
      description: currentLanguage === 'en' ? 'Last Backup' : 'آخر نسخة احتياطية',
      icon: 'Download'
    }
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case 'online':
        return {
          bg: 'bg-success-50',
          text: 'text-success-600',
          dot: 'bg-success-500'
        };
      case 'warning':
        return {
          bg: 'bg-warning-50',
          text: 'text-warning-600',
          dot: 'bg-warning-500'
        };
      case 'error':
        return {
          bg: 'bg-error-50',
          text: 'text-error-600',
          dot: 'bg-error-500'
        };
      default:
        return {
          bg: 'bg-secondary-50',
          text: 'text-secondary-600',
          dot: 'bg-secondary-500'
        };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online':
        return currentLanguage === 'en' ? 'Online' : 'متصل';
      case 'warning':
        return currentLanguage === 'en' ? 'Warning' : 'تحذير';
      case 'error':
        return currentLanguage === 'en' ? 'Error' : 'خطأ';
      default:
        return currentLanguage === 'en' ? 'Unknown' : 'غير معروف';
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {currentLanguage === 'en' ? 'System Status' : 'حالة النظام'}
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
          <span className="text-sm text-success-600 font-medium">
            {currentLanguage === 'en' ? 'All Systems Operational' : 'جميع الأنظمة تعمل'}
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        {systemMetrics.map((metric) => {
          const styles = getStatusStyles(metric.status);
          return (
            <div
              key={metric.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary-50 transition-smooth"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${styles.bg}`}>
                  <Icon name={metric.icon} size={18} className={styles.text} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text-primary">
                    {metric.name}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {metric.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">
                    {metric.value}
                  </p>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
                    <span className={`text-xs ${styles.text}`}>
                      {getStatusText(metric.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">
            {currentLanguage === 'en' ? 'Last updated:' : 'آخر تحديث:'}
          </span>
          <span className="text-text-primary font-medium">
            {new Date().toLocaleTimeString(currentLanguage === 'en' ? 'en-US' : 'ar-SA', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;