import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActionsPanel = () => {
  const quickActions = [
    { id: 1, title: 'Add New User', description: 'Create student, teacher, or admin accounts', icon: 'UserPlus', color: 'primary' },
    { id: 2, title: 'Generate Reports', description: 'Create attendance and performance reports', icon: 'FileText', color: 'success' },
    { id: 3, title: 'System Announcements', description: 'Send notifications to all users', icon: 'Megaphone', color: 'warning' },
    { id: 4, title: 'Backup Data', description: 'Create system backup and exports', icon: 'Download', color: 'secondary' }
  ];

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
        <Icon name="Zap" size={20} className="text-accent-500" />
      </div>
      <div className="space-y-4">
        {quickActions.map((action) => (
          <div key={action.id} className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:bg-secondary-50 transition-smooth cursor-pointer" onClick={() => console.log(`Quick action ${action.id} clicked`)}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color === 'primary' ? 'bg-primary-50 text-primary-600' : action.color === 'success' ? 'bg-success-50 text-success-600' : action.color === 'warning' ? 'bg-warning-50 text-warning-600' : 'bg-secondary-50 text-secondary-600'}`}>
              <Icon name={action.icon} size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-text-primary mb-1">{action.title}</h4>
              <p className="text-xs text-text-secondary">{action.description}</p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-text-secondary" />
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="outline" onClick={() => console.log('View all actions')} className="w-full">View All Actions</Button>
      </div>
    </div>
  );
};

export default QuickActionsPanel;
