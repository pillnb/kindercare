"use client";

import { useEffect, useState } from 'react';
import { WifiOff, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    window.location.reload();
  };

  useEffect(() => {
    // Auto retry when back online
    const handleOnline = () => {
      if (navigator.onLine) {
        window.location.reload();
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
            <WifiOff className="w-8 h-8 text-red-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Tidak Ada Koneksi
          </h1>
          
          <p className="text-gray-600 mb-8">
            Sepertinya Anda sedang offline. Periksa koneksi internet Anda dan coba lagi.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-5 h-5 ${isRetrying ? 'animate-spin' : ''}`} />
              <span>{isRetrying ? 'Mencoba ulang...' : 'Coba Lagi'}</span>
            </button>
            
            <Link
              href="/"
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>💡 Tip: Beberapa konten mungkin masih tersedia offline</p>
          </div>
        </div>
        
        <div className="mt-6 text-xs text-gray-400">
          <p>KinderCare - Aplikasi Progressive Web App</p>
        </div>
      </div>
    </div>
  );
}
