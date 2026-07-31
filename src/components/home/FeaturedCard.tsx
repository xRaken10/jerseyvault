import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getProducts } from '../../services/catalog.service';
import type { Product } from '../../types/product';
import type { Liga } from '../../types/product';
import { ProductCard } from '../catalog/ProductCard';

const FEATURED_LIGAS: Liga[] = ['La Liga', 'Premier League', 'Serie A', 'Bundesliga', 'Ligue 1', 'Liga MX'];

interface LigaSection {
  liga: Liga;
  products: Product[];
}

export function FeaturedLeagues() {
  const [sections, setSections] = useState<LigaSection[]>([]);

  useEffect(() => {
    getProducts().then(all => {
      const result: LigaSection[] = FEATURED_LIGAS.map(liga => ({
        liga,
        products: all.filter(p => p.liga === liga).slice(0, 4),
      })).filter(s => s.products.length > 0);
      setSections(result);
    });
  }, []);

  return (
    <div className="flex flex-col gap-24">
      {sections.map((section) => (
        <section key={section.liga}>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Liga</p>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">{section.liga}</h2>
            </div>
            <Link
              to={`/catalogo/${encodeURIComponent(section.liga)}`}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-black transition-colors group"
            >
              Ver colección
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {section.products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
