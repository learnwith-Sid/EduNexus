import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TodayScheduleCard = ({ schedule, onMarkAttendance, currentLanguage }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success-50 text-success-600 border-success-200';
      case 'in-progress':
        return 'bg-warning-50 text-warning-600 border-warning-200';
      case 'upcoming':
        return 'bg-primary-50 text-primary-600 border-primary-200';
      default:
        return 'bg-secondary-50 text-secondary-600 border-secondary-200';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 hover-scale transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            {schedule.subject}
          </h3>
          <p className="text-sm text-text-secondary mb-2">
            {currentLanguage === 'en' ? 'Class' : 'الفصل'} {schedule.className}
          </p>
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} />
              <span>{schedule.time}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={16} />
              <span>{currentLanguage === 'en' ? 'Room' : 'الغرفة'} {schedule.room}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={16} />
              <span>{schedule.studentCount} {currentLanguage === 'en' ? 'students' : 'طلاب'}</span>
            </div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(schedule.status)}`}>
          {currentLanguage === 'en' ? schedule.status.replace('-', ' ') : 
           schedule.status === 'completed' ? 'مكتمل' : 
           schedule.status === 'in-progress' ? 'جاري' : 'قادم'}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-xs text-text-secondary">
              {schedule.presentCount} {currentLanguage === 'en' ? 'present' : 'حاضر'}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-error rounded-full"></div>
            <span className="text-xs text-text-secondary">
              {schedule.absentCount} {currentLanguage === 'en' ? 'absent' : 'غائب'}
            </span>
          </div>
        </div>
        
        {schedule.status !== 'completed' && (
          <Button
            variant="primary"
            size="sm"
            iconName="UserCheck"
            onClick={() => onMarkAttendance(schedule.id)}
          >
            {currentLanguage === 'en' ? 'Mark Attendance' : 'تسجيل الحضور'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TodayScheduleCard;