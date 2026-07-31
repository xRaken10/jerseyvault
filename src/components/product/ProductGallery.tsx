import { ZoomIn } from 'lucide-react';
import { ProductImage } from '../ui/ProductImage';
import { ImageLightbox } from '../ui/ImageLightbox';

// ─────────────────────────────────────────────────────────────────────────────
// ProductPhoto
// ─────────────────────────────────────────────────────────────────────────────

interface ProductPhotoProps {
  thumbnail: string | null | undefined;
  productName: string;
  onOpenLightbox: () => void;
}

/**
 * Single-image display for the product page.
 * Desktop: CSS transform zoom on hover, cursor zoom-in.
 * Mobile / any device: tap anywhere on the image to open the lightbox.
 */
export function ProductPhoto({ thumbnail, productName, onOpenLightbox }: ProductPhotoProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Ampliar imagen del producto"
      onClick={onOpenLightbox}
      onKeyDown={(e) => e.key === 'Enter' && onOpenLightbox()}
      className="
        relative w-full aspect-[4/5] md:aspect-square
        overflow-hidden rounded-[28px]
        bg-gray-50 dark:bg-white/[0.03]
        border border-gray-100 dark:border-white/5
        group cursor-zoom-in select-none
      "
    >
      {/* Image — gentle scale on hover */}
      <ProductImage
        src={thumbnail}
        alt={productName}
        className="
          h-full w-full object-cover object-center
          transition-transform duration-700 ease-out
          group-hover:scale-[1.06] will-change-transform
        "
      />

      {/* Gradient veil — appears on hover */}
      <div className="
        absolute inset-0
        bg-gradient-to-t from-black/20 via-transparent to-transparent
        opacity-0 group-hover:opacity-100
        transition-opacity duration-500 pointer-events-none
      " />

      {/* Zoom badge — appears on hover, hides on mobile (no hover state) */}
      <div className="
        absolute bottom-4 right-4
        hidden sm:flex items-center gap-1.5
        bg-white/80 dark:bg-black/60 backdrop-blur-md
        rounded-full px-3 py-1.5
        text-xs font-semibold text-gray-700 dark:text-gray-200
        shadow-sm
        opacity-0 translate-y-1
        group-hover:opacity-100 group-hover:translate-y-0
        transition-all duration-300 pointer-events-none
      ">
        <ZoomIn className="w-3.5 h-3.5" />
        Ampliar
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ProductViewer  (photo + lightbox, wired together)
// ─────────────────────────────────────────────────────────────────────────────

interface ProductViewerProps {
  thumbnail: string | null | undefined;
  productName: string;
  isLightboxOpen: boolean;
  onOpenLightbox: () => void;
  onCloseLightbox: () => void;
}

/**
 * Composes ProductPhoto and ImageLightbox.
 * State lives in the parent (Product.tsx) so ProductInfo can also
 * trigger the lightbox via its own "Ampliar imagen" button.
 */
export function ProductViewer({
  thumbnail,
  productName,
  isLightboxOpen,
  onOpenLightbox,
  onCloseLightbox,
}: ProductViewerProps) {
  return (
    <>
      <ProductPhoto
        thumbnail={thumbnail}
        productName={productName}
        onOpenLightbox={onOpenLightbox}
      />
      <ImageLightbox
        open={isLightboxOpen}
        image={thumbnail}
        alt={productName}
        onClose={onCloseLightbox}
      />
    </>
  );
}
