import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, PasswordInput } from '@/shared/components';
import { useSignupMutation } from '../hooks/useMutationHooks/useMutate';
import { logger } from '@/services/logger';
import type { registerCredentials } from '../types/authService.types';
import { SignupSuccessModal } from '../components/modals/SignupSuccessModal';

const Register: React.FC = () => {
  const signupMutation = useSignupMutation();
  const isLoading = signupMutation.isPending;

  const [formData, setFormData] = useState<registerCredentials>({
    name: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<Partial<registerCredentials & { confirmPassword: string }>>(
    {}
  );
  const [signupSuccess, setSignupSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<registerCredentials & { confirmPassword: string }> = {};

    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
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
      logger.info('Registration attempt:', formData.email);

      await signupMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      logger.info('Registration successful');
      // Show success message - server sends verification email
      setSignupSuccess(true);
    } catch (err: unknown) {
      logger.error('Registration failed:', err);

      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };

      // Handle specific error messages from the API
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Registration failed. Please try again.';
      setErrors({ email: errorMessage });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4 py-8">
      {/* Success Modal Component */}
      <SignupSuccessModal 
        isOpen={signupSuccess} 
        email={formData.email} 
        onClose={() => setSignupSuccess(false)} 
      />

      {/* Registration Form Container */}
      <div className="bg-transparent p-10 rounded-xl  w-full max-w-lg">
        {/* Branding */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-amber-500 dark:text-amber-400 mb-6">Flowstack</h2>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Create account</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign up to get started</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="name"
            name="name"
            type="text"
            label="Full Name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
            fullWidth
            autoComplete="name"
            disabled={isLoading}
          />

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
            helperText="Must be at least 8 characters"
            required
            fullWidth
            autoComplete="new-password"
            disabled={isLoading}
          />

          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
            fullWidth
            autoComplete="new-password"
            disabled={isLoading}
          />

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
                Signing up...
              </span>
            ) : (
              'Sign up'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Already have an account?
            </span>
          </div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <Link
            to="/login"
            className="text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 font-medium transition"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
