import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssignmentSubmissionCard = ({ submission, onGrade, currentLanguage }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error-50 text-error-600 border-error-200';
      case 'medium':
        return 'bg-warning-50 text-warning-600 border-warning-200';
      case 'low':
        return 'bg-success-50 text-success-600 border-success-200';
      default:
        return 'bg-secondary-50 text-secondary-600 border-secondary-200';
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const submissionDate = new Date(date);
    const diffInHours = Math.floor((now - submissionDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return currentLanguage === 'en' ? 'Just now' : 'الآن';
    } else if (diffInHours < 24) {
      return currentLanguage === 'en' ? `${diffInHours}h ago` : `منذ ${diffInHours} ساعة`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return currentLanguage === 'en' ? `${diffInDays}d ago` : `منذ ${diffInDays} يوم`;
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 hover:bg-secondary-50 transition-smooth">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-text-primary mb-1">
            {submission.assignmentTitle}
          </h4>
          <p className="text-xs text-text-secondary mb-2">
            {currentLanguage === 'en' ? 'Submitted by' : 'مقدم من'} {submission.studentName}
          </p>
          <div className="flex items-center space-x-3 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{getTimeAgo(submission.submittedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>{currentLanguage === 'en' ? 'Due' : 'موعد التسليم'}: {submission.dueDate}</span>
            </div>
          </div>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(submission.priority)}`}>
          {currentLanguage === 'en' ? submission.priority : 
           submission.priority === 'high' ? 'عالي' : 
           submission.priority === 'medium' ? 'متوسط' : 'منخفض'}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {submission.hasAttachment && (
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <Icon name="Paperclip" size={12} />
              <span>{submission.attachmentCount} {currentLanguage === 'en' ? 'files' : 'ملفات'}</span>
            </div>
          )}
          {submission.isLate && (
            <div className="flex items-center space-x-1 text-xs text-error">
              <Icon name="AlertTriangle" size={12} />
              <span>{currentLanguage === 'en' ? 'Late' : 'متأخر'}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="xs"
            iconName="Eye"
            onClick={() => onGrade(submission.id, 'view')}
          >
            {currentLanguage === 'en' ? 'View' : 'عرض'}
          </Button>
          <Button
            variant="primary"
            size="xs"
            iconName="CheckCircle"
            onClick={() => onGrade(submission.id, 'grade')}
          >
            {currentLanguage === 'en' ? 'Grade' : 'تقييم'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmissionCard;