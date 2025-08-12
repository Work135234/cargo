import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { messaging, getToken } from '../lib/firebase';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth data on app load
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');


    if (storedToken && storedUser) {
      try {
        let userData = JSON.parse(storedUser);
        // If userData has id but not _id, fix it
        if (userData.id && !userData._id) {
          userData._id = userData.id;
          delete userData.id;
          localStorage.setItem('user', JSON.stringify(userData));
        }
        setToken(storedToken);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (newToken: string, userData: any) => {
    // Always use _id for user
    let userObj = { ...userData };
    if (userObj.id && !userObj._id) {
      userObj._id = userObj.id;
      delete userObj.id;
    }
    setToken(newToken);
    setUser(userObj);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userObj));

    // Request FCM token and send to backend
    try {
      const fcmToken = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' });
      if (fcmToken) {
        await fetch('http://localhost:5000/api/auth/set-fcm-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${newToken}`,
          },
          body: JSON.stringify({ fcmToken }),
        });
      }
    } catch (err) {
      console.error('FCM token error:', err);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
