import { Link } from 'react-router-dom';
import type { Liga } from '../../types/product';
import { cn } from '../../utils/cn';

interface LeagueLinkProps {
  liga: Liga;
  collectionId: string;
  index: number;
}

function LeagueLink({ liga, collectionId, index }: LeagueLinkProps) {
  return (
    <Link
      to={`/coleccion/${collectionId}`}
      className={cn(
        'group flex items-center justify-between py-5 border-b border-gray-100 dark:border-white/10',
        'hover:border-gray-900 dark:hover:border-white/40 transition-colors duration-300'
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:translate-x-2 transition-transform duration-300">
        {liga}
      </span>
      <span className="flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
        Ver colección →
      </span>
    </Link>
  );
}

const LIGAS: { liga: Liga; id: string }[] = [
  { liga: 'Premier League', id: 'premier-league' },
  { liga: 'La Liga', id: 'la-liga' },
  { liga: 'Serie A', id: 'serie-a' },
  { liga: 'Bundesliga', id: 'bundesliga' },
  { liga: 'Ligue 1', id: 'ligue-1' },
  { liga: 'Liga MX', id: 'liga-mx' },
];

export function LeagueNav() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="sticky top-24">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
            Explora por liga
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white leading-tight">
            Las mejores<br />ligas del mundo.
          </h2>
          <p className="mt-6 text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
            Filtra por competición y encuentra exactamente la camiseta de tu equipo favorito.
          </p>
        </div>
        <div>
          {LIGAS.map(({ liga, id }, i) => (
            <LeagueLink key={liga} liga={liga} collectionId={id} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
