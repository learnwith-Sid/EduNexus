import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceChart = () => {
  const [activeChart, setActiveChart] = useState('enrollment');

  const enrollmentData = [
    { month: 'Jan', students: 1200, teachers: 45 }, { month: 'Feb', students: 1250, teachers: 47 },
    { month: 'Mar', students: 1280, teachers: 48 }, { month: 'Apr', students: 1320, teachers: 50 },
    { month: 'May', students: 1350, teachers: 52 }, { month: 'Jun', students: 1380, teachers: 53 }
  ];
  const attendanceData = [
    { day: 'Mon', rate: 92 }, { day: 'Tue', rate: 88 }, { day: 'Wed', rate: 95 },
    { day: 'Thu', rate: 91 }, { day: 'Fri', rate: 87 }, { day: 'Sat', rate: 93 }
  ];
  const performanceData = [
    { grade: 'Excellent', value: 35, color: '#059669' }, { grade: 'Good', value: 40, color: '#3B82F6' },
    { grade: 'Average', value: 20, color: '#F59E0B' }, { grade: 'Below Average', value: 5, color: '#DC2626' }
  ];
  const chartOptions = [
    { id: 'enrollment', title: 'Enrollment Trends', icon: 'TrendingUp' },
    { id: 'attendance', title: 'Attendance Patterns', icon: 'UserCheck' },
    { id: 'performance', title: 'Academic Performance', icon: 'BarChart3' }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'enrollment': return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={enrollmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={{ stroke: '#E2E8F0' }} />
            <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={{ stroke: '#E2E8F0' }} />
            <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px' }} />
            <Bar dataKey="students" fill="#3B82F6" name="Students" radius={[4, 4, 0, 0]} />
            <Bar dataKey="teachers" fill="#059669" name="Teachers" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
      case 'attendance': return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={{ stroke: '#E2E8F0' }} />
            <YAxis domain={[80, 100]} tick={{ fontSize: 12, fill: '#64748B' }} axisLine={{ stroke: '#E2E8F0' }} />
            <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px' }} formatter={(value) => [`${value}%`, 'Attendance Rate']} />
            <Line type="monotone" dataKey="rate" stroke="#F59E0B" strokeWidth={3} dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }} activeDot={{ r: 8, stroke: '#F59E0B', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      );
      case 'performance': return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={performanceData} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={5} dataKey="value">
              {performanceData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px' }} formatter={(value) => [`${value}%`, 'Students']} />
          </PieChart>
        </ResponsiveContainer>
      );
      default: return null;
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Analytics Dashboard</h3>
        <Icon name="BarChart3" size={20} className="text-accent-500" />
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {chartOptions.map((option) => (
          <Button key={option.id} variant={activeChart === option.id ? 'primary' : 'outline'} size="sm" onClick={() => setActiveChart(option.id)} iconName={option.icon} iconPosition="left">{option.title}</Button>
        ))}
      </div>
      <div className="w-full" aria-label={`${chartOptions.find(opt => opt.id === activeChart)?.title} Chart`}>
        {renderChart()}
      </div>
      {activeChart === 'performance' && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4">
            {performanceData.map((item, index) => (<div key={index} className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} /><span className="text-sm text-text-secondary">{item.grade}: {item.value}%</span></div>))}
          </div>
        </div>
      )}
      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-sm text-text-secondary">Data updated 5 minutes ago</span>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => console.log('Export chart')} iconName="Download">Export</Button>
          <Button variant="ghost" size="sm" onClick={() => console.log('Refresh chart')} iconName="RefreshCw">Refresh</Button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
