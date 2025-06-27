import { useState, useEffect } from 'react';
import { CookieManager, CookiePreferences } from '@/lib/cookieUtils';

export const useCookies = () => {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = CookieManager.getConsent();
    setPreferences(consent);
    setHasConsent(consent !== null);
  }, []);

  const updatePreferences = (newPreferences: CookiePreferences) => {
    CookieManager.saveConsent(newPreferences);
    setPreferences(newPreferences);
    setHasConsent(true);
  };

  const trackEvent = (eventName: string, eventValue?: string) => {
    CookieManager.trackEvent(eventName, eventValue);
  };

  const isEnabled = (cookieType: keyof CookiePreferences): boolean => {
    return CookieManager.isEnabled(cookieType);
  };

  const getUserPreferences = () => {
    return CookieManager.getUserPreferences();
  };

  const saveUserPreference = (key: string, value: string) => {
    CookieManager.saveUserPreference(key, value);
  };

  const getCookieCount = () => {
    return CookieManager.getCookieCount();
  };

  return {
    preferences,
    hasConsent,
    updatePreferences,
    trackEvent,
    isEnabled,
    getUserPreferences,
    saveUserPreference,
    getCookieCount,
  };
}; 