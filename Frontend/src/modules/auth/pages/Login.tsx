import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input, PasswordInput } from '@/shared/components';
import { useAuth } from '@/context/AuthContext';
import { useLoginMutation, useVerifyLoginMutation } from '../hooks/useMutationHooks/useMutate';
import { logger } from '@/services/logger';
import type { loginCredentials } from '../types/authService.types';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();
  const loginMutation = useLoginMutation();
  const verifyLoginMutation = useVerifyLoginMutation();
  const isLoading = loginMutation.isPending || verifyLoginMutation.isPending;

  const [formData, setFormData] = useState<loginCredentials>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<loginCredentials>>({});
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [otpCode, setOtpCode] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<loginCredentials> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof loginCredentials]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      logger.info('Login attempt:', formData.email);

      const response = await loginMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
      });

      // Check if OTP is required
      if (response.data?.otpRequired) {
        logger.info('OTP verification required');
        setUserId(response.data?.userId);
        setIsOtpStep(true);
        setErrors({});
        return;
      }

      // Set token in auth context if no OTP required
      const accessToken = response.data?.accessToken || response.data;
      if (accessToken) {
        setAccessToken(accessToken);
      }

      logger.info('Login successful');
      navigate('/dashboard');
    } catch (err: unknown) {
      logger.error('Login failed:', err);

      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };

      // Handle specific error messages from the API
      const errorMessage =
        error.response?.data?.message || error.message || 'Login failed. Please try again.';
      setErrors({ email: errorMessage });
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpCode.trim()) {
      setErrors({ password: 'OTP is required' });
      return;
    }

    if (otpCode.length < 6) {
      setErrors({ password: 'OTP must be 6 digits' });
      return;
    }

    if (!userId) {
      setErrors({ password: 'User ID not found. Please try login again.' });
      return;
    }

    try {
      logger.info('OTP verification attempt');

      const response = await verifyLoginMutation.mutateAsync({
        userId,
        otp: otpCode,
      });

      // Set token in auth context - response.data is the JWT token string
      const accessToken = response.data;
      if (accessToken) {
        setAccessToken(accessToken);
      }

      logger.info('OTP verification successful');
      navigate('/dashboard');
    } catch (err: unknown) {
      logger.error('OTP verification failed:', err);

      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };

      // Handle specific error messages from the API
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'OTP verification failed. Please try again.';
      setErrors({ password: errorMessage });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <div className="bg-transparent p-10 rounded-xl w-full max-w-lg">
        {/* Branding */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-amber-500 dark:text-amber-400 mb-6">Flowstack</h2>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {isOtpStep ? 'Verify OTP' : 'Welcome back'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isOtpStep ? 'Enter the OTP sent to your email' : 'Sign in to your dashboard'}
          </p>
        </div>

        {/* Login Form or OTP Form */}
        <form onSubmit={isOtpStep ? handleOtpSubmit : handleSubmit} className="space-y-5">
          {!isOtpStep ? (
            <>
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                fullWidth
                autoComplete="email"
                disabled={isLoading}
              />

              <PasswordInput
                id="password"
                name="password"
                label="Password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
                fullWidth
                autoComplete="current-password"
                disabled={isLoading}
              />

              {/* Remember me and Forgot Password */}
              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition"
                >
                  Forgot password?
                </Link>
              </div>
            </>
          ) : (
            <Input
              id="otp"
              name="otp"
              type="text"
              label="OTP Code"
              placeholder="Enter 6-digit OTP"
              value={otpCode}
              onChange={e => {
                setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                if (errors.password) {
                  setErrors(prev => ({
                    ...prev,
                    password: undefined,
                  }));
                }
              }}
              error={errors.password}
              required
              fullWidth
              disabled={isLoading}
              maxLength={6}
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 mt-6"
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
                {isOtpStep ? 'Verifying...' : 'Signing in...'}
              </span>
            ) : isOtpStep ? (
              'Verify OTP'
            ) : (
              'Sign in'
            )}
          </button>

          {/* Back Button for OTP Step */}
          {isOtpStep && (
            <button
              type="button"
              onClick={() => {
                setIsOtpStep(false);
                setUserId(null);
                setOtpCode('');
                setErrors({});
              }}
              className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors duration-200"
            >
              Back to Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
