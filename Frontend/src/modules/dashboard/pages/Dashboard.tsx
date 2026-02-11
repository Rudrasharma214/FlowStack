import React from 'react';
import { logger } from '@/services/logger';

const Dashboard: React.FC = () => {
  logger.info('Dashboard page rendered');
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-400">Dashboard page content goes here</p>
    </div>
  );
};

export default Dashboard;
