import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVerifyEmailMutation } from '../hooks/useMutationHooks/useMutate';
import { logger } from '@/services/logger';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const { mutate, isPending, isSuccess, isError, error } = useVerifyEmailMutation();

  useEffect(() => {
    if (!token) {
      logger.error('No token provided for email verification');
      return;
    }

    logger.info('Verifying email with token');
    mutate(token);
  }, [token, mutate]);

  const handleGoToLogin = () => {
    navigate('/login', {
      state: {
        message: 'Email verified successfully! Please log in with your credentials.',
      },
    });
  };

  return (
    <div className="m-30 flex items-center justify-center bg-transparent ">
      <div className="w-full max-w-md">
        <div className=" dark:bg-zinc-800 rounded-lg ">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Email Verification
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isPending ? 'Verifying your email...' : ''}
              {isSuccess ? 'Your email has been verified!' : ''}
              {isError ? 'Verification failed' : ''}
            </p>
          </div>

          {/* Loading State */}
          {isPending && (
            <div className="flex justify-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-gray-200 dark:border-zinc-700 border-t-amber-500 rounded-full animate-spin"></div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Please wait while we verify your email...
                </p>
              </div>
            </div>
          )}

          {/* Success State */}
          {isSuccess && (
            <div className="flex flex-col items-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Verification Successful!
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Your email has been verified successfully. You can now log in to your account.
                </p>
              </div>

              <button
                onClick={handleGoToLogin}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Go to Login
              </button>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="flex flex-col items-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Verification Failed
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {error instanceof Error
                    ? error.message
                    : 'Your email verification link may have expired or is invalid. Please try again.'}
                </p>
              </div>

              <div className="flex flex-col space-y-3 w-full">
                <button
                  onClick={handleGoToLogin}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Back to Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="w-full bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 text-gray-900 dark:text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Register Again
                </button>
              </div>
            </div>
          )}

          {/* No Token State */}
          {!token && !isPending && !isSuccess && !isError && (
            <div className="flex flex-col items-center space-y-6">
              <div className="flex justify-center">
                {/* <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4v2m0 4v2M7.08 6.47A9.002 9.002 0 1017 15H2.5a9 9 0 015.08-8.53"
                    />
                  </svg>
                </div> */}
              </div>

              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Invalid Link
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  The verification link is missing or invalid. Please check your email and try
                  again.
                </p>
              </div>

              <div className="flex flex-col space-y-3 w-full">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Back to Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="w-full bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 text-gray-900 dark:text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Register Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
