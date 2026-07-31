import type { Liga, TipoManga } from '../../types/product';
import { cn } from '../../utils/cn';

interface FilterSidebarProps {
  ligas: Liga[];
  equipos: string[];
  selectedLiga: Liga | null;
  selectedEquipo: string | null;
  selectedTipo: TipoManga | null;
  onFilterChange: <K extends 'liga' | 'equipo' | 'tipo'>(key: K, value: any) => void;
}

export function FilterSidebar({
  ligas,
  equipos,
  selectedLiga,
  selectedEquipo,
  selectedTipo,
  onFilterChange
}: FilterSidebarProps) {
  const tiposManga: TipoManga[] = ['Manga corta', 'Manga larga'];

  return (
    <div className="flex flex-col gap-8">
      {/* Liga */}
      <div>
          <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
          Ligas
        </h3>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => onFilterChange('liga', null)}
              aria-pressed={selectedLiga === null}
              className={cn(
                "text-sm transition-colors text-left w-full",
                  selectedLiga === null ? "text-black dark:text-white font-semibold" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              )}
            >
              Todas las ligas
            </button>
          </li>
          {ligas.map(liga => (
            <li key={liga}>
              <button
                onClick={() => onFilterChange('liga', liga)}
                aria-pressed={selectedLiga === liga}
                className={cn(
                  "text-sm transition-colors text-left w-full",
                  selectedLiga === liga ? "text-black dark:text-white font-semibold" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                )}
              >
                {liga}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tipo de Manga */}
      <div>
          <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
          Tipo de manga
        </h3>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => onFilterChange('tipo', null)}
              aria-pressed={selectedTipo === null}
              className={cn(
                "text-sm transition-colors text-left w-full",
                  selectedTipo === null ? "text-black dark:text-white font-semibold" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              )}
            >
              Todos los tipos
            </button>
          </li>
          {tiposManga.map(tipo => (
            <li key={tipo}>
              <button
                onClick={() => onFilterChange('tipo', tipo)}
                aria-pressed={selectedTipo === tipo}
                className={cn(
                  "text-sm transition-colors text-left w-full",
                  selectedTipo === tipo ? "text-black dark:text-white font-semibold" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                )}
              >
                {tipo}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Equipo (only if a liga is selected) */}
      {selectedLiga && equipos.length > 0 && (
        <div>
            <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
            Equipos
          </h3>
          <ul className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            <li>
              <button
                onClick={() => onFilterChange('equipo', null)}
                aria-pressed={selectedEquipo === null}
                className={cn(
                  "text-sm transition-colors text-left w-full",
                  selectedEquipo === null ? "text-black dark:text-white font-semibold" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                )}
              >
                Todos los equipos
              </button>
            </li>
            {equipos.map(equipo => (
              <li key={equipo}>
                <button
                  onClick={() => onFilterChange('equipo', equipo)}
                  aria-pressed={selectedEquipo === equipo}
                  className={cn(
                    "text-sm transition-colors text-left w-full",
                    selectedEquipo === equipo ? "text-black dark:text-white font-semibold" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                  )}
                >
                  {equipo}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
