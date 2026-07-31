import { motion } from "framer-motion";

export default function FooterEditorial() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="py-16 px-6 border-t border-gray-100 dark:border-white/10 mt-24"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wide uppercase leading-relaxed">
          JerseyVault es un proyecto independiente dedicado exclusivamente a la documentación y exploración visual de la historia y el diseño de camisetas de fútbol.
          <br className="hidden md:block" />
          Todas las marcas, nombres comerciales, escudos y logotipos pertenecen a sus respectivos propietarios.
          <br className="hidden md:block" />
          Este archivo digital no afirma afiliación, patrocinio ni autorización por parte de ninguna marca, liga o club.
        </p>
      </div>
    </motion.footer>
  );
}
