import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LandingPage from './LandingPage';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Dashboard from './Dashboard';
import AdminPanel from './AdminPanel';

type View = 'landing' | 'login' | 'register' | 'dashboard' | 'admin';

const AppLayout: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<View>('landing');

  // If user is authenticated, show appropriate dashboard
  if (isAuthenticated && user) {
    if (user.role === 'admin') {
      return <AdminPanel />;
    } else {
      return <Dashboard />;
    }
  }

  // Handle different views for non-authenticated users
  switch (currentView) {
    case 'login':
      return (
        <LoginForm
          onBack={() => setCurrentView('landing')}
          onRegisterClick={() => setCurrentView('register')}
        />
      );
    
    case 'register':
      return (
        <RegisterForm
          onBack={() => setCurrentView('landing')}
          onLoginClick={() => setCurrentView('login')}
        />
      );
    
    case 'landing':
    default:
      return (
        <LandingPage
          onLoginClick={() => setCurrentView('login')}
          onRegisterClick={() => setCurrentView('register')}
        />
      );
  }
};

export default AppLayout;