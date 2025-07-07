import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendanceAlerts = () => {
  const alerts = [
    { id: 1, title: 'Low Attendance Alert', message: 'Grade 9B has 65% attendance today (below 70% threshold)', severity: 'warning', time: '10 minutes ago', class: 'Grade 9B', percentage: '65%' },
    { id: 2, title: 'Extended Absence', message: 'Emma Davis has been absent for 3 consecutive days', severity: 'error', time: '25 minutes ago', student: 'Emma Davis', days: '3 days' },
    { id: 3, title: 'Perfect Attendance', message: 'Grade 11A achieved 100% attendance this week', severity: 'success', time: '1 hour ago', class: 'Grade 11A', percentage: '100%' },
    { id: 4, title: 'Late Arrivals', message: '8 students arrived late today (increase from yesterday)', severity: 'warning', time: '2 hours ago', count: '8 students' }
  ];

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'error': return { bg: 'bg-error-50', border: 'border-error-200', icon: 'text-error-600', title: 'text-error-800' };
      case 'warning': return { bg: 'bg-warning-50', border: 'border-warning-200', icon: 'text-warning-600', title: 'text-warning-800' };
      case 'success': return { bg: 'bg-success-50', border: 'border-success-200', icon: 'text-success-600', title: 'text-success-800' };
      default: return { bg: 'bg-secondary-50', border: 'border-secondary-200', icon: 'text-secondary-600', title: 'text-secondary-800' };
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'error': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'success': return 'CheckCircle';
      default: return 'Info';
    }
  };

  const handleAlertAction = (alertId) => console.log(`Alert action for ${alertId}`);

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Attendance Alerts</h3>
        <div className="flex items-center space-x-2">
          <span className="bg-error-100 text-error-600 text-xs px-2 py-1 rounded-full">
            {alerts.filter(a => a.severity === 'error').length}
          </span>
          <Icon name="Bell" size={20} className="text-accent-500" />
        </div>
      </div>
      
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {alerts.map((alert) => {
          const styles = getSeverityStyles(alert.severity);
          return (
            <div key={alert.id} className={`p-4 rounded-lg border ${styles.bg} ${styles.border} transition-smooth hover:shadow-sm`}>
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white ${styles.icon}`}>
                  <Icon name={getSeverityIcon(alert.severity)} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`text-sm font-medium ${styles.title}`}>{alert.title}</h4>
                    <span className="text-xs text-text-secondary">{alert.time}</span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">{alert.message}</p>
                  {alert.class && (<div className="flex items-center space-x-4 text-xs text-text-secondary mb-2"><span>Class: {alert.class}</span>{alert.percentage && <span>Rate: {alert.percentage}</span>}</div>)}
                  {alert.student && (<div className="flex items-center space-x-4 text-xs text-text-secondary mb-2"><span>Student: {alert.student}</span>{alert.days && <span>Duration: {alert.days}</span>}</div>)}
                  {alert.count && (<div className="text-xs text-text-secondary mb-2">Count: {alert.count}</div>)}
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="xs" onClick={() => handleAlertAction(alert.id)}>View Details</Button>
                    {alert.severity !== 'success' && (<Button variant="ghost" size="xs" onClick={() => handleAlertAction(alert.id)}>Dismiss</Button>)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="outline" onClick={() => console.log('View all alerts')} className="w-full">
          View All Alerts
        </Button>
      </div>
    </div>
  );
};

export default AttendanceAlerts;
