import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventsCalendar = () => {
  const events = [
    { id: 1, title: 'Parent-Teacher Conference', date: new Date(2024, 11, 15), time: '9:00 AM - 5:00 PM', type: 'meeting', priority: 'high' },
    { id: 2, title: 'Science Fair', date: new Date(2024, 11, 18), time: '10:00 AM - 3:00 PM', type: 'event', priority: 'medium' },
    { id: 3, title: 'Final Exams Begin', date: new Date(2024, 11, 20), time: '8:00 AM', type: 'exam', priority: 'high' },
    { id: 4, title: 'Winter Break Starts', date: new Date(2024, 11, 22), time: 'All Day', type: 'holiday', priority: 'low' },
    { id: 5, title: 'Staff Meeting', date: new Date(2024, 11, 16), time: '3:30 PM - 4:30 PM', type: 'meeting', priority: 'medium' }
  ];

  const upcomingEvents = events.filter(event => event.date >= new Date()).sort((a, b) => a.date - b.date).slice(0, 5);

  const getEventTypeStyles = (type) => {
    switch (type) {
      case 'exam': return { bg: 'bg-error-50', text: 'text-error-600', icon: 'FileText' };
      case 'meeting': return { bg: 'bg-primary-50', text: 'text-primary-600', icon: 'Users' };
      case 'event': return { bg: 'bg-success-50', text: 'text-success-600', icon: 'Calendar' };
      case 'holiday': return { bg: 'bg-warning-50', text: 'text-warning-600', icon: 'Sun' };
      default: return { bg: 'bg-secondary-50', text: 'text-secondary-600', icon: 'Calendar' };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error-500';
      case 'medium': return 'bg-warning-500';
      case 'low': return 'bg-success-500';
      default: return 'bg-secondary-500';
    }
  };

  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Upcoming Events</h3>
        <Icon name="Calendar" size={20} className="text-accent-500" />
      </div>
      
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {upcomingEvents.map((event) => {
          const styles = getEventTypeStyles(event.type);
          return (
            <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-secondary-50 transition-smooth">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${styles.bg}`}>
                <Icon name={styles.icon} size={18} className={styles.text} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-text-primary truncate">{event.title}</h4>
                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(event.priority)}`} />
                </div>
                <div className="flex items-center space-x-2 text-xs text-text-secondary">
                  <span>{formatDate(event.date)}</span>
                  <span>•</span>
                  <span>{event.time}</span>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border space-y-3">
        <Button variant="outline" onClick={() => console.log('View calendar')} className="w-full">View Full Calendar</Button>
        <Button variant="ghost" onClick={() => console.log('Add event')} className="w-full" iconName="Plus" iconPosition="left">Add Event</Button>
      </div>
    </div>
  );
};

export default EventsCalendar;
