import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatus = () => {
  const systemMetrics = [
    { id: 1, name: 'Server Status', status: 'online', value: '99.9%', description: 'Uptime', icon: 'Server' },
    { id: 2, name: 'Database', status: 'online', value: '2.3ms', description: 'Response Time', icon: 'Database' },
    { id: 3, name: 'Storage', status: 'warning', value: '78%', description: 'Used', icon: 'HardDrive' },
    { id: 4, name: 'Backup', status: 'online', value: '2 hours ago', description: 'Last Backup', icon: 'Download' }
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case 'online': return { bg: 'bg-success-50', text: 'text-success-600', dot: 'bg-success-500' };
      case 'warning': return { bg: 'bg-warning-50', text: 'text-warning-600', dot: 'bg-warning-500' };
      case 'error': return { bg: 'bg-error-50', text: 'text-error-600', dot: 'bg-error-500' };
      default: return { bg: 'bg-secondary-50', text: 'text-secondary-600', dot: 'bg-secondary-500' };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Online';
      case 'warning': return 'Warning';
      case 'error': return 'Error';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">System Status</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
          <span className="text-sm text-success-600 font-medium">All Systems Operational</span>
        </div>
      </div>
      <div className="space-y-4">
        {systemMetrics.map((metric) => {
          const styles = getStatusStyles(metric.status);
          return (
            <div key={metric.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary-50 transition-smooth">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${styles.bg}`}>
                  <Icon name={metric.icon} size={18} className={styles.text} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text-primary">{metric.name}</h4>
                  <p className="text-xs text-text-secondary">{metric.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">{metric.value}</p>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
                    <span className={`text-xs ${styles.text}`}>{getStatusText(metric.status)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Last updated:</span>
          <span className="text-text-primary font-medium">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
