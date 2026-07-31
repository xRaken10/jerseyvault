import type { Product } from '../../types/product';
import { ProductCard } from '../catalog/ProductCard';

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-24 border-t border-gray-100 dark:border-white/5 pt-16">
      <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-black tracking-tighter text-gray-900 dark:text-white mb-10">
        También te puede interesar
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
