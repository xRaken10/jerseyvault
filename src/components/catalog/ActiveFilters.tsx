import { X } from 'lucide-react';
import type { CatalogFilters } from '../../types/catalog';
import { Badge } from '../ui/Badge';

interface ActiveFiltersProps {
  filters: CatalogFilters;
  onClear: () => void;
  onRemove: (key: keyof CatalogFilters) => void;
}

export function ActiveFilters({ filters, onClear, onRemove }: ActiveFiltersProps) {
  const hasActiveFilters = filters.liga || filters.equipo || filters.tipo || filters.query;

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Filtros activos:</span>
      
      {filters.query && (
        <Badge variant="default" className="flex items-center gap-1.5 py-1 px-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white cursor-pointer" onClick={() => onRemove('query')}>
          Búsqueda: {filters.query}
          <X className="w-3 h-3" />
        </Badge>
      )}
      
      {filters.liga && (
        <Badge variant="default" className="flex items-center gap-1.5 py-1 px-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white cursor-pointer" onClick={() => onRemove('liga')}>
          {filters.liga}
          <X className="w-3 h-3" />
        </Badge>
      )}

      {filters.equipo && (
        <Badge variant="default" className="flex items-center gap-1.5 py-1 px-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white cursor-pointer" onClick={() => onRemove('equipo')}>
          {filters.equipo}
          <X className="w-3 h-3" />
        </Badge>
      )}

      {filters.tipo && (
        <Badge variant="default" className="flex items-center gap-1.5 py-1 px-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white cursor-pointer" onClick={() => onRemove('tipo')}>
          {filters.tipo}
          <X className="w-3 h-3" />
        </Badge>
      )}

      <button 
        onClick={onClear}
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors ml-2 underline underline-offset-4"
      >
        Limpiar todo
      </button>
    </div>
  );
}
