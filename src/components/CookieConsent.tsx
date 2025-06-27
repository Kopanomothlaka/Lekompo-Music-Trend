import React, { useState, useEffect } from 'react';
import { X, Settings, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CookieManager, CookiePreferences } from '@/lib/cookieUtils';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: any) => void;
  }
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = CookieManager.getConsent();
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      setPreferences(savedConsent);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setPreferences(allAccepted);
    CookieManager.saveConsent(allAccepted);
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setPreferences(necessaryOnly);
    CookieManager.saveConsent(necessaryOnly);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    CookieManager.saveConsent(preferences);
    setShowSettings(false);
  };

  const getCookieCount = () => {
    return CookieManager.getCookieCount();
  };

  if (!showBanner) {
    return null;
  }

  return (
    <>
      {/* Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 z-50 animate-slide-up">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <h3 className="text-white font-semibold">We use cookies to enhance your experience</h3>
              </div>
              <p className="text-gray-300 text-sm">
                We use cookies and similar tracking technologies to remember your preferences, analyze website traffic, 
                provide personalized content, and improve our services. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-400"
              >
                <Settings className="h-4 w-4 mr-2" />
                Customize
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAcceptNecessary}
                className="border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400"
              >
                Necessary Only
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="spotify-green text-black font-semibold hover:scale-105"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Cookie Preferences
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <p className="text-gray-300">
              Manage your cookie preferences below. You can change these settings at any time.
            </p>

            {/* Necessary Cookies */}
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Label className="text-white font-semibold">Necessary Cookies</Label>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">Always Active</span>
                </div>
                <p className="text-gray-400 text-sm">
                  These cookies are essential for the website to function properly. They cannot be disabled.
                </p>
              </div>
              <Switch checked={preferences.necessary} disabled />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Label className="text-white font-semibold">Analytics Cookies</Label>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">Optional</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, analytics: checked }))
                }
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Label className="text-white font-semibold">Marketing Cookies</Label>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">Optional</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Used to track visitors across websites to display relevant and engaging advertisements.
                </p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, marketing: checked }))
                }
              />
            </div>

            {/* Preference Cookies */}
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Label className="text-white font-semibold">Preference Cookies</Label>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">Optional</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Allow the website to remember information that changes the way it behaves or looks.
                </p>
              </div>
              <Switch
                checked={preferences.preferences}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, preferences: checked }))
                }
              />
            </div>

            {/* Current Cookie Count */}
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-300 text-sm">
                <strong>Current cookies:</strong> {getCookieCount()} cookies are currently active on this site.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowSettings(false)}
                className="flex-1 border-gray-600 text-gray-300 hover:border-gray-500"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSavePreferences}
                className="flex-1 spotify-green text-black font-semibold"
              >
                <Check className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent; 