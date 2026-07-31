import type { HTMLAttributes } from 'react';
import { APP_CONFIG, type Talla } from '../../config/app.config';
import { cn } from '../../utils/cn';

interface TallaSelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  selectedTalla: Talla | null;
  onChange: (talla: Talla) => void;
}

export function TallaSelector({ selectedTalla, onChange, className, ...props }: TallaSelectorProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)} {...props}>
      <label className="text-sm font-medium text-gray-900 dark:text-white">
        Talla <span className="text-gray-500 dark:text-gray-400 font-normal">(Americana)</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {APP_CONFIG.tallas.map(talla => {
          const isSelected = selectedTalla === talla;
          return (
            <button
              key={talla}
              type="button"
              onClick={() => onChange(talla)}
              className={cn(
                'h-12 w-16 rounded-lg border font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-[#0a0a0a] active:scale-95',
                isSelected
                  ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-md'
                  : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:bg-gray-50 dark:border-white/10 dark:bg-transparent dark:text-gray-300 dark:hover:border-white/30 dark:hover:bg-white/5'
              )}
            >
              {talla}
            </button>
          );
        })}
      </div>
    </div>
  );
}
