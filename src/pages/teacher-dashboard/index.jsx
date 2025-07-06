import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TodayScheduleCard from './components/TodayScheduleCard';
import AssignmentSubmissionCard from './components/AssignmentSubmissionCard';
import ClassPerformanceWidget from './components/ClassPerformanceWidget';
import AttendanceAlertWidget from './components/AttendanceAlertWidget';
import QuickActionsPanel from './components/QuickActionsPanel';
import UpcomingDeadlinesWidget from './components/UpcomingDeadlinesWidget';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Mock data for today's schedule
  const todaySchedule = [
    {
      id: 1,
      subject: currentLanguage === 'en' ? 'Mathematics' : 'الرياضيات',
      className: '10-A',
      time: '08:00 - 09:30',
      room: '201',
      studentCount: 25,
      presentCount: 23,
      absentCount: 2,
      status: 'completed'
    },
    {
      id: 2,
      subject: currentLanguage === 'en' ? 'Physics' : 'الفيزياء',
      className: '11-B',
      time: '10:00 - 11:30',
      room: '305',
      studentCount: 28,
      presentCount: 26,
      absentCount: 2,
      status: 'in-progress'
    },
    {
      id: 3,
      subject: currentLanguage === 'en' ? 'Chemistry' : 'الكيمياء',
      className: '12-C',
      time: '13:00 - 14:30',
      room: '402',
      studentCount: 22,
      presentCount: 0,
      absentCount: 0,
      status: 'upcoming'
    }
  ];

  // Mock data for assignment submissions
  const recentSubmissions = [
    {
      id: 1,
      assignmentTitle: currentLanguage === 'en' ? 'Algebra Problem Set #5' : 'مجموعة مسائل الجبر رقم 5',
      studentName: 'Sarah Johnson',
      submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      dueDate: '2024-01-15',
      priority: 'high',
      hasAttachment: true,
      attachmentCount: 2,
      isLate: false
    },
    {
      id: 2,
      assignmentTitle: currentLanguage === 'en' ? 'Physics Lab Report' : 'تقرير مختبر الفيزياء',
      studentName: 'Michael Chen',
      submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      dueDate: '2024-01-14',
      priority: 'medium',
      hasAttachment: true,
      attachmentCount: 1,
      isLate: true
    },
    {
      id: 3,
      assignmentTitle: currentLanguage === 'en' ? 'Chemistry Worksheet' : 'ورقة عمل الكيمياء',
      studentName: 'Emma Davis',
      submittedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      dueDate: '2024-01-16',
      priority: 'low',
      hasAttachment: false,
      attachmentCount: 0,
      isLate: false
    }
  ];

  const handleMarkAttendance = (scheduleId) => {
    console.log('Mark attendance for schedule:', scheduleId);
    // Navigate to attendance page or open modal
  };

  const handleGradeSubmission = (submissionId, action) => {
    console.log('Grade submission:', submissionId, action);
    // Navigate to grading page or open modal
  };

  const handleViewStudent = (studentId) => {
    console.log('View student:', studentId);
    // Navigate to student profile
  };

  const handleQuickAction = (action) => {
    console.log('Quick action:', action);
    switch (action) {
      case 'create_assignment': navigate('/assignments/create');
        break;
      case 'bulk_attendance': navigate('/attendance/bulk');
        break;
      case 'grade_entry': navigate('/gradebook');
        break;
      case 'send_message': navigate('/messages/compose');
        break;
      default:
        break;
    }
  };

  const handleViewDeadline = (deadlineId, action = 'view') => {
    console.log('View deadline:', deadlineId, action);
    // Navigate to deadline details or send reminder
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString(currentLanguage === 'en' ? 'en-US' : 'ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                  {currentLanguage === 'en' ? 'Welcome back, Teacher!' : 'مرحباً بعودتك، أستاذ!'}
                </h1>
                <p className="text-text-secondary">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <Button
                  variant="primary"
                  iconName="Plus"
                  onClick={() => handleQuickAction('create_assignment')}
                >
                  {currentLanguage === 'en' ? 'New Assignment' : 'واجب جديد'}
                </Button>
                <Button
                  variant="outline"
                  iconName="UserCheck"
                  onClick={() => handleQuickAction('bulk_attendance')}
                >
                  {currentLanguage === 'en' ? 'Take Attendance' : 'تسجيل الحضور'}
                </Button>
              </div>
            </div>
          </div>

          {/* Today's Schedule Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text-primary">
                {currentLanguage === 'en' ? "Today's Schedule" : 'جدول اليوم'}
              </h2>
              <Button variant="ghost" size="sm" iconName="Calendar">
                {currentLanguage === 'en' ? 'View Full Schedule' : 'عرض الجدول الكامل'}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todaySchedule.map((schedule) => (
                <TodayScheduleCard
                  key={schedule.id}
                  schedule={schedule}
                  onMarkAttendance={handleMarkAttendance}
                  currentLanguage={currentLanguage}
                />
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Submissions */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-text-primary">
                    {currentLanguage === 'en' ? 'Recent Submissions' : 'التسليمات الحديثة'}
                  </h2>
                  <Button variant="ghost" size="sm" iconName="FileText">
                    {currentLanguage === 'en' ? 'View All' : 'عرض الكل'}
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentSubmissions.map((submission) => (
                    <AssignmentSubmissionCard
                      key={submission.id}
                      submission={submission}
                      onGrade={handleGradeSubmission}
                      currentLanguage={currentLanguage}
                    />
                  ))}
                </div>
              </div>

              {/* Class Performance */}
              <ClassPerformanceWidget
                classData={{}}
                currentLanguage={currentLanguage}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <QuickActionsPanel
                onAction={handleQuickAction}
                currentLanguage={currentLanguage}
              />

              {/* Attendance Alerts */}
              <AttendanceAlertWidget
                alerts={[]}
                onViewStudent={handleViewStudent}
                currentLanguage={currentLanguage}
              />

              {/* Upcoming Deadlines */}
              <UpcomingDeadlinesWidget
                deadlines={[]}
                onViewDeadline={handleViewDeadline}
                currentLanguage={currentLanguage}
              />
            </div>
          </div>

          {/* Statistics Overview */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-text-primary mb-6">
              {currentLanguage === 'en' ? 'Overview Statistics' : 'إحصائيات عامة'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-surface rounded-lg border border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-text-primary">127</p>
                    <p className="text-sm text-text-secondary">
                      {currentLanguage === 'en' ? 'Total Students' : 'إجمالي الطلاب'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={24} color="var(--color-primary)" />
                  </div>
                </div>
              </div>

              <div className="bg-surface rounded-lg border border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-text-primary">8</p>
                    <p className="text-sm text-text-secondary">
                      {currentLanguage === 'en' ? 'Active Classes' : 'الفصول النشطة'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
                    <Icon name="BookOpen" size={24} color="var(--color-success)" />
                  </div>
                </div>
              </div>

              <div className="bg-surface rounded-lg border border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-text-primary">23</p>
                    <p className="text-sm text-text-secondary">
                      {currentLanguage === 'en' ? 'Pending Grades' : 'الدرجات المعلقة'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center">
                    <Icon name="BookMarked" size={24} color="var(--color-warning)" />
                  </div>
                </div>
              </div>

              <div className="bg-surface rounded-lg border border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-text-primary">94%</p>
                    <p className="text-sm text-text-secondary">
                      {currentLanguage === 'en' ? 'Attendance Rate' : 'معدل الحضور'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center">
                    <Icon name="TrendingUp" size={24} color="var(--color-accent)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;