import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import retroBg from '../../assets/images/bento-retro.jpg';
import fansBg from '../../assets/images/bento-fans.jpg';
import fabricBg from '../../assets/images/bento-fabric.jpg';

export function BentoDiscovery() {
  return (
    <section className="bg-[#0a0a0a] py-2 lg:py-4">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4">
        
        {/* Editorial Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 auto-rows-[400px] md:auto-rows-[500px]">
          
          {/* Block 1: Fan Version / Liga (Span 2 cols on tablet, 1 on desktop) */}
          <Link 
            to={`/catalogo`}
            className="group relative overflow-hidden flex flex-col justify-end p-8 text-left bg-black block"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700 ease-out"
              style={{ backgroundImage: `url(${fansBg})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="relative z-10">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3 block">
                Catálogo Completo
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white leading-none mb-4 uppercase">
                Pasión<br/>Sin Límites.
              </h3>
              <div className="inline-flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-wide group-hover:gap-4 transition-all">
                Explorar Colección <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Block 2: Player Version */}
          <Link 
            to={`/coleccion/player-version`}
            className="group relative overflow-hidden flex flex-col justify-end p-8 text-left bg-black lg:col-span-2 block"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700 ease-out"
              style={{ backgroundImage: `url(${fabricBg})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            <div className="relative z-10 max-w-md">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3 block">
                Player Version
              </span>
              <h3 className="text-3xl sm:text-5xl font-black text-white leading-none mb-4 uppercase">
                Tecnología<br/>en el campo.
              </h3>
              <div className="inline-flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-wide group-hover:gap-4 transition-all">
                Ver Player Version <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Block 3: Retro */}
          <Link 
            to={`/coleccion/retro`}
            className="group relative md:col-span-2 lg:col-span-3 overflow-hidden flex flex-col justify-end p-8 sm:p-12 text-left bg-black block"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700 ease-out"
              style={{ backgroundImage: `url(${retroBg})`, backgroundPosition: 'center 40%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
            
            <div className="relative z-10 max-w-xl">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3 block">
                El Archivo
              </span>
              <h3 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.9] mb-6 uppercase tracking-tighter">
                Clásicos<br/>Atemporales.
              </h3>
              <p className="text-white/60 text-sm sm:text-base font-medium max-w-md mb-8">
                Revive las épocas doradas del fútbol con las camisetas que marcaron historia.
              </p>
              <div className="inline-flex items-center gap-2 text-white text-sm font-bold uppercase tracking-wide group-hover:gap-4 transition-all border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black">
                Explorar Retro <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
