import { Link } from 'react-router-dom';
import { MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { APP_CONFIG } from '../../config/app.config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-white mt-auto border-t border-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand & Newsletter Mockup */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
            <Link to="/" className="text-3xl font-black tracking-tighter text-white">
              {APP_CONFIG.store.name}
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              El destino definitivo para coleccionistas y apasionados del fútbol. 
              Ediciones actuales, versiones de jugador y joyas retro con calidad impecable.
            </p>
            
            <div className="mt-4 flex flex-col gap-3">
              <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                Únete al club
              </span>
              <div className="relative flex items-center">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                />
                <button 
                  type="button"
                  className="absolute right-2 p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Suscribirse"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-2 hidden md:block" />

          {/* Navigation Columns */}
          <div className="md:col-span-6 lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Tienda */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-gray-300 tracking-widest uppercase">
                Tienda
              </h3>
              <ul className="flex flex-col gap-3">
                <li><Link to="/catalogo" className="text-sm text-gray-500 hover:text-white transition-colors">Catálogo Completo</Link></li>
                <li><Link to="/coleccion/premier-league" className="text-sm text-gray-500 hover:text-white transition-colors">Premier League</Link></li>
                <li><Link to="/coleccion/la-liga" className="text-sm text-gray-500 hover:text-white transition-colors">La Liga</Link></li>
                <li><Link to="/coleccion/serie-a" className="text-sm text-gray-500 hover:text-white transition-colors">Serie A</Link></li>
                <li><Link to="/coleccion/retro" className="text-sm text-gray-500 hover:text-white transition-colors">Colección Retro</Link></li>
              </ul>
            </div>

            {/* Soporte */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-gray-300 tracking-widest uppercase">
                Soporte
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a 
                    href={`https://wa.me/${APP_CONFIG.contact.whatsapp}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    <MessageCircle className="w-4 h-4 text-gray-600 group-hover:text-[#25D366] transition-colors" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a 
                    href={`mailto:${APP_CONFIG.contact.email}`} 
                    className="text-sm text-gray-500 hover:text-white transition-colors inline-flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-gray-600" />
                    Email
                  </a>
                </li>
              </ul>
            </div>

            {/* Redes */}
            <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
              <h3 className="text-xs font-bold text-gray-300 tracking-widest uppercase">
                Comunidad
              </h3>
              <div className="flex gap-4">
                <a 
                  href={APP_CONFIG.social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a 
                  href={APP_CONFIG.social.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sub-footer */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-medium">
            &copy; {currentYear} {APP_CONFIG.store.name}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Términos de servicio</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacidad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
