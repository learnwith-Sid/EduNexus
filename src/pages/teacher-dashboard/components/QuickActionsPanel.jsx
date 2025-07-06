import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ onAction, currentLanguage }) => {
  const quickActions = [
    {
      id: 'create_assignment',
      title: currentLanguage === 'en' ? 'Create Assignment' : 'إنشاء واجب',
      description: currentLanguage === 'en' ? 'Create and distribute new assignments' : 'إنشاء وتوزيع واجبات جديدة',
      icon: 'FileText',
      color: 'bg-primary-50 text-primary-600 border-primary-200',
      action: 'create_assignment'
    },
    {
      id: 'bulk_attendance',
      title: currentLanguage === 'en' ? 'Bulk Attendance' : 'حضور جماعي',
      description: currentLanguage === 'en' ? 'Mark attendance for multiple classes' : 'تسجيل الحضور لعدة فصول',
      icon: 'UserCheck',
      color: 'bg-success-50 text-success-600 border-success-200',
      action: 'bulk_attendance'
    },
    {
      id: 'grade_entry',
      title: currentLanguage === 'en' ? 'Grade Entry' : 'إدخال الدرجات',
      description: currentLanguage === 'en' ? 'Enter and update student grades' : 'إدخال وتحديث درجات الطلاب',
      icon: 'BookMarked',
      color: 'bg-warning-50 text-warning-600 border-warning-200',
      action: 'grade_entry'
    },
    {
      id: 'send_message',
      title: currentLanguage === 'en' ? 'Send Message' : 'إرسال رسالة',
      description: currentLanguage === 'en' ? 'Communicate with students or parents' : 'التواصل مع الطلاب أو أولياء الأمور',
      icon: 'MessageSquare',
      color: 'bg-accent-50 text-accent-600 border-accent-200',
      action: 'send_message'
    }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {currentLanguage === 'en' ? 'Quick Actions' : 'إجراءات سريعة'}
        </h3>
        <Icon name="Zap" size={20} color="var(--color-accent)" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <div
            key={action.id}
            className={`p-4 rounded-lg border cursor-pointer hover-scale transition-smooth ${action.color}`}
            onClick={() => onAction(action.action)}
          >
            <div className="flex items-start space-x-3">
              <div className="mt-1">
                <Icon name={action.icon} size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold mb-1">
                  {action.title}
                </h4>
                <p className="text-xs opacity-80">
                  {action.description}
                </p>
              </div>
              <Icon name="ArrowRight" size={16} className="mt-1 opacity-60" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <p className="text-xs text-text-secondary">
            {currentLanguage === 'en' ? 'Frequently used tools' : 'الأدوات المستخدمة بكثرة'}
          </p>
          <Button variant="ghost" size="xs" iconName="Settings">
            {currentLanguage === 'en' ? 'Customize' : 'تخصيص'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;