import { useId } from "react";

/** Logotipo de CafeteraCompacta.com: Portafiltro espresso + manómetro y crema avellana */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#C87D32" />
          <stop offset="0.55" stopColor="#1E1510" />
          <stop offset="1" stopColor="#6B2D14" />
        </linearGradient>
        <linearGradient id={`${id}ring`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FEF08A" />
          <stop offset="1" stopColor="#E5A93C" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${id}bg)`} />
      {/* Aro del manómetro / grupo espresso */}
      <circle cx="30" cy="30" r="16" fill="none" stroke={`url(#${id}ring)`} strokeWidth="3.5" />
      {/* Mango del portafiltro inclinado */}
      <path
        d="M42 42 L53 53"
        stroke="#FEF08A"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Taza de espresso interior con crema */}
      <path
        d="M21 27 H39 V32 C39 36.5 35 40 30 40 C25 40 21 36.5 21 32 Z"
        fill="#FFFFFF"
      />
      <path d="M22 27 H38" stroke="#E5A93C" strokeWidth="3" strokeLinecap="round" />
      {/* Vapor aromático */}
      <path
        d="M27 22 C27 19 29 19 29 16 M33 22 C33 19 35 19 35 16"
        stroke="#FEF08A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight">
      <LogoMark />
      <span>
        Cafetera<span className={dark ? "text-fxlime" : "text-fxblue"}>Compacta</span>
        <span
          className={`ml-1.5 hidden text-[10px] font-bold uppercase tracking-[0.18em] sm:inline ${
            dark ? "text-white/60" : "text-[var(--muted)]"
          }`}
        >
          .com
        </span>
      </span>
    </span>
  );
}
