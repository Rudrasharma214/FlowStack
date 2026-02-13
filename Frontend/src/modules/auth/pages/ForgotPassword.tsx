import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/shared/components';
import { useForgotPasswordMutation } from '../hooks/useMutationHooks/useMutate';
import { logger } from '@/services/logger';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const forgotPasswordMutation = useForgotPasswordMutation();
  const isLoading = forgotPasswordMutation.isPending;

  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    try {
      logger.info('Forgot password attempt for:', email);
      const response = await forgotPasswordMutation.mutateAsync(email);
      
      setModalMessage(response.message || 'If an account exists with that email, a reset link has been sent.');
      setShowModal(true);
    } catch (err: unknown) {
      logger.error('Forgot password failed:', err);
      const errorResponse = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage = errorResponse.response?.data?.message || errorResponse.message || 'Something went wrong. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-vh-100 min-h-screen px-4">
      <div className="bg-transparent p-10 rounded-xl w-full max-w-lg">
        {/* Branding */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-amber-500 dark:text-amber-400 mb-6">Flowstack</h2>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Forgot Password</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your email to receive a password reset link
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            error={error || undefined}
            required
            fullWidth
            autoComplete="email"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending Link...
              </span>
            ) : (
              'Send Reset Link'
            )}
          </button>

          <div className="text-center mt-6">
            <Link
              to="/login"
              className="text-sm font-medium text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 max-w-sm w-full shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-amber-600 dark:text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Check your email</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {modalMessage}
              </p>
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate('/login');
                }}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-amber-500/20"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
