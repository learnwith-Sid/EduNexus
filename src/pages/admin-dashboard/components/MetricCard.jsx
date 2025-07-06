import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'bg-success-50 text-success-600';
      case 'warning':
        return 'bg-warning-50 text-warning-600';
      case 'error':
        return 'bg-error-50 text-error-600';
      default:
        return 'bg-primary-50 text-primary-600';
    }
  };

  const getChangeColor = () => {
    return changeType === 'increase' ? 'text-success-600' : 'text-error-600';
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card border border-border hover-scale transition-smooth">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <p className="text-2xl font-semibold text-text-primary">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <Icon 
                name={changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={getChangeColor()}
              />
              <span className={`text-sm ml-1 ${getChangeColor()}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses()}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;