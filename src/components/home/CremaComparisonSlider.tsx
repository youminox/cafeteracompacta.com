"use client";

import { useCallback, useRef, useState } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Escena arrastrable Antes ↔ Después clonada de DayNightSlider.tsx de prunex1.com: Filtro Presurizado de Fábrica (con café molido) vs Portafiltro Bottomless + Molino Espresso (Crema Tigreada Barista). */
export default function CremaComparisonSlider() {
  const [v, setV] = useState(25);
  const [touched, setTouched] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const t = v / 100;
  const mid = clamp(1 - Math.abs(t - 0.5) * 2.4);
  const pro = clamp((t - 0.45) / 0.45);
  const tigers = clamp((t - 0.6) / 0.35);

  const phase =
    t < 0.35
      ? "Nivel 1 · Filtro Presurizado (De Caja)"
      : t < 0.68
      ? "Nivel 2 · Molino de Muelas + Tamper"
      : "Nivel 3 · Portafiltro Bottomless Barista";

  const pressureReading = (15 - t * 6).toFixed(1) + " Bar";

  const fromPointer = useCallback((clientX: number) => {
    const el = scene.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setV(Math.round(clamp((clientX - r.left) / r.width) * 100));
    setTouched(true);
  }, []);

  return (
    <div className="daynight bg-[#120c08] shadow-[0_40px_80px_-40px_rgba(30,15,5,0.7)]">
      <div
        ref={scene}
        className="relative aspect-[4/5] cursor-ew-resize select-none sm:aspect-[16/9]"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") e.preventDefault();
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1 || e.pointerType === "touch") {
            if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId))
              fromPointer(e.clientX);
          }
        }}
      >
        <svg
          viewBox="0 0 800 450"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="dn-day" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e6d5c3" />
              <stop offset="1" stopColor="#faf5ef" />
            </linearGradient>
            <linearGradient id="dn-dusk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7c3f1d" />
              <stop offset="0.55" stopColor="#c87d32" />
              <stop offset="1" stopColor="#fde68a" />
            </linearGradient>
            <linearGradient id="dn-night" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#120c08" />
              <stop offset="0.7" stopColor="#27160c" />
              <stop offset="1" stopColor="#451a03" />
            </linearGradient>
            <radialGradient id="dn-lamp" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#e5a93c" stopOpacity="0.45" />
              <stop offset="1" stopColor="#c87d32" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="450" fill="url(#dn-day)" />
          <rect width="800" height="450" fill="url(#dn-dusk)" opacity={mid} />
          <rect width="800" height="450" fill="url(#dn-night)" opacity={pro} />

          {/* Luz cálida de barra de especialidad */}
          <circle cx="400" cy="275" r="210" fill="url(#dn-lamp)" opacity={pro} />

          {/* Encimera de cocina */}
          <rect
            x="0"
            y="386"
            width="800"
            height="64"
            fill={pro > 0.5 ? "#1c120c" : "#d6bfa7"}
          />

          {/* Grupo de extracción superior y Portafiltro */}
          <rect
            x="315"
            y="88"
            width="170"
            height="48"
            rx="10"
            fill="#3f3f46"
            stroke="#a1a1aa"
            strokeWidth="3"
          />
          {/* Mango portafiltro */}
          <rect
            x="480"
            y="102"
            width="145"
            height="20"
            rx="10"
            fill={pro > 0.5 ? "#78350f" : "#18181b"}
          />
          {/* Si es Presurizado (2 picos) vs Bottomless (cono central directo de la cesta) */}
          {pro < 0.5 ? (
            <g>
              <path d="M365 136 V154 M435 136 V154" stroke="#71717a" strokeWidth="8" strokeLinecap="round" />
              <rect x="362" y="154" width="6" height="145" fill="#a16207" opacity="0.85" />
              <rect x="432" y="154" width="6" height="145" fill="#a16207" opacity="0.85" />
            </g>
          ) : (
            <g>
              {/* Cesta IMS Desnuda (Bottomless) */}
              <rect x="348" y="136" width="104" height="12" rx="4" fill="#d4d4d8" />
              {/* Cono central de miel / espresso tigreado */}
              <path
                d="M362 148 Q400 195 395 298 L405 298 Q400 195 438 148 Z"
                fill="#b45309"
              />
              <path
                d="M384 148 L398 298 L402 298 L416 148 Z"
                fill="#fef08a"
                opacity="0.65"
              />
            </g>
          )}

          {/* Báscula Mini sobre bandeja */}
          <rect
            x="295"
            y="356"
            width="210"
            height="28"
            rx="8"
            fill="#18181b"
            stroke="#e5a93c"
            strokeWidth="2"
          />
          <text
            x="400"
            y="375"
            textAnchor="middle"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="13"
            fill="#fef08a"
          >
            {pro > 0.5 ? "18.0g IN → 36.0g OUT · 27s" : "Filtro Doble Pared (Fácil)"}
          </text>

          {/* Taza de vidrio de doble pared */}
          <path
            d="M322 252 H478 L466 352 C464 355 445 356 400 356 C355 356 336 355 334 352 Z"
            fill="#ffffff"
            fillOpacity="0.92"
            stroke="#d4d4d8"
            strokeWidth="3"
          />
          {/* Cuerpo del espresso */}
          <path
            d="M332 292 H468 L461 350 H339 Z"
            fill={pro > 0.5 ? "#290f04" : "#5c2d16"}
          />
          {/* Crema superior */}
          <rect
            x="330"
            y="268"
            width="140"
            height="26"
            rx="6"
            fill={pro > 0.5 ? "#c87d32" : "#eab308"}
          />
          {/* Vetas atigradas (Tiger Striping) en modo Bottomless */}
          <g opacity={tigers} stroke="#6b2d14" strokeWidth="3.5" strokeLinecap="round">
            <path d="M345 276 Q370 286 395 274" fill="none" />
            <path d="M385 284 Q415 272 448 282" fill="none" />
            <path d="M358 288 Q400 278 435 289" fill="none" />
          </g>
        </svg>

        <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/30 bg-black/40 px-4 py-2 text-white backdrop-blur-md sm:left-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/75">
            {phase}
          </p>
          <p className="font-display text-3xl font-extrabold tabular-nums">
            {pressureReading}
          </p>
        </div>
        <div className="pointer-events-none absolute right-4 top-4 max-w-[54%] rounded-2xl border border-white/30 bg-black/40 px-4 py-3 text-right text-white backdrop-blur-md sm:right-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-fxlime">
            {pro > 0.5 ? "Extracción Despresurizada Real" : "Modo Principiante (Sin Molino)"}
          </p>
          <p className="font-display text-sm font-bold leading-snug sm:text-lg">
            {pro > 0.5
              ? "Portafiltro Bottomless 51/54 mm + Molino Espresso = Crema Tigreada"
              : "Cesta presurizada: funciona desde el día 1 con café pre-molido"}
          </p>
        </div>
        {!touched && (
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 animate-pulse whitespace-nowrap rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-fxink shadow-lg sm:bottom-5 sm:px-4 sm:py-2 sm:text-sm">
            ← Arrastra para comparar Filtro Presurizado vs Portafiltro Bottomless →
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 bg-[#120c08] px-5 py-4 text-white sm:px-7">
        <span className="text-xs font-bold whitespace-nowrap">🥄 Pre-molido</span>
        <label className="sr-only" htmlFor="dn-range">
          Nivel de evolución barista
        </label>
        <input
          id="dn-range"
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => {
            setV(Number(e.target.value));
            setTouched(true);
          }}
          aria-valuetext={`${phase}, ${pressureReading}`}
        />
        <span className="text-xs font-bold whitespace-nowrap text-fxlime">☕ Bottomless Pro</span>
      </div>
    </div>
  );
}
