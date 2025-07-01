"use client";

import { useEffect, useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export default function PWAStatus() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Cek apakah app sudah diinstall/berjalan dalam mode standalone
    const checkStandalone = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              (window.navigator as any).standalone === true ||
                              document.referrer.includes('android-app://');
      setIsStandalone(isStandaloneMode);
      setIsInstalled(isStandaloneMode);
    };

    checkStandalone();

    // Listen untuk event beforeinstallprompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Tampilkan banner install jika belum installed dan belum ditutup user
      const bannerDismissed = localStorage.getItem('pwa-banner-dismissed');
      if (!isInstalled && !bannerDismissed) {
        setShowInstallBanner(true);
      }
    };

    // Listen untuk event appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
      localStorage.removeItem('pwa-banner-dismissed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted PWA install');
      } else {
        console.log('User dismissed PWA install');
      }
      
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    } catch (error) {
      console.error('Error during PWA install:', error);
    }
  };

  const handleDismissBanner = () => {
    setShowInstallBanner(false);
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  // Jangan tampilkan apapun jika sudah installed
  if (isInstalled || isStandalone) {
    return null;
  }

  // Banner install - Compact untuk mobile dengan spacing untuk bottom nav
  if (showInstallBanner && deferredPrompt) {
    return (
      <div className="fixed left-0 right-0 bottom-20 sm:bottom-0 bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg z-40 mx-2 sm:mx-4 mb-2 sm:mb-4 rounded-lg">
        <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-xs sm:text-sm truncate">Install KinderCare</p>
              <p className="text-xs opacity-75 truncate hidden sm:block">Akses seperti aplikasi native</p>
              <p className="text-xs opacity-75 truncate sm:hidden">Seperti app</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <button
              onClick={handleInstallClick}
              className="bg-white text-pink-600 px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors flex items-center space-x-1"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Install</span>
            </button>
            <button
              onClick={handleDismissBanner}
              className="text-white hover:text-gray-200 transition-colors p-1"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Hook untuk mendapatkan status PWA
export function usePWAStatus() {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkStandalone = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (window.navigator as any).standalone === true ||
                        document.referrer.includes('android-app://');
      setIsStandalone(standalone);
      setIsInstalled(standalone);
    };

    const checkOnline = () => {
      setIsOnline(navigator.onLine);
    };

    checkStandalone();
    checkOnline();

    window.addEventListener('online', checkOnline);
    window.addEventListener('offline', checkOnline);

    return () => {
      window.removeEventListener('online', checkOnline);
      window.removeEventListener('offline', checkOnline);
    };
  }, []);

  return { isInstalled, isStandalone, isOnline };
}
