import heroImage from "../../assets/images/hero.png";

export default function HeroImage() {
  const producto = {
    nombre: "Real Madrid Local 24/25",
    equipo: "Real Madrid"
  };

  return (
    <div className="relative hidden h-[760px] items-center justify-center lg:flex">
      {/* Glow */}

      <div className="absolute h-[600px] w-[600px] rounded-full bg-yellow-400/5 blur-[180px]" />

      {/* Fondo */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.05),transparent_70%)]" />

      {/* Jersey */}

      <img
        src={heroImage}
        alt={producto.nombre}
        className="
        relative
        z-10
        w-[610px] xl:w-[680px]
        translate-x-20
        drop-shadow-[0_60px_90px_rgba(0,0,0,.65)]
        transition
        duration-500
        hover:scale-[1.02]
      "
      />

      {/* Card */}

      <div
        className="
        absolute
        bottom-6
        left-24
        z-20
        w-[390px]
        rounded-[28px]
        border
        border-white/10
        bg-black/55
        p-5
        backdrop-blur-2xl
      "
      >
        <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
          Destacado
        </p>

        <h3 className="mt-3 text-[34px] font-bold leading-tight text-white">
          {producto.nombre}
        </h3>

        <p className="mt-2 text-zinc-400">{producto.equipo}</p>
      </div>
    </div>
  );
}
