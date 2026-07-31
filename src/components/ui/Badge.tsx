import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'liga' | 'tipo';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-colors',
          {
            // default — neutral monochromatic
            'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300': variant === 'default',
            // liga — same monochromatic style, no blue
            'bg-gray-100 text-gray-700 border border-gray-200 dark:bg-white/[0.06] dark:text-gray-300 dark:border-white/10': variant === 'liga',
            // tipo — amber for retro feel, neutral fallback
            'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30': variant === 'tipo',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';
