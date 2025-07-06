import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceChart = ({ currentLanguage }) => {
  const [activeChart, setActiveChart] = useState('enrollment');

  const enrollmentData = [
    { month: currentLanguage === 'en' ? 'Jan' : 'يناير', students: 1200, teachers: 45 },
    { month: currentLanguage === 'en' ? 'Feb' : 'فبراير', students: 1250, teachers: 47 },
    { month: currentLanguage === 'en' ? 'Mar' : 'مارس', students: 1280, teachers: 48 },
    { month: currentLanguage === 'en' ? 'Apr' : 'أبريل', students: 1320, teachers: 50 },
    { month: currentLanguage === 'en' ? 'May' : 'مايو', students: 1350, teachers: 52 },
    { month: currentLanguage === 'en' ? 'Jun' : 'يونيو', students: 1380, teachers: 53 }
  ];

  const attendanceData = [
    { day: currentLanguage === 'en' ? 'Mon' : 'الاثنين', rate: 92 },
    { day: currentLanguage === 'en' ? 'Tue' : 'الثلاثاء', rate: 88 },
    { day: currentLanguage === 'en' ? 'Wed' : 'الأربعاء', rate: 95 },
    { day: currentLanguage === 'en' ? 'Thu' : 'الخميس', rate: 91 },
    { day: currentLanguage === 'en' ? 'Fri' : 'الجمعة', rate: 87 },
    { day: currentLanguage === 'en' ? 'Sat' : 'السبت', rate: 93 }
  ];

  const performanceData = [
    { 
      grade: currentLanguage === 'en' ? 'Excellent' : 'ممتاز', 
      value: 35, 
      color: '#059669' 
    },
    { 
      grade: currentLanguage === 'en' ? 'Good' : 'جيد', 
      value: 40, 
      color: '#3B82F6' 
    },
    { 
      grade: currentLanguage === 'en' ? 'Average' : 'متوسط', 
      value: 20, 
      color: '#F59E0B' 
    },
    { 
      grade: currentLanguage === 'en' ? 'Below Average' : 'أقل من المتوسط', 
      value: 5, 
      color: '#DC2626' 
    }
  ];

  const chartOptions = [
    {
      id: 'enrollment',
      title: currentLanguage === 'en' ? 'Enrollment Trends' : 'اتجاهات التسجيل',
      icon: 'TrendingUp'
    },
    {
      id: 'attendance',
      title: currentLanguage === 'en' ? 'Attendance Patterns' : 'أنماط الحضور',
      icon: 'UserCheck'
    },
    {
      id: 'performance',
      title: currentLanguage === 'en' ? 'Academic Performance' : 'الأداء الأكاديمي',
      icon: 'BarChart3'
    }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'enrollment':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#64748B' }}
                axisLine={{ stroke: '#E2E8F0' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748B' }}
                axisLine={{ stroke: '#E2E8F0' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              />
              <Bar dataKey="students" fill="#3B82F6" name={currentLanguage === 'en' ? 'Students' : 'الطلاب'} radius={[4, 4, 0, 0]} />
              <Bar dataKey="teachers" fill="#059669" name={currentLanguage === 'en' ? 'Teachers' : 'المعلمون'} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'attendance':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12, fill: '#64748B' }}
                axisLine={{ stroke: '#E2E8F0' }}
              />
              <YAxis 
                domain={[80, 100]}
                tick={{ fontSize: 12, fill: '#64748B' }}
                axisLine={{ stroke: '#E2E8F0' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
                formatter={(value) => [`${value}%`, currentLanguage === 'en' ? 'Attendance Rate' : 'معدل الحضور']}
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#F59E0B', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'performance':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
                formatter={(value) => [`${value}%`, currentLanguage === 'en' ? 'Students' : 'الطلاب']}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {currentLanguage === 'en' ? 'Analytics Dashboard' : 'لوحة التحليلات'}
        </h3>
        <Icon name="BarChart3" size={20} className="text-accent-500" />
      </div>
      
      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {chartOptions.map((option) => (
          <Button
            key={option.id}
            variant={activeChart === option.id ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveChart(option.id)}
            iconName={option.icon}
            iconPosition="left"
          >
            {option.title}
          </Button>
        ))}
      </div>
      
      {/* Chart Container */}
      <div className="w-full" aria-label={`${chartOptions.find(opt => opt.id === activeChart)?.title} Chart`}>
        {renderChart()}
      </div>
      
      {/* Performance Legend for Pie Chart */}
      {activeChart === 'performance' && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4">
            {performanceData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-text-secondary">
                  {item.grade}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Chart Actions */}
      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-sm text-text-secondary">
          {currentLanguage === 'en' ? 'Data updated 5 minutes ago' : 'تم تحديث البيانات منذ 5 دقائق'}
        </span>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log('Export chart')}
            iconName="Download"
          >
            {currentLanguage === 'en' ? 'Export' : 'تصدير'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log('Refresh chart')}
            iconName="RefreshCw"
          >
            {currentLanguage === 'en' ? 'Refresh' : 'تحديث'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;