"use client";

import PWAStatus from '@/components/PWAStatus';
import OfflineIndicator from '@/components/OfflineIndicator';
import { useState } from 'react';

export default function PWATestPage() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">PWA Test Page</h1>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold">PWA Components Test</h2>
          
          <div className="space-y-2">
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors"
            >
              {showDemo ? 'Hide' : 'Show'} PWA Banner Demo
            </button>
            
            <div className="text-sm text-gray-600">
              <p>• Resize browser untuk test responsive</p>
              <p>• PWA banner muncul di mobile size</p>
              <p>• Banner positioned above bottom nav</p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Screen Size Info:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Width: <span className="font-mono">{typeof window !== 'undefined' ? window.innerWidth : 'N/A'}</span></p>
              <p>Height: <span className="font-mono">{typeof window !== 'undefined' ? window.innerHeight : 'N/A'}</span></p>
              <p>User Agent: <span className="font-mono text-xs">{typeof window !== 'undefined' ? navigator.userAgent.slice(0, 50) + '...' : 'N/A'}</span></p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">PWA Status:</h3>
            <div className="text-sm text-gray-600">
              <p>Standalone: {window.matchMedia('(display-mode: standalone)').matches ? '✅' : '❌'}</p>
              <p>Online: {navigator.onLine ? '✅' : '❌'}</p>
              <p>Service Worker: {typeof navigator !== 'undefined' && 'serviceWorker' in navigator ? '✅' : '❌'}</p>
            </div>
          </div>
        </div>
        
        {/* Simulated bottom navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 sm:hidden">
          <div className="flex justify-around">
            <div className="text-center">
              <div className="w-6 h-6 bg-gray-300 rounded mx-auto mb-1"></div>
              <span className="text-xs text-gray-600">Home</span>
            </div>
            <div className="text-center">
              <div className="w-6 h-6 bg-gray-300 rounded mx-auto mb-1"></div>
              <span className="text-xs text-gray-600">Materi</span>
            </div>
            <div className="text-center">
              <div className="w-6 h-6 bg-gray-300 rounded mx-auto mb-1"></div>
              <span className="text-xs text-gray-600">Profile</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* PWA Components */}
      <OfflineIndicator />
      {showDemo && (
        <div className="fixed left-0 right-0 bottom-20 sm:bottom-0 bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg z-40 mx-2 sm:mx-4 mb-2 sm:mb-4 rounded-lg">
          <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded flex-shrink-0"></div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-xs sm:text-sm truncate">Install KinderCare</p>
                <p className="text-xs opacity-75 truncate hidden sm:block">Akses seperti aplikasi native</p>
                <p className="text-xs opacity-75 truncate sm:hidden">Seperti app</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              <button className="bg-white text-pink-600 px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm font-medium">
                Install
              </button>
              <button
                onClick={() => setShowDemo(false)}
                className="text-white hover:text-gray-200 p-1"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
