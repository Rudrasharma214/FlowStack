import { forwardRef, type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
}

/**
 * Reusable Input Component
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   helperText="We'll never share your email"
 *   error={errors.email}
 *   required
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      fullWidth = false,
      variant = 'outlined',
      className = '',
      disabled = false,
      required = false,
      ...props
    },
    ref
  ) => {
    const baseInputClasses =
      'px-4 py-2.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2';

    const variantClasses = {
      outlined:
        'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20',
      filled:
        'border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 rounded-t-lg rounded-b-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20',
      standard:
        'border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 rounded-none px-0 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0',
    };

    const errorClasses = error
      ? 'border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500/20'
      : '';

    const disabledClasses = disabled
      ? 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-zinc-900'
      : '';

    const widthClasses = fullWidth ? 'w-full' : '';

    const inputClasses = `${baseInputClasses} ${variantClasses[variant]} ${errorClasses} ${disabledClasses} ${widthClasses} ${className}`;

    return (
      <div className={`flex flex-col ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          disabled={disabled}
          required={required}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined
          }
          {...props}
        />

        {error && (
          <span
            id={`${props.id}-error`}
            className="mt-1.5 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </span>
        )}

        {!error && helperText && (
          <span
            id={`${props.id}-helper`}
            className="mt-1.5 text-sm text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
