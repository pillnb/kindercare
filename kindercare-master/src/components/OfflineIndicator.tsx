"use client";

import { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const updateOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      if (!online) {
        setShowOfflineMessage(true);
      } else {
        // Tunda hide message agar user sempat melihat status online
        setTimeout(() => setShowOfflineMessage(false), 2000);
      }
    };

    // Set initial status
    updateOnlineStatus();

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  if (!showOfflineMessage) {
    return null;
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 p-3 text-center text-sm font-medium transition-all duration-300 ${
      isOnline 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
    }`}>
      <div className="flex items-center justify-center space-x-2">
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4" />
            <span>Kembali online!</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span>Tidak ada koneksi internet</span>
          </>
        )}
      </div>
    </div>
  );
}
