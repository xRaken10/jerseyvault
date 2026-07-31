import { useState } from 'react';
import { Shirt } from 'lucide-react';
import { cn } from '../../utils/cn';
import { getProxiedImageUrl } from '../../utils/imageProxy';

interface ProductImageProps {
  /** Primary image src (thumbnail or first URL from imagenes). Will be proxied automatically. */
  src?: string | null;
  /** Additional fallback URLs to try if src fails, in order. Will be proxied automatically. */
  fallbackSrcs?: string[];
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * Robust image component for all Yupoo-hosted product images.
 *
 * Fallback chain:
 *   1. src (proxied)
 *   2. fallbackSrcs[0] (proxied)
 *   3. fallbackSrcs[1] (proxied)
 *   ...
 *   N. Premium placeholder (no broken-image browser icon ever)
 *
 * All URLs are automatically rewritten through getProxiedImageUrl() so that
 * the Yupoo hotlink protection is bypassed transparently.
 */
export function ProductImage({ src, fallbackSrcs = [], alt, className, loading = 'lazy' }: ProductImageProps) {
  const [errorCount, setErrorCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Build the ordered list of URLs to try, filtering out empties, then proxy each
  const allSrcs = [src, ...fallbackSrcs]
    .filter((u): u is string => Boolean(u && u.trim() !== ''))
    .map(getProxiedImageUrl)
    .filter((u): u is string => Boolean(u));

  const currentSrc = allSrcs[errorCount];

  // All sources exhausted — render the premium placeholder
  if (!currentSrc) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-2 bg-gray-100 text-gray-300',
          className
        )}
        aria-hidden="true"
      >
        <Shirt className="w-10 h-10 opacity-20" strokeWidth={1.5} />
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-25">
          Sin imagen
        </span>
      </div>
    );
  }

  return (
    <img
      key={currentSrc}
      src={currentSrc}
      alt={alt}
      loading={loading}
      decoding="async"
      className={cn('bg-gray-100', className)}
      onLoad={() => setIsLoaded(true)}
      onError={() => {
        setErrorCount(prev => prev + 1);
        setIsLoaded(false);
      }}
      style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s ease-out' }}
    />
  );
}
