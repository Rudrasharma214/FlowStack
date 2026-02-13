import React from 'react';

interface SignupSuccessModalProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
}

export const SignupSuccessModal: React.FC<SignupSuccessModalProps> = ({ isOpen, email, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="rounded-lg shadow-2xl p-8 w-full max-w-md">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
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

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Account Created Successfully!
        </h2>

        {/* Email Sent Message */}
        <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
          A verification email has been sent to:
        </p>

        {/* User Email */}
        <p className="text-lg font-semibold text-center text-amber-500 dark:text-amber-400 mb-6">
          {email}
        </p>

        {/* Instructions */}
        <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-8">
          Please check your email and click on the verification link to activate your account. 
          Once verified, you can log in to your dashboard.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200 text-center"
          >
            Open Email
          </a>
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors duration-200"
          >
            Back to Registration
          </button>
        </div>
      </div>
    </div>
  );
};
