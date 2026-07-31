import { memo } from "react";
import { motion } from "framer-motion";
import type { Product } from "../../types/product";
import { getProxiedImageUrl } from "../../utils/imageProxy";
import { getPrimaryImage } from "../../utils/productUtils";

interface PieceCardProps {
  piece: Product;
  onClick: (piece: Product) => void;
  index: number;
}

function PieceCard({ piece, onClick, index }: PieceCardProps) {
  return (
    <div
      className="group cursor-pointer flex flex-col gap-4 animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 12) * 0.03}s`, animationFillMode: 'both' }}
      onClick={() => onClick(piece)}
    >
      <div className="relative aspect-[4/5] bg-gray-50 dark:bg-white/[0.02] rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-gray-100 dark:border-white/5 transition-all duration-300 ease-out group-hover:bg-white dark:group-hover:bg-white/[0.05] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:group-hover:shadow-[0_20px_40px_rgba(255,255,255,0.02)] group-hover:-translate-y-1">
        
        {/* Subtle radial glow behind the jersey (GPU friendly) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <motion.img 
          src={getProxiedImageUrl(getPrimaryImage(piece))}
          alt={piece.nombre}
          className="w-full h-full object-contain relative z-10 transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      </div>

      <div className="flex flex-col gap-1 px-1">
        <span className="text-[9px] font-bold tracking-widest uppercase text-gray-400">
          {piece.liga}
        </span>
        <h3 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100 leading-snug">
          {piece.nombre}
        </h3>
      </div>
    </div>
  );
}

export default memo(PieceCard, (prev, next) => prev.piece.id === next.piece.id && prev.index === next.index);
