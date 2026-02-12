import React from 'react';
import { Link } from 'react-router-dom';
import { logger } from '@/services/logger';

const Welcome: React.FC = () => {
  logger.info('Welcome page rendered');

  return (
    <div className="min-h-screen ">
       {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Welcome to <span className="text-amber-600 dark:text-amber-400">FlowStack</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Task Management System - Organize, collaborate, and manage your projects efficiently
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Manage Tasks
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create, organize, and track tasks with ease
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Collaborate
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Work together with your team in real-time
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Track Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor project status and deadlines
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3 rounded-lg bg-amber-600 dark:bg-amber-500 text-white hover:bg-amber-600 transition-colors font-medium text-lg"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 rounded-lg bg-white dark:bg-gray-800 text-amber-600 dark:text-amber-400 border-2 border-amber-600 dark:border-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors font-medium text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
