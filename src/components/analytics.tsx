'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

export function Analytics() {
  useEffect(() => {
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_path: window.location.pathname,
      });
    }
  }, []);

  return null;
}
