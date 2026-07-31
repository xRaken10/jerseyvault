import { motion } from "framer-motion";

export default function HeroEditorial() {
  return (
    <section className="relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden">
      {/* GPU-Friendly Gradients (No blur, no blend modes) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] animate-pulse"
          style={{
            animationDuration: "8s",
            background:
              "radial-gradient(circle, rgba(229,231,235,0.35) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] animate-pulse"
          style={{
            animationDuration: "12s",
            background:
              "radial-gradient(circle, rgba(243,244,246,0.4) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
      </div>

      <div className="z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 overflow-hidden"
        >
          <span className="block text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 mb-6">
            Documentación Visual
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-[8rem] font-black tracking-tighter leading-[0.85] text-black dark:text-white">
            El arte de la
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-500">
              Camiseta.
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto font-medium leading-relaxed"
        >
          Un archivo creado para contemplar el diseño de los uniformes de los
          equipos favoritos de los fanáticos del fútbol mundial
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">
          Descubrir
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-700 dark:to-transparent" />
      </motion.div>
    </section>
  );
}
