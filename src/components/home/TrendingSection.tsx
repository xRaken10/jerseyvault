import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { getProducts } from '../../services/catalog.service';
import type { Product } from '../../types/product';
import { ProductCard } from '../catalog/ProductCard';
import { getCategoria } from '../../utils/productUtils';

export function TrendingSection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(all => {
      const premium = all.filter(p => getCategoria(p) === 'player');
      setProducts(premium.length >= 4 ? premium.slice(0, 4) : all.slice(0, 4));
    });
  }, []);

  if (products.length === 0) return null;

  return (
    // bg-black is intentionally hardcoded — this section is always dark regardless of theme
    <section className="bg-black py-24 sm:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
              Top Trending
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white leading-none uppercase">
              Selección<br/>Curada.
            </h2>
          </div>
          <Link
            to="/catalogo"
            className="group inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white transition-colors uppercase tracking-widest"
          >
            Ver toda la colección
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} forceDark />
          ))}
        </div>
      </div>
    </section>
  );
}
