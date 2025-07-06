import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingDeadlinesWidget = ({ deadlines, onViewDeadline, currentLanguage }) => {
  const mockDeadlines = [
    {
      id: 1,
      title: currentLanguage === 'en' ? 'Math Quiz - Chapter 5' : 'اختبار الرياضيات - الفصل 5',
      type: 'assignment',
      dueDate: '2024-01-15',
      dueTime: '11:59 PM',
      className: 'Grade 10-A',
      priority: 'high',
      submissionCount: 18,
      totalStudents: 25,
      daysLeft: 2
    },
    {
      id: 2,
      title: currentLanguage === 'en' ? 'Science Project Presentation' : 'عرض مشروع العلوم',
      type: 'project',
      dueDate: '2024-01-18',
      dueTime: '2:00 PM',
      className: 'Grade 9-B',
      priority: 'medium',
      submissionCount: 12,
      totalStudents: 20,
      daysLeft: 5
    },
    {
      id: 3,
      title: currentLanguage === 'en' ? 'English Essay - Literature Review' : 'مقال إنجليزي - مراجعة أدبية',
      type: 'essay',
      dueDate: '2024-01-20',
      dueTime: '5:00 PM',
      className: 'Grade 11-C',
      priority: 'low',
      submissionCount: 22,
      totalStudents: 28,
      daysLeft: 7
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'assignment':
        return 'FileText';
      case 'project':
        return 'Presentation';
      case 'essay':
        return 'PenTool';
      default:
        return 'Calendar';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-text-secondary';
    }
  };

  const getProgressPercentage = (submitted, total) => {
    return Math.round((submitted / total) * 100);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {currentLanguage === 'en' ? 'Upcoming Deadlines' : 'المواعيد النهائية القادمة'}
        </h3>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={16} color="var(--color-warning)" />
          <span className="text-xs text-text-secondary">
            {mockDeadlines.filter(d => d.daysLeft <= 3).length} {currentLanguage === 'en' ? 'urgent' : 'عاجل'}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {mockDeadlines.map((deadline) => (
          <div key={deadline.id} className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  <Icon name={getTypeIcon(deadline.type)} size={16} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-text-primary mb-1">
                    {deadline.title}
                  </h4>
                  <p className="text-xs text-text-secondary mb-2">
                    {deadline.className}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{deadline.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{deadline.dueTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${getPriorityColor(deadline.priority)}`}>
                  {deadline.daysLeft} {currentLanguage === 'en' ? 'days' : 'أيام'}
                </p>
                <p className="text-xs text-text-secondary">
                  {currentLanguage === 'en' ? 'remaining' : 'متبقية'}
                </p>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-secondary">
                  {currentLanguage === 'en' ? 'Submissions' : 'التسليمات'}
                </span>
                <span className="text-xs text-text-secondary">
                  {deadline.submissionCount}/{deadline.totalStudents}
                </span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage(deadline.submissionCount, deadline.totalStudents)}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-text-secondary">
                {getProgressPercentage(deadline.submissionCount, deadline.totalStudents)}% {currentLanguage === 'en' ? 'completed' : 'مكتمل'}
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Eye"
                  onClick={() => onViewDeadline(deadline.id)}
                >
                  {currentLanguage === 'en' ? 'View' : 'عرض'}
                </Button>
                <Button
                  variant="primary"
                  size="xs"
                  iconName="MessageSquare"
                  onClick={() => onViewDeadline(deadline.id, 'remind')}
                >
                  {currentLanguage === 'en' ? 'Remind' : 'تذكير'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="ghost" size="sm" iconName="Calendar" className="w-full">
          {currentLanguage === 'en' ? 'View All Deadlines' : 'عرض جميع المواعيد النهائية'}
        </Button>
      </div>
    </div>
  );
};

export default UpcomingDeadlinesWidget;