import React from 'react';
import { logger } from '@/services/logger';

const Login: React.FC = () => {
  logger.info('Login page rendered');
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Login</h1>
        <p className="text-gray-600 dark:text-gray-400">Login page content goes here</p>
      </div>
    </div>
  );
};

export default Login;
