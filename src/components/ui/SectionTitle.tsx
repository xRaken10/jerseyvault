import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionTitle({ title, subtitle, centered, className, ...props }: SectionTitleProps) {
  return (
    <div className={cn('flex flex-col gap-2', centered && 'items-center text-center', className)} {...props}>
      <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tighter text-gray-900 dark:text-white leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl font-medium leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
