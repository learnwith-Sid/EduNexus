import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HubConnectionBuilder } from '@microsoft/signalr';
import AppRoutes from './Routes';
import { useScript } from './hooks/useScript';

function AppContent() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [notifications, setNotifications] = useState([]);
  const [connection, setConnection] = useState(null);
  const isThreeJsLoaded = useScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');

  useEffect(() => {
    if (isLoggedIn && !connection) {
      const role = localStorage.getItem('role') || 'N/A';
      const newConnection = new HubConnectionBuilder()
        .withUrl(`http://localhost:5029/chatHub?role=${role}`)
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);
    }
  }, [isLoggedIn, connection]);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('Connected to SignalR Hub');
          connection.on('ReceiveNotification', (message, targetRole) => {
            console.log('🔔 Received Notification:', message, "Target:", targetRole);
            const userRole = localStorage.getItem('role');
            if (targetRole === "All" || targetRole === userRole) {
              setNotifications(prev => [message, ...prev]);
            }
          });
        })
        .catch(e => console.error('SignalR Connection Error: ', e));
      
      return () => {
        connection.stop();
      };
    }
  }, [connection]);

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    if (connection) connection.stop();
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/login');
  };

  if (!isThreeJsLoaded) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white text-xl font-semibold">
        Loading 3D Assets...
      </div>
    );
  }

  return (
    <AppRoutes 
      isLoggedIn={isLoggedIn} 
      handleLogin={handleLogin} 
      handleLogout={handleLogout}
      notifications={notifications}
      setNotifications={setNotifications}
    />
  );
}

function App() {
  return <AppContent />;
}

export default App;
