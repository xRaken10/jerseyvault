import { useState } from 'react';
import { Plus, Minus, Trash2, ChevronDown } from 'lucide-react';
import type { CartItem as CartItemType } from '../../types/cart';
import type { Talla } from '../../config/app.config';
import { APP_CONFIG } from '../../config/app.config';
import { useCart } from '../../hooks/useCart';
import { ProductImage } from '../ui/ProductImage';
import { cn } from '../../utils/cn';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem, changeTalla } = useCart();
  const { product, talla, quantity } = item;
  const [isTallaOpen, setIsTallaOpen] = useState(false);

  const primarySrc = product.thumbnail || product.imagenes?.[0];
  const fallbacks = product.thumbnail
    ? product.imagenes ?? []
    : (product.imagenes ?? []).slice(1);

  return (
    <div className="flex gap-4 py-5 border-b border-gray-100 dark:border-white/10 last:border-0">
      {/* Image */}
      <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-[18px] border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/[0.03]">
        <ProductImage
          src={primarySrc}
          fallbackSrcs={fallbacks}
          alt={product.nombre}
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
              {product.equipo}
            </p>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">
              {product.nombre}
            </h4>
          </div>
          <button
            type="button"
            onClick={() => removeItem(product.id, talla)}
            className="p-1.5 text-gray-300 dark:text-gray-600 hover:text-red-400 dark:hover:text-red-400 transition-colors flex-shrink-0 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
            aria-label="Eliminar producto"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between gap-3 mt-3">
          {/* Talla selector inline */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsTallaOpen(o => !o)}
              className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              Talla: <span className="font-bold">{talla}</span>
              <ChevronDown className={cn('w-3 h-3 transition-transform', isTallaOpen && 'rotate-180')} />
            </button>
            {isTallaOpen && (
              <div className="absolute bottom-full left-0 mb-1 bg-white dark:bg-[#111] rounded-xl border border-gray-200 dark:border-white/10 shadow-lg py-1 z-10 min-w-[100px] overflow-hidden">
                {APP_CONFIG.tallas.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      changeTalla(product.id, talla, t as Talla);
                      setIsTallaOpen(false);
                    }}
                    className={cn(
                      'w-full text-left px-3 py-1.5 text-sm transition-colors',
                      t === talla
                        ? 'bg-gray-900 text-white dark:bg-white dark:text-black font-bold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quantity controls */}
          <div className="flex items-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] overflow-hidden">
            <button
              type="button"
              onClick={() => updateQuantity(product.id, talla, quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-gray-900 dark:text-white select-none">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(product.id, talla, quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
