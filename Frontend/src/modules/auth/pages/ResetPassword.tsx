import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { PasswordInput } from '@/shared/components';
import { useResetPasswordMutation } from '../hooks/useMutationHooks/useMutate';
import { logger } from '@/services/logger';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const resetPasswordMutation = useResetPasswordMutation();
  const isLoading = resetPasswordMutation.isPending;

  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Partial<typeof passwords>>({});
  const [showModal, setShowModal] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<typeof passwords> = {};

    if (!passwords.password) {
      newErrors.password = 'Password is required';
    } else if (passwords.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (passwords.password !== passwords.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!token) {
      setErrors({ password: 'Reset token is missing. Please request a new link.' });
      return;
    }

    try {
      logger.info('Reset password attempt');
      await resetPasswordMutation.mutateAsync({
        token,
        password: passwords.password,
      });
      
      setShowModal(true);
    } catch (err: unknown) {
      logger.error('Reset password failed:', err);
      const errorResponse = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage = errorResponse.response?.data?.message || errorResponse.message || 'Reset failed. Link may be expired.';
      setErrors({ password: errorMessage });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-transparent p-10 rounded-xl w-full max-w-lg">
        {/* Branding */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-amber-500 dark:text-amber-400 mb-6">Flowstack</h2>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Reset Password</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create a new password for your account
          </p>
        </div>

        {/* Form */}
        {!token ? (
          <div className="text-center space-y-4">
            <p className="text-red-500 font-medium">Reset link is invalid or missing token.</p>
            <Link
              to="/forgot-password"
              className="inline-block px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
            >
              Request New Link
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <PasswordInput
              id="password"
              name="password"
              label="New Password"
              placeholder="••••••••"
              value={passwords.password}
              onChange={(e) => {
                setPasswords(prev => ({ ...prev, password: e.target.value }));
                if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
              }}
              error={errors.password}
              required
              fullWidth
              disabled={isLoading}
            />

            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm New Password"
              placeholder="••••••••"
              value={passwords.confirmPassword}
              onChange={(e) => {
                setPasswords(prev => ({ ...prev, confirmPassword: e.target.value }));
                if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: undefined }));
              }}
              error={errors.confirmPassword}
              required
              fullWidth
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating Password...
                </span>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        )}
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 max-w-sm w-full shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Password Reset!</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Your password has been successfully updated. You can now log in with your new credentials.
              </p>
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate('/login');
                }}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-amber-500/20"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
