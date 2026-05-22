import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getToken, getUser, clearSession } from '../storage/auth-storage';
import { setAuthToken } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userRole: 'buyer' | 'broker';
  user: any | null;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'buyer' | 'broker'>('buyer');
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function checkAuth() {
    try {
      const token = await getToken();
      const userData = await getUser();
      
      setIsAuthenticated(!!token);
      setUser(userData);
      
      if (token) {
        setAuthToken(token);
      }
      
      if (userData?.role) {
        setUserRole(userData.role === 'CORRETOR' ? 'broker' : 'buyer');
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    setAuthToken(null);
    await clearSession();
    setIsAuthenticated(false);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, userRole, user, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
