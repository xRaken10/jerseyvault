import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3 text-gray-400 dark:text-gray-500 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'flex h-12 w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#0a0a0a] px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all',
            icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';
