import React from 'react';

const GeneralSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Account Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your application preferences</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</p>
              <p className="text-xs text-gray-500">Receive updates about your projects and tasks</p>
            </div>
            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-zinc-700">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
            <button className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
              Delete Account
            </button>
            <p className="mt-1 text-xs text-gray-500">Permanently remove your account and all associated data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
