import React from 'react';
import Icon from '../AppIcon';

const NotificationModal = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-modal"
      onClick={onClose} // Close modal on overlay click
    >
      <div 
        className="bg-surface rounded-lg shadow-xl border border-border w-full max-w-lg m-4 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="p-6 border-b border-border flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center">
                <Icon name="Megaphone" size={20} />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-text-primary">{notification.title || 'Notification'}</h3>
                <p className="text-sm text-text-secondary">Sent to: {notification.targetRole || 'All'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary-50 text-text-secondary">
            <Icon name="X" size={20} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-text-primary whitespace-pre-wrap">{notification.message || 'No details available.'}</p>
        </div>
        <div className="p-4 bg-secondary-50 border-t border-border text-right">
            <button 
                onClick={onClose}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
