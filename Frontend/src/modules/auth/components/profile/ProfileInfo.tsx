import React from 'react';
import { useAuth } from '@/context/AuthContext/useAuth';

const ProfileInfo: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">View your basic account details</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-4 border-b border-gray-100 dark:border-zinc-800 pb-6">
            <div className="shrink-0">
              {user?.profile_pic ? (
                <img
                  src={user.profile_pic}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-500"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-xl">
                  {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Profile Photo</p>
              <p className="text-xs text-gray-500">Your profile picture is visible to everyone</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-gray-100 dark:border-zinc-800 pb-4">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</div>
            <div className="sm:col-span-2 text-sm text-gray-900 dark:text-white font-medium">
              {user?.name || 'Not provided'}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-gray-100 dark:border-zinc-800 pb-4">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</div>
            <div className="sm:col-span-2 text-sm text-gray-900 dark:text-white font-medium">
              {user?.email}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-gray-100 dark:border-zinc-800 pb-4">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Role</div>
            <div className="sm:col-span-2 text-sm text-gray-900 dark:text-white">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 uppercase tracking-wider">
                {user?.role || 'User'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</div>
            <div className="sm:col-span-2 text-sm text-gray-900 dark:text-white">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
