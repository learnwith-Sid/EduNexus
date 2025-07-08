import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { getAnnouncementsByRole } from '../../../services/announcementService'; // Adjust path as needed
import { formatDistanceToNow } from 'date-fns'; // Using date-fns for relative time
import Button from '../../../components/ui/Button';
import NotificationModal from '../../../components/ui/NotificationModal'; // Import the modal

// Skeleton component for the loading state
const NotificationSkeleton = () => (
    <div className="flex items-center space-x-4 p-3">
        <div className="w-10 h-10 rounded-full bg-secondary-100 animate-pulse flex-shrink-0"></div>
        <div className="flex-1 space-y-2">
            <div className="h-5 bg-secondary-100 rounded w-3/4 animate-pulse"></div>
            <div className="h-3 bg-secondary-100 rounded w-1/2 animate-pulse"></div>
        </div>
    </div>
);

// Component for the empty state
const EmptyState = () => (
    <div className="text-center py-8">
        <div className="w-16 h-16 bg-secondary-50 text-secondary-400 rounded-full mx-auto flex items-center justify-center mb-4">
            <Icon name="BellOff" size={32} />
        </div>
        <h4 className="text-md font-semibold text-text-primary">No Announcements Yet</h4>
        <p className="text-sm text-text-secondary mt-1">New announcements will appear here.</p>
    </div>
);


const NotificationsPanel = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null); // State for modal

  useEffect(() => {
    const loadAnnouncements = async () => {
      setIsLoading(true);
      const role = localStorage.getItem('role');
      if (role) {
        const data = await getAnnouncementsByRole(role);
        // Display the latest 5 announcements
        setAnnouncements(data.slice(0, 5)); 
      }
      setIsLoading(false);
    };
    loadAnnouncements();
  }, []);

  const handleNotificationClick = (announcement) => {
    setSelectedNotification(announcement);
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  const formatTimestamp = (dateString) => {
    try {
        return `${formatDistanceToNow(new Date(dateString))} ago`;
    } catch (error) {
        return "some time ago";
    }
  };

  return (
    <>
      <div className="bg-surface rounded-lg p-6 shadow-card border border-border flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Latest Announcements</h3>
          <Icon name="Megaphone" size={20} className="text-accent-500" />
        </div>
        {/* Added a max-height and overflow-y-auto to this container */}
        <div className="space-y-2 flex-grow min-h-0 max-h-80 overflow-y-auto">
          {isLoading ? (
            <>
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
            </>
          ) : announcements.length > 0 ? (
            announcements.map((ann) => (
              <div 
                key={ann.id} 
                className="flex items-center space-x-4 p-3 rounded-lg border border-transparent hover:bg-secondary-50 hover:border-border transition-all duration-200 cursor-pointer"
                onClick={() => handleNotificationClick(ann)} // Open modal on click
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-50 text-primary-600 flex-shrink-0">
                  <Icon name="Bell" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  {/* Updated Layout: Title is larger, timestamp is below, message is removed */}
                  <h4 className="text-base font-semibold text-text-primary">{ann.title}</h4>
                  <p className="text-xs text-text-secondary mt-1">
                      {formatTimestamp(ann.createdAt)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <EmptyState />
          )}
        </div>
        {announcements.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
              <Button
                  variant="outline"
                  onClick={() => console.log('Navigate to all announcements')}
                  className="w-full"
              >
                  View All Announcements
              </Button>
          </div>
        )}
      </div>
      {/* Render the modal */}
      <NotificationModal notification={selectedNotification} onClose={handleCloseModal} />
    </>
  );
};

export default NotificationsPanel;
