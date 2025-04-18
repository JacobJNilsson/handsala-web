'use client';

import { useEffect, useState } from 'react';

export default function LoadingIndicator() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Create a custom event for when the loading state changes
    const startLoading = () => setIsLoading(true);
    const stopLoading = () => {
      // Use a small delay to make transitions smoother
      setTimeout(() => setIsLoading(false), 300);
    };

    // Listen for route changes
    window.addEventListener('beforeunload', startLoading);
    window.addEventListener('routeChangeStart', startLoading);
    window.addEventListener('routeChangeComplete', stopLoading);
    window.addEventListener('routeChangeError', stopLoading);

    return () => {
      window.removeEventListener('beforeunload', startLoading);
      window.removeEventListener('routeChangeStart', startLoading);
      window.removeEventListener('routeChangeComplete', stopLoading);
      window.removeEventListener('routeChangeError', stopLoading);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#6495ED', // cornflowerBlue
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-b-4 border-white rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
