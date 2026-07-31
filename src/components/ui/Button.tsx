import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
          {
            'bg-black text-white hover:bg-gray-800 focus:ring-black dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus:ring-white shadow-sm hover:shadow-md': variant === 'primary',
            'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:focus:ring-white/20': variant === 'secondary',
            'bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white': variant === 'ghost',
            'h-9 px-4 text-sm': size === 'sm',
            'h-12 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
            'w-full': fullWidth,
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
