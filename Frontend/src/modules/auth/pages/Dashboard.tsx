import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="text-gray-900 dark:text-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Projects</h3>
          <p className="text-3xl font-bold text-amber-500">0</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Tasks</h3>
          <p className="text-3xl font-bold text-amber-500">0</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Activities</h3>
          <p className="text-3xl font-bold text-amber-500">0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
