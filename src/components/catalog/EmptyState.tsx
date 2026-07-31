import { SearchX } from 'lucide-react';
import { Button } from '../ui/Button';

interface EmptyStateProps {
  onClear: () => void;
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
        <SearchX className="w-10 h-10 text-gray-300 dark:text-gray-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No encontramos resultados</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8">
        No pudimos encontrar camisetas que coincidan con tus filtros. Intenta ajustar tu búsqueda o eliminar los filtros aplicados.
      </p>
      <Button variant="secondary" onClick={onClear}>
        Limpiar filtros
      </Button>
    </div>
  );
}
