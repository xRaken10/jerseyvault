import { Heart } from 'lucide-react';
import { useWishlist } from '../../hooks/useWishlist';
import { cn } from '../../utils/cn';

interface WishlistButtonProps {
  productId: number;
  className?: string;
  /** 'icon' = just the heart icon button (default), 'full' = square icon-only (used in ProductInfo) */
  variant?: 'icon' | 'full';
}

export function WishlistButton({ productId, className, variant = 'icon' }: WishlistButtonProps) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(productId);

  const handleClick = (e: React.MouseEvent) => {
    // Stop propagation so parent links (ProductCard) don't navigate
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
  };

  if (variant === 'full') {
    // Square icon-only button — used on the Product Detail page alongside the "Add to cart" CTA
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={wishlisted ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        aria-pressed={wishlisted}
        className={cn(
          'flex items-center justify-center rounded-xl transition-all duration-200 flex-shrink-0',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0a0a0a]',
          'active:scale-95',
          wishlisted
            ? 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40'
            : 'border border-gray-200 dark:border-white/10 text-gray-400 dark:text-gray-500 hover:border-gray-300 dark:hover:border-white/20 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5',
          className
        )}
      >
        <Heart
          className={cn(
            'transition-all duration-200',
            wishlisted ? 'fill-red-500 text-red-500 scale-110' : ''
          )}
          style={{ width: '20px', height: '20px' }}
        />
      </button>
    );
  }

  // Icon variant — compact circular button used on ProductCard overlay
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={wishlisted ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      aria-pressed={wishlisted}
      className={cn(
        'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
        'active:scale-95',
        wishlisted
          ? 'bg-white shadow-md text-red-500'
          : 'bg-white/80 backdrop-blur-sm shadow-sm text-gray-400 hover:bg-white hover:text-gray-700',
        className
      )}
    >
      <Heart
        className={cn(
          'w-4 h-4 transition-all duration-200',
          wishlisted ? 'fill-red-500 text-red-500 scale-110' : ''
        )}
      />
    </button>
  );
}
