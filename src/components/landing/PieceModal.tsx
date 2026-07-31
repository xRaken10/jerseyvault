import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "../../types/product";
import { X } from "lucide-react";
import { getProxiedImageUrl } from "../../utils/imageProxy";
import { getPrimaryImage } from "../../utils/productUtils";

interface PieceModalProps {
  piece: Product | null;
  onClose: () => void;
}

export default function PieceModal({ piece, onClose }: PieceModalProps) {

  useEffect(() => {
    const rootWrapper = document.getElementById("root")?.firstElementChild as HTMLElement | null;
    
    if (!rootWrapper) return;

    // Apply transition globally to the root wrapper
    rootWrapper.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";

    if (piece) {
      document.body.style.overflow = "hidden";
      rootWrapper.style.transform = "scale(0.97)";
      rootWrapper.style.pointerEvents = "none";
    } else {
      document.body.style.overflow = "unset";
      rootWrapper.style.transform = "scale(1)";
      rootWrapper.style.pointerEvents = "auto";
    }

    return () => {
      document.body.style.overflow = "unset";
      if (rootWrapper) {
        rootWrapper.style.transform = "scale(1)";
        rootWrapper.style.pointerEvents = "auto";
      }
    };
  }, [piece]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);



  const modalContent = (
    <AnimatePresence>
      {piece && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          {/* Hardware-accelerated Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-2xl pointer-events-auto"
            onClick={onClose}
          />

          {/* Main Cinematic Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-[100dvh] flex flex-col md:flex-row pointer-events-auto"
            onClick={onClose} // Clicking anywhere empty closes the modal
          >
            {/* Close Button - Large and elegant */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              onClick={onClose}
              className="absolute top-[env(safe-area-inset-top,32px)] right-[env(safe-area-inset-right,32px)] md:top-12 md:right-12 z-[120] group flex items-center gap-3 text-black dark:text-white hover:opacity-60 transition-opacity"
              aria-label="Cerrar modal"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase hidden md:block">Cerrar Archivo</span>
              <div className="w-12 h-12 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 group-hover:scale-105 transition-transform duration-500">
                <X strokeWidth={1} className="w-6 h-6" />
              </div>
            </motion.button>

            {/* Left Side: Cinematic Image (50% desktop, 55% mobile) */}
            <div 
              className="w-full h-[55%] md:h-full md:w-[55%] flex items-center justify-center p-8 md:p-24 pt-[calc(env(safe-area-inset-top)+32px)] md:pt-24"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img 
                src={getProxiedImageUrl(getPrimaryImage(piece))} 
                alt={piece.nombre}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-auto h-full max-h-[100%] object-contain drop-shadow-2xl transition-transform duration-300 ease-out hover:scale-105"
              />
            </div>

            {/* Right Side: Editorial Info (50% desktop, 45% mobile) */}
            <div 
              className="w-full h-[45%] md:h-full md:w-[45%] flex flex-col justify-center px-8 pb-[calc(env(safe-area-inset-bottom)+32px)] md:p-24 text-black dark:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col max-w-lg w-full mx-auto md:mx-0">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 mb-6 block">
                    {piece.liga} <span className="mx-3 opacity-30">•</span> {piece.equipo}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.05] text-gray-900 dark:text-white mb-12">
                    {piece.nombre}
                  </h2>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-6"
                >
                  {/* Museum attributes - extremely clean */}
                  <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4">
                    <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-400 font-medium">Versión</span>
                    <span className="text-sm font-semibold tracking-wide text-gray-900 dark:text-gray-100">{piece.tipo}</span>
                  </div>
                  
                  <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4">
                    <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-400 font-medium">Temporada</span>
                    <span className="text-sm font-semibold tracking-wide text-gray-900 dark:text-gray-100">
                      {/* Extract year from name if possible, else "Archive" */}
                      {piece.nombre.match(/\b(19|20)\d{2}(?:\/|-)?[0-9]{2}?\b/) 
                        ? piece.nombre.match(/\b(19|20)\d{2}(?:\/|-)?[0-9]{2}?\b/)?.[0] 
                        : "Archivo Clásico"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4">
                    <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-400 font-medium">Código de Archivo</span>
                    <span className="text-sm font-semibold tracking-wide text-gray-400 dark:text-gray-600">JV-{piece.id.toString().padStart(4, '0')}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
