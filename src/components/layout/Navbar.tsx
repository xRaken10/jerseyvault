import { ThemeToggle } from "./ThemeToggle";
import logoDark from "../../assets/images/logo-dark-mode.png";
import logoLight from "../../assets/images/logo-light-mode.png";
import { motion, useScroll, useMotionValueEvent, useMotionValue, useSpring } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  
  // NATIVE MOTION VALUES (No React Re-renders!)
  const yOffset = useMotionValue(0);
  const springY = useSpring(yOffset, { stiffness: 400, damping: 40 });
  const bgOpacity = useMotionValue(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Hide if scrolling down past 150px
    if (latest > previous && latest > 150) {
      yOffset.set(-100);
    } else {
      yOffset.set(0);
    }
    
    // Toggle background blur class conditionally via MotionValue
    bgOpacity.set(latest > 10 ? 1 : 0);
  });

  return (
    <motion.header
      style={{ y: springY }}
      className="fixed top-0 inset-x-0 z-50"
    >
      {/* Background Layer: We use a separate motion div for background to transition opacity natively */}
      <motion.div 
        className="absolute inset-0 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/10"
        style={{ opacity: bgOpacity }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 transition-opacity hover:opacity-70"
        >
          <img src={logoLight} alt="Archivo Deportivo" className="h-6 w-auto dark:hidden" />
          <img src={logoDark} alt="Archivo Deportivo" className="h-6 w-auto hidden dark:block" />
          <span className="text-lg font-bold tracking-tight text-black dark:text-white">
            Archivo Deportivo
          </span>
        </button>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" })}
            className="text-xs font-semibold tracking-widest uppercase text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            Archivo
          </button>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
