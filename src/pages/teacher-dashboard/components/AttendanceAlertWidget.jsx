import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendanceAlertWidget = ({ alerts, onViewStudent, currentLanguage }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'frequent_absence':
        return 'UserX';
      case 'late_arrival':
        return 'Clock';
      case 'early_departure':
        return 'LogOut';
      default:
        return 'AlertTriangle';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-error-50 border-error-200 text-error-600';
      case 'medium':
        return 'bg-warning-50 border-warning-200 text-warning-600';
      case 'low':
        return 'bg-primary-50 border-primary-200 text-primary-600';
      default:
        return 'bg-secondary-50 border-secondary-200 text-secondary-600';
    }
  };

  const mockAlerts = [
    {
      id: 1,
      studentName: "Sarah Johnson",
      type: "frequent_absence",
      severity: "high",
      message: currentLanguage === 'en' ? "Absent 4 out of last 5 days" : "غائب 4 من آخر 5 أيام",
      className: "Grade 10-A",
      daysCount: 4
    },
    {
      id: 2,
      studentName: "Michael Chen",
      type: "late_arrival",
      severity: "medium",
      message: currentLanguage === 'en' ? "Late arrival 3 times this week" : "وصول متأخر 3 مرات هذا الأسبوع",
      className: "Grade 9-B",
      daysCount: 3
    },
    {
      id: 3,
      studentName: "Emma Davis",
      type: "early_departure",
      severity: "low",
      message: currentLanguage === 'en' ? "Left early twice this week" : "غادر مبكراً مرتين هذا الأسبوع",
      className: "Grade 11-C",
      daysCount: 2
    }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {currentLanguage === 'en' ? 'Attendance Alerts' : 'تنبيهات الحضور'}
        </h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-error rounded-full"></div>
          <span className="text-xs text-text-secondary">
            {mockAlerts.filter(alert => alert.severity === 'high').length} {currentLanguage === 'en' ? 'urgent' : 'عاجل'}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {mockAlerts.map((alert) => (
          <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.severity)}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  <Icon name={getAlertIcon(alert.type)} size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary mb-1">
                    {alert.studentName}
                  </p>
                  <p className="text-xs text-text-secondary mb-1">
                    {alert.className}
                  </p>
                  <p className="text-xs">
                    {alert.message}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="xs"
                iconName="Eye"
                onClick={() => onViewStudent(alert.id)}
              >
                {currentLanguage === 'en' ? 'View' : 'عرض'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <p className="text-xs text-text-secondary">
          {mockAlerts.length} {currentLanguage === 'en' ? 'alerts requiring attention' : 'تنبيهات تتطلب انتباه'}
        </p>
        <Button variant="primary" size="sm" iconName="Users">
          {currentLanguage === 'en' ? 'View All Students' : 'عرض جميع الطلاب'}
        </Button>
      </div>
    </div>
  );
};

export default AttendanceAlertWidget;