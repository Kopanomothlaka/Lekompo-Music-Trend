export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export class CookieManager {
  private static readonly CONSENT_KEY = 'cookieConsent';
  private static readonly SESSION_KEY = 'session_id';
  private static readonly ANALYTICS_KEY = 'analytics_enabled';
  private static readonly MARKETING_KEY = 'marketing_enabled';
  private static readonly PREFERENCES_KEY = 'preferences_enabled';

  /**
   * Get user's cookie consent preferences
   */
  static getConsent(): CookiePreferences | null {
    try {
      const consent = localStorage.getItem(this.CONSENT_KEY);
      return consent ? JSON.parse(consent) : null;
    } catch (error) {
      console.error('Error reading cookie consent:', error);
      return null;
    }
  }

  /**
   * Save user's cookie consent preferences
   */
  static saveConsent(preferences: CookiePreferences): void {
    try {
      localStorage.setItem(this.CONSENT_KEY, JSON.stringify(preferences));
      this.initializeCookies(preferences);
    } catch (error) {
      console.error('Error saving cookie consent:', error);
    }
  }

  /**
   * Check if user has given consent
   */
  static hasConsent(): boolean {
    return this.getConsent() !== null;
  }

  /**
   * Initialize cookies based on user preferences
   */
  static initializeCookies(preferences: CookiePreferences): void {
    // Always set necessary cookies
    if (preferences.necessary) {
      this.setSessionCookie();
    }

    // Set analytics cookies if enabled
    if (preferences.analytics) {
      this.setAnalyticsCookie();
      this.initializeAnalytics();
    }

    // Set marketing cookies if enabled
    if (preferences.marketing) {
      this.setMarketingCookie();
    }

    // Set preference cookies if enabled
    if (preferences.preferences) {
      this.setPreferencesCookie();
    }
  }

  /**
   * Set session cookie for user identification
   */
  private static setSessionCookie(): void {
    const sessionId = Date.now().toString();
    this.setCookie(this.SESSION_KEY, sessionId, 3600); // 1 hour
  }

  /**
   * Set analytics cookie
   */
  private static setAnalyticsCookie(): void {
    this.setCookie(this.ANALYTICS_KEY, 'true', 31536000); // 1 year
  }

  /**
   * Set marketing cookie
   */
  private static setMarketingCookie(): void {
    this.setCookie(this.MARKETING_KEY, 'true', 31536000); // 1 year
  }

  /**
   * Set preferences cookie
   */
  private static setPreferencesCookie(): void {
    this.setCookie(this.PREFERENCES_KEY, 'true', 31536000); // 1 year
  }

  /**
   * Initialize analytics tracking
   */
  private static initializeAnalytics(): void {
    // Google Analytics consent update
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }

    // Custom analytics tracking
    this.trackEvent('cookie_consent', 'analytics_enabled');
  }

  /**
   * Track custom events
   */
  static trackEvent(eventName: string, eventValue?: string): void {
    // Send to analytics if enabled
    const consent = this.getConsent();
    if (consent?.analytics) {
      // Custom analytics implementation
      console.log('Analytics Event:', eventName, eventValue);
      
      // Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, {
          event_category: 'user_interaction',
          event_label: eventValue
        });
      }
    }
  }

  /**
   * Get cookie value by name
   */
  static getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }

  /**
   * Set cookie with proper attributes
   */
  static setCookie(name: string, value: string, maxAge: number): void {
    const cookieString = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Strict`;
    document.cookie = cookieString;
  }

  /**
   * Delete cookie
   */
  static deleteCookie(name: string): void {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict`;
  }

  /**
   * Get total number of cookies
   */
  static getCookieCount(): number {
    return document.cookie.split(';').filter(cookie => cookie.trim()).length;
  }

  /**
   * Clear all non-necessary cookies
   */
  static clearNonNecessaryCookies(): void {
    this.deleteCookie(this.ANALYTICS_KEY);
    this.deleteCookie(this.MARKETING_KEY);
    this.deleteCookie(this.PREFERENCES_KEY);
  }

  /**
   * Check if specific cookie type is enabled
   */
  static isEnabled(cookieType: keyof CookiePreferences): boolean {
    const consent = this.getConsent();
    return consent?.[cookieType] || false;
  }

  /**
   * Get user preferences for personalization
   */
  static getUserPreferences(): Record<string, any> {
    const preferences: Record<string, any> = {};
    
    if (this.isEnabled('preferences')) {
      // Load user preferences from cookies/localStorage
      const theme = localStorage.getItem('theme');
      const language = localStorage.getItem('language');
      const musicQuality = localStorage.getItem('musicQuality');
      
      if (theme) preferences.theme = theme;
      if (language) preferences.language = language;
      if (musicQuality) preferences.musicQuality = musicQuality;
    }
    
    return preferences;
  }

  /**
   * Save user preference
   */
  static saveUserPreference(key: string, value: string): void {
    if (this.isEnabled('preferences')) {
      localStorage.setItem(key, value);
    }
  }
} 