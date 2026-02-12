import React, { useState } from 'react';
import { PasswordInput } from '@/shared/components';
import { useChangePasswordMutation } from '../../hooks/useMutationHooks/useMutate';
import { handleError } from '@/services/errorHandler';

const ChangePassword: React.FC = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { mutate: changePassword, isPending } = useChangePasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validation
    if (!passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword) {
      setMessage({ type: 'error', text: 'All fields are required' });
      return;
    }

    if (passwords.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters' });
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    changePassword(
      {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      },
      {
        onSuccess: () => {
          setMessage({ type: 'success', text: 'Password updated successfully' });
          setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
        },
        onError: (error) => {
          const appError = handleError(error);
          setMessage({ type: 'error', text: appError.message });
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Security</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your password and account security</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {message && (
            <div
              className={`p-3 rounded-lg text-sm font-medium ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border border-green-100 dark:border-green-800'
                  : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <PasswordInput
            label="Current Password"
            placeholder="••••••••"
            value={passwords.oldPassword}
            onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
            fullWidth
            required
            disabled={isPending}
          />

          <PasswordInput
            label="New Password"
            placeholder="••••••••"
            value={passwords.newPassword}
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
            fullWidth
            required
            disabled={isPending}
          />

          <PasswordInput
            label="Confirm New Password"
            placeholder="••••••••"
            value={passwords.confirmPassword}
            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
            fullWidth
            required
            disabled={isPending}
          />

          <div className="pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isPending && (
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              <span>{isPending ? 'Updating...' : 'Update Password'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
