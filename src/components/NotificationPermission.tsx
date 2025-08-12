import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const NotificationPermission: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
      if (Notification.permission === 'default') {
        setShowBanner(true);
      }
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      setShowBanner(false);
    }
  };

  const dismissBanner = () => {
    setShowBanner(false);
  };

  if (!showBanner || permission !== 'default') {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-blue-900 mb-1">Enable Notifications</h3>
            <p className="text-sm text-blue-700 mb-3">
              Get real-time updates about your deliveries and booking status.
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={requestPermission} className="bg-blue-600 hover:bg-blue-700">
                Enable
              </Button>
              <Button size="sm" variant="outline" onClick={dismissBanner}>
                Dismiss
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={dismissBanner}
            className="h-6 w-6 p-0 text-blue-400 hover:text-blue-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationPermission;
