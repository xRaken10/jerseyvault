import { ShieldCheck, Lock, MessageCircle } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Calidad Premium",
    description: "Materiales de alta calidad",
  },
  {
    icon: Lock,
    title: "Compra segura",
    description: "Tus datos protegidos",
  },
  {
    icon: MessageCircle,
    title: "Atención rápida",
    description: "Soporte por WhatsApp",
  },
];

export default function HeroBenefits() {
  return (
    <div className="mt-14 grid gap-8 md:grid-cols-3">
      {benefits.map((benefit) => {
        const Icon = benefit.icon;

        return (
          <div key={benefit.title} className="flex items-start gap-4">
            <Icon size={28} className="mt-1 text-white" />

            <div>
              <h3 className="font-medium text-white">{benefit.title}</h3>

              <p className="mt-1 text-sm text-zinc-500">
                {benefit.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
