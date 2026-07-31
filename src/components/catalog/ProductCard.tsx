import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { ProductImage } from '../ui/ProductImage';
import { WishlistButton } from '../wishlist/WishlistButton';
import { cn } from '../../utils/cn';
import { Eye } from 'lucide-react';
import { getCategoria } from '../../utils/productUtils';

interface ProductCardProps {
  product: Product;
  forceDark?: boolean;
  index?: number;
}

export function ProductCard({ product, forceDark, index }: ProductCardProps) {
  const primarySrc = product.thumbnail || product.imagenes?.[0];
  const fallbacks = product.thumbnail
    ? product.imagenes ?? []
    : (product.imagenes ?? []).slice(1);
    
  const categoria = getCategoria(product);

  return (
    <div className={cn(
      "group flex flex-col gap-3 rounded-[24px] p-2 transition-all duration-300 h-full animate-fade-up active:scale-[0.98] border border-transparent",
      forceDark
        ? "hover:bg-white/[0.04] hover:shadow-[0_20px_50px_rgb(0,0,0,0.6)] hover:border-white/10"
        : "hover:bg-gray-50/80 dark:hover:bg-white/[0.04] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_20px_50px_rgb(0,0,0,0.5)] dark:hover:border-white/5"
    )}>
      {/* Image wrapper */}
      <Link
        to={`/producto/${product.slug}`}
        className={cn(
          "relative aspect-[4/5] w-full overflow-hidden rounded-[20px] flex-shrink-0 block",
          forceDark ? "bg-white/5" : "bg-gray-100 dark:bg-white/5"
        )}
      >
        <ProductImage
          src={primarySrc}
          fallbackSrcs={fallbacks}
          alt={product.nombre}
          loading={index !== undefined && index < 8 ? 'eager' : 'lazy'}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        
        {/* Subtle dark gradient from bottom for contrast */}
        <div className={cn(
          "absolute inset-0 transition-opacity duration-500 pointer-events-none opacity-0 group-hover:opacity-100",
          forceDark
            ? "bg-gradient-to-t from-black/40 via-black/10 to-transparent"
            : "bg-gradient-to-t from-black/30 via-black/5 to-transparent"
        )} />

        {/* Quick Action Overlay (Desktop only) */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hidden sm:block">
          <div className="w-full bg-white/95 backdrop-blur-md text-gray-900 text-xs font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            <Eye className="w-4 h-4" />
            Ver detalles
          </div>
        </div>

        {/* Wishlist button */}
        <div className={cn(
          "absolute top-2.5 right-2.5 transition-all duration-300 z-10",
          "opacity-100 sm:opacity-0 sm:group-hover:opacity-100",
          "translate-y-0 sm:translate-y-1 sm:group-hover:translate-y-0"
        )}>
          <WishlistButton productId={product.id} className="shadow-lg" />
        </div>
      </Link>

      {/* Info */}
      <Link
        to={`/producto/${product.slug}`}
        className="flex flex-col gap-1 px-1.5 flex-1"
      >
        <div className="flex items-center gap-1.5 mb-1">
          <p className={cn(
            "text-[10px] font-bold tracking-widest uppercase",
            forceDark ? "text-white/40" : "text-gray-400 dark:text-gray-500"
          )}>
            {product.liga}
          </p>
          <span className={cn(
            "w-1 h-1 rounded-full flex-shrink-0",
            forceDark ? "bg-white/20" : "bg-gray-300 dark:bg-gray-700"
          )} />
          <p className={cn(
            "text-[10px] font-semibold uppercase tracking-wider line-clamp-1",
            forceDark ? "text-white/50" : "text-gray-500 dark:text-gray-400"
          )}>
            {product.equipo}
          </p>
        </div>
        
        <h3 className={cn(
          "text-sm font-bold line-clamp-2 leading-snug flex-1 transition-colors",
          forceDark
            ? "text-white group-hover:text-white/80"
            : "text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-white/90"
        )}>
          {product.nombre}
        </h3>
        
        <div className={cn(
          "flex items-center justify-between mt-2 pt-2 border-t",
          forceDark ? "border-white/10" : "border-gray-100/50 dark:border-white/10"
        )}>
          <p className={cn(
            "text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md w-fit border transition-colors",
            categoria === 'player'
              ? forceDark 
                ? "bg-white text-black border-transparent"
                : "bg-gray-900 text-white border-transparent dark:bg-white dark:text-black dark:border-transparent" 
              : categoria === 'retro'
                ? forceDark
                  ? "bg-amber-900/30 text-amber-400 border-transparent"
                  : "bg-amber-50 text-amber-900 border-transparent dark:bg-amber-900/20 dark:text-amber-400 dark:border-transparent"
                : forceDark
                  ? "bg-white/10 text-white/60 border-transparent"
                  : "bg-gray-50 text-gray-600 border-transparent dark:bg-white/5 dark:text-gray-400 dark:border-transparent"
          )}>
            {product.tipo}
          </p>
        </div>
      </Link>
    </div>
  );
}
