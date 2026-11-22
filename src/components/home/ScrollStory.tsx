"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    n: "01",
    t: "Dosis exacta (16–18 g) y distribución WDT",
    d: "Pesas tu café recién molido en una báscula mini de 0.1 g, rompes los grumos con agujas WDT de 0.3 mm y prensas nivelado con tu tamper de 51 mm o 54 mm.",
  },
  {
    n: "02",
    t: "Pre-infusión suave a baja presión (3 a 5 s)",
    d: "La bomba humedece la pastilla de café a ~3-4 bares antes de aplicar la presión total, permitiendo que la cama de café se asiente sin grietas ni channeling.",
  },
  {
    n: "03",
    t: "Extracción en Zona Espresso (9 Bares · 25-30 s)",
    d: "El manómetro de la CASABREWS CM5418 sube a la zona central o la válvula OPV de la Breville Bambino regula a 9 bares para extraer 36 g de espresso con crema avellana tigreada.",
  },
  {
    n: "04",
    t: "Texturizado de microespuma a 65 °C y Latte Art",
    d: "En segundos pasas a modo vapor: con la lanceta MyLatte Art de la Dedica Arte, la Bambino o un espumador Dreo/NanoFoamer creas leche sedosa lista para dibujar.",
  },
];

/** Escena fijada con GSAP ScrollTrigger clonada de prunex1.com: muestra las 4 fases de extracción de un espresso compacto. */
export default function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    let io: IntersectionObserver | null = null;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        if (reduce) {
          gsap.set(q(".step"), { opacity: 1 });
          gsap.set(q(".bar"), { scaleX: 1 });
          gsap.set(q(".phone-alert, .night, .crema-layer"), { opacity: 1 });
          return;
        }
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=2200",
            scrub: 0.7,
            pin: q(".pin")[0],
            anticipatePin: 1,
          },
        });
        tl.to(q(".step-0"), { opacity: 1, duration: 0.2 }, 0)
          .to(
            q(".step-0 .dot"),
            { backgroundColor: "#C87D32", color: "#fff", duration: 0.2 },
            0
          )
          .fromTo(
            q(".portafilter-group"),
            { opacity: 0.4, x: -24 },
            { opacity: 1, x: 0, duration: 0.6 },
            0.1
          )
          .to(q(".step-0"), { opacity: 0.75, duration: 0.2 }, 1)
          .to(q(".step-1"), { opacity: 1, duration: 0.2 }, 1)
          .to(
            q(".step-1 .dot"),
            { backgroundColor: "#6B2D14", color: "#fff", duration: 0.2 },
            1
          )
          .to(
            q(".gauge-needle"),
            { rotate: 45, svgOrigin: "200 135", duration: 0.5 },
            1.15
          )
          .to(q(".espresso-stream"), { opacity: 0.6, scaleY: 0.6, duration: 0.5 }, 1.25)
          .to(q(".step-1"), { opacity: 0.75, duration: 0.2 }, 2)
          .to(q(".step-2"), { opacity: 1, duration: 0.2 }, 2)
          .to(
            q(".step-2 .dot"),
            { backgroundColor: "#E5A93C", color: "#1e1206", duration: 0.2 },
            2
          )
          .to(
            q(".gauge-needle"),
            { rotate: 112, svgOrigin: "200 135", duration: 0.7 },
            2.05
          )
          .to(q(".espresso-stream"), { opacity: 1, scaleY: 1, duration: 0.5 }, 2.1)
          .to(q(".espresso-fill"), { opacity: 1, duration: 0.6 }, 2.4)
          .to(q(".crema-layer"), { opacity: 1, duration: 0.5 }, 2.65)
          .to(q(".step-2"), { opacity: 0.75, duration: 0.2 }, 3.1)
          .to(q(".step-3"), { opacity: 1, duration: 0.2 }, 3.1)
          .to(
            q(".step-3 .dot"),
            { backgroundColor: "#C87D32", color: "#fff", duration: 0.2 },
            3.1
          )
          .to(q(".night"), { opacity: 1, duration: 0.6 }, 3.1)
          .to(q(".latte-heart"), { opacity: 1, scale: 1, duration: 0.5 }, 3.25)
          .to(q(".phone-alert"), { opacity: 1, y: 0, duration: 0.5 }, 3.3)
          .to(q(".done"), { opacity: 1, y: 0, duration: 0.4 }, 3.4)
          .to(q(".bar"), { scaleX: 1, duration: 3.8 }, 0);
      }, el);
    };

    io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io?.disconnect();
          init();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io?.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="ciclo-extraccion"
      ref={root}
      className="relative bg-gradient-to-b from-white via-fxsky to-white"
    >
      <div className="pin flex min-h-[100svh] items-center overflow-hidden py-10 lg:py-14">
        <div className="wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="eyebrow">Flujo Barista Paso a Paso</span>
            <h2 className="section-title mt-3">
              Cuatro pasos.{" "}
              <span className="text-prune">Café de especialidad en 15 cm.</span>
            </h2>
            <div className="mt-4 h-1.5 w-full max-w-sm overflow-hidden rounded bg-[var(--line)]">
              <div className="bar h-full origin-left scale-x-0 bg-gradient-to-r from-fxblue via-drinklight to-prune" />
            </div>
            <ol className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className={`step step-${i} flex gap-4`}
                  style={{ opacity: 0.78 }}
                >
                  <span className="dot grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white font-display font-extrabold text-fxink shadow-md">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold sm:text-xl">
                      {s.t}
                    </p>
                    <p className="text-sm text-[#5c4b3e] sm:text-base">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p
              className="done mt-5 hidden text-sm text-[var(--muted)] sm:block"
              style={{ opacity: 0, transform: "translateY(10px)" }}
            >
              Regla de oro barista: el ratio estándar 1:2 consiste en meter 18 g
              de café seco en el portafiltro y detener la extracción cuando la
              báscula marque 36 g de líquido en 25 a 30 segundos.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[360px] lg:max-w-[420px]">
            <svg
              viewBox="0 0 400 440"
              className="relative w-full drop-shadow-[0_30px_50px_rgba(70,35,10,0.25)]"
              role="img"
              aria-label="Animación interactiva de una cafetera espresso compacta: manómetro de presión, portafiltro bottomless, extracción de crema avellana y latte art"
            >
              <defs>
                <linearGradient id="ss-day" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#faf5ef" />
                  <stop offset="1" stopColor="#f3e5d3" />
                </linearGradient>
                <linearGradient id="ss-night" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#1e1510" />
                  <stop offset="0.65" stopColor="#2c1a10" />
                  <stop offset="1" stopColor="#3d1607" />
                </linearGradient>
                <clipPath id="ss-panel">
                  <rect x="0" y="0" width="400" height="440" rx="36" />
                </clipPath>
              </defs>
              <g clipPath="url(#ss-panel)">
                <rect width="400" height="440" fill="url(#ss-day)" />
                <rect
                  className="night"
                  width="400"
                  height="440"
                  fill="url(#ss-night)"
                  opacity="0"
                />

                {/* Chasis Acero Inoxidable de la Cafetera Compacta (15 cm) */}
                <rect
                  x="110"
                  y="72"
                  width="180"
                  height="324"
                  rx="24"
                  fill="#e4e4e7"
                  stroke="#a1a1aa"
                  strokeWidth="3"
                />
                <rect
                  x="122"
                  y="84"
                  width="156"
                  height="110"
                  rx="16"
                  fill="#27272a"
                />

                {/* Manómetro Frontal Analógico (estilo CASABREWS CM5418) */}
                <circle
                  cx="200"
                  cy="135"
                  r="38"
                  fill="#fff"
                  stroke="#c87d32"
                  strokeWidth="4"
                />
                <path
                  d="M172 145 A30 30 0 0 1 228 145"
                  fill="none"
                  stroke="#e5a93c"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <line
                  className="gauge-needle"
                  x1="200"
                  y1="135"
                  x2="174"
                  y2="145"
                  stroke="#b91c1c"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="200" cy="135" r="4.5" fill="#1e1510" />
                <text
                  x="200"
                  y="162"
                  textAnchor="middle"
                  fontFamily="Outfit, sans-serif"
                  fontWeight="800"
                  fontSize="8.5"
                  fill="#1e1510"
                >
                  9-15 BAR ESPRESSO
                </text>

                {/* Grupo y Portafiltro Bottomless */}
                <g className="portafilter-group">
                  <rect
                    x="162"
                    y="196"
                    width="76"
                    height="24"
                    rx="6"
                    fill="#52525b"
                  />
                  {/* Mango del portafiltro */}
                  <rect
                    x="236"
                    y="202"
                    width="82"
                    height="12"
                    rx="6"
                    fill="#1e1510"
                  />
                </g>

                {/* Flujo de Espresso Doble / Cono Bottomless */}
                <path
                  className="espresso-stream"
                  d="M192 220 L197 305 L203 305 L208 220 Z"
                  fill="#9e5b18"
                  opacity="0"
                />

                {/* Taza y Báscula Digital Mini (0.1 g) */}
                <rect
                  x="130"
                  y="355"
                  width="140"
                  height="22"
                  rx="6"
                  fill="#18181b"
                  stroke="#e5a93c"
                  strokeWidth="1.5"
                />
                <text
                  x="200"
                  y="370"
                  textAnchor="middle"
                  fontFamily="Outfit, sans-serif"
                  fontWeight="800"
                  fontSize="10"
                  fill="#fef08a"
                >
                  36.0 g · 00:27 s
                </text>

                {/* Taza transparente de doble pared */}
                <path
                  d="M158 292 H242 L235 352 C234 354 228 355 200 355 C172 355 166 354 165 352 Z"
                  fill="#ffffff"
                  fillOpacity="0.92"
                  stroke="#d4d4d8"
                  strokeWidth="2.5"
                />
                {/* Líquido Espresso */}
                <path
                  className="espresso-fill"
                  d="M164 316 H236 L233 351 H167 Z"
                  fill="#3d1607"
                  opacity="0"
                />
                {/* Capa de Crema Avellana */}
                <rect
                  className="crema-layer"
                  x="163"
                  y="302"
                  width="74"
                  height="15"
                  rx="4"
                  fill="#c87d32"
                  opacity="0"
                />
                {/* Corazón de Latte Art */}
                <path
                  className="latte-heart"
                  d="M200 313 C196 307 188 308 190 314 C192 318 200 322 200 322 C200 322 208 318 210 314 C212 308 204 307 200 313 Z"
                  fill="#fffdf9"
                  opacity="0"
                />

                {/* Badge Superior de Resultado Barista */}
                <g
                  className="phone-alert"
                  opacity="0"
                  transform="translate(75 18)"
                >
                  <rect
                    width="250"
                    height="44"
                    rx="14"
                    fill="#ffffff"
                    stroke="#E5A93C"
                    strokeWidth="2.5"
                  />
                  <circle cx="24" cy="22" r="12" fill="#E5A93C" />
                  <text
                    x="24"
                    y="26"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="800"
                    fill="#1e1510"
                  >
                    ☕
                  </text>
                  <text
                    x="44"
                    y="19"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    fontSize="11.5"
                    fill="#1e1510"
                  >
                    Ratio 1:2 Perfecto (18g → 36g)
                  </text>
                  <text
                    x="44"
                    y="33"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                    fontSize="10"
                    fill="#9e5b18"
                  >
                    9 Bares OPV · Microespuma 65 °C
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
