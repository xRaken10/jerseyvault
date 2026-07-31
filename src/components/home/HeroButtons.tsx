import { ArrowRight, Shirt } from "lucide-react";

export default function HeroButtons() {
  return (
    <div className="flex items-center gap-5">
      {/* Principal */}

      <button
        className="
        group
        flex
        h-15
        items-center
        gap-3
        rounded-2xl
        bg-white
        px-8
        font-semibold
        text-black
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-[0_20px_60px_rgba(255,255,255,.15)]
      "
      >
        Explorar catálogo
        <ArrowRight
          size={18}
          className="transition group-hover:translate-x-1"
        />
      </button>

      {/* Secundario */}

      <button
        className="
        group
        flex
        h-15
        items-center
        gap-3
        rounded-2xl
        border
        border-white/10
        bg-white/[0.02]
        px-8
        font-semibold
        text-white
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-white/20
        hover:bg-white/[0.04]
      "
      >
        Ver equipos
        <Shirt size={18} className="transition group-hover:rotate-6" />
      </button>
    </div>
  );
}
