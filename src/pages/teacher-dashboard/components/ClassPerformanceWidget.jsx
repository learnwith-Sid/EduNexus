import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../../../components/ui/Button';


const ClassPerformanceWidget = ({ classData, currentLanguage }) => {
  const performanceData = [
    { name: currentLanguage === 'en' ? 'Math' : 'رياضيات', average: 85, students: 28 },
    { name: currentLanguage === 'en' ? 'Science' : 'علوم', average: 78, students: 25 },
    { name: currentLanguage === 'en' ? 'English' : 'إنجليزي', average: 82, students: 30 },
    { name: currentLanguage === 'en' ? 'History' : 'تاريخ', average: 76, students: 22 }
  ];

  const getPerformanceColor = (average) => {
    if (average >= 85) return 'text-success';
    if (average >= 75) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {currentLanguage === 'en' ? 'Class Performance' : 'أداء الفصل'}
        </h3>
        <Button variant="ghost" size="sm" iconName="TrendingUp">
          {currentLanguage === 'en' ? 'View Details' : 'عرض التفاصيل'}
        </Button>
      </div>

      <div className="space-y-4 mb-6">
        {performanceData.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Icon name="BookOpen" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{item.name}</p>
                <p className="text-xs text-text-secondary">
                  {item.students} {currentLanguage === 'en' ? 'students' : 'طلاب'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-lg font-semibold ${getPerformanceColor(item.average)}`}>
                {item.average}%
              </p>
              <p className="text-xs text-text-secondary">
                {currentLanguage === 'en' ? 'Average' : 'متوسط'}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Bar 
              dataKey="average" 
              fill="var(--color-primary)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClassPerformanceWidget;