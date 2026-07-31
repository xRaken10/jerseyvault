import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import { getProxiedImageUrl } from '../../utils/imageProxy';

interface ImageLightboxProps {
  open: boolean;
  image: string | null | undefined;
  alt?: string;
  onClose: () => void;
}

/**
 * ImageLightbox — Standalone fullscreen image viewer.
 *
 * Rendered via React Portal directly into document.body.
 * Completely independent of any layout, header, navbar or parent z-index.
 *
 * Close triggers: X button · click outside image · ESC key · tap outside image
 * Never closes when tapping/clicking the image itself.
 *
 * z-index: 99999 (overlay) / 100000 (close button)
 * → guaranteed above Navbar, CartDrawer, MobileMenu, everything.
 */
export function ImageLightbox({ open, image, alt = 'Imagen del producto', onClose }: ImageLightboxProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const src = getProxiedImageUrl(image ?? undefined);

  // ── Body scroll lock ─────────────────────────────────────────────────────
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // ── ESC key ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // ── Focus close button on open (accessibility) ───────────────────────────
  useEffect(() => {
    if (open) {
      // Tiny delay so the element is painted before focus
      const id = setTimeout(() => closeBtnRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
  }, [open]);

  // Don't render anything into the DOM when closed
  if (!open) return null;

  const overlay = (
    <div
      // ── Overlay ───────────────────────────────────────────────────────────
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.90)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        // Animation
        animation: 'lbFadeIn 220ms ease-out forwards',
      }}
    >
      {/* ── Image container — stopPropagation keeps clicks on image from closing ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'lbScaleIn 220ms ease-out forwards',
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            draggable={false}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: 16,
              boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              display: 'block',
            }}
          />
        ) : (
          <div
            style={{
              width: 200,
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 16,
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.3)',
              fontSize: 14,
            }}
          >
            Sin imagen
          </div>
        )}
      </div>

      {/* ── Close button — position:fixed so it's always in viewport corner ── */}
      <button
        ref={closeBtnRef}
        type="button"
        aria-label="Cerrar visor"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        onTouchEnd={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: 'fixed',
          // Desktop: 24px from top-right. Mobile: respect safe-area-inset.
          top: 'max(24px, env(safe-area-inset-top, 24px))',
          right: 'max(24px, env(safe-area-inset-right, 24px))',
          zIndex: 100000,
          width: 44,
          height: 44,
          minWidth: 44,
          minHeight: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff',
          cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          touchAction: 'manipulation',
          // No Tailwind — pure inline for guaranteed cross-device rendering
          transition: 'background 0.18s, transform 0.15s',
          WebkitTapHighlightColor: 'transparent',
          outline: 'none',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.20)';
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.10)';
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
        }}
        onMouseDown={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.94)';
        }}
        onMouseUp={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
        }}
      >
        <X size={20} strokeWidth={2} />
      </button>
    </div>
  );

  return ReactDOM.createPortal(overlay, document.body);
}

// ── Keyframe animations injected once ────────────────────────────────────────
// We inject them imperatively to avoid any CSS file dependency. The style tag
// is idempotent — checking the id prevents duplicate injection.
if (typeof document !== 'undefined' && !document.getElementById('lb-keyframes')) {
  const style = document.createElement('style');
  style.id = 'lb-keyframes';
  style.textContent = `
    @keyframes lbFadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes lbScaleIn {
      from { opacity: 0; transform: scale(0.96); }
      to   { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
}
