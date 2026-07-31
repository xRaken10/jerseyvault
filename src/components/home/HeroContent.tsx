import HeroButtons from "./HeroButtons";
// import HeroBenefits from "./HeroBenefits";

export default function HeroContent() {
  return (
    <div className="relative z-20 max-w-[460px]">
      {/* Label */}

      <span className="mb-8 inline-block text-[12px] font-medium uppercase tracking-[0.35em] text-zinc-500">
        La mejor colección de camisetas de fútbol
      </span>

      {/* Título */}

      <h1 className="text-[60px] xl:text-[68px] font-black leading-[0.95] tracking-[-0.045em] text-white">
        Lleva tu pasión.
        <br />
        Viste tu historia.
      </h1>

      {/* Descripción */}

      <p
        className="mt-8 text-[18px]
leading-8
max-w-[420px] text-zinc-400"
      >
        Más de 2,000 camisetas de clubes y selecciones de las mejores ligas del
        mundo.
      </p>

      {/* Botones */}

      <div className="mt-12">
        <HeroButtons />
      </div>

      {/* Beneficios */}

      {/* <div className="mt-20">
        <HeroBenefits />
      </div> */}
    </div>
  );
}
