import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get role from location state or query param
  let defaultRole = 'Customer';
  if (location.state && location.state.role) {
    defaultRole = location.state.role;
  } else if (location.search) {
    const params = new URLSearchParams(location.search);
    if (params.get('role')) defaultRole = params.get('role')!;
  }

  const handleRegisterSuccess = (token: string, user: any) => {
    login(token, user);
    navigate('/dashboard');
  };

  const handleSwitchToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary rounded-full p-4 mb-4">
            <svg
              className="h-10 w-10 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-center">Welcome to CargoStream</h1>
          <h2 className="text-xl font-semibold text-center mt-2">Create account</h2>
          <p className="text-muted-foreground text-center mt-2">
            Enter your information to create your account
          </p>
        </div>
        <RegisterForm
          onRegisterSuccess={handleRegisterSuccess}
          onSwitchToLogin={handleSwitchToLogin}
          defaultRole={defaultRole}
        />
      </div>
    </div>
  );
};

export default Register;
