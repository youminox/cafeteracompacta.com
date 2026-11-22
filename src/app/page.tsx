import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";
import ArticleCard from "@/components/ArticleCard";
import ReadingProgress from "@/components/ReadingProgress";
import SplitHeading from "@/components/SplitHeading";
import OpenChatButton from "@/components/OpenChatButton";
import AmazonAffiliateBox from "@/components/AmazonAffiliateBox";
import { JsonLd } from "@/components/Breadcrumbs";
import Hero from "@/components/home/Hero";
import ScrollStory from "@/components/home/ScrollStory";
import PressureExtractionSvg from "@/components/home/PressureExtractionSvg";
import BaristaOrbit, { type OrbitItem } from "@/components/home/BaristaOrbit";
import MetricsCounters, { type MetricItem } from "@/components/home/MetricsCounters";
import CremaComparisonSlider from "@/components/home/CremaComparisonSlider";
import MomentsCarousel, { type Moment } from "@/components/home/MomentsCarousel";
import CoffeeCornerCalculator, {
  type EspressoMachineTier,
} from "@/components/home/CoffeeCornerCalculator";
import { getContextualAmazonProducts } from "@/lib/amazon";
import {
  SITE_URL,
  OG_DEFAULT,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
  BARISTA_DISCLAIMER,
  ambient,
  getAllContent,
  getArticlesIn,
  getByPath,
  getCategories,
  safeHref,
  type Article,
} from "@/lib/content";

export const metadata: Metadata = {
  title:
    "Cafetera Espresso Compacta 2026: CASABREWS CM5418, Breville Bambino y Dedica Arte en Amazon",
  description:
    "Guía en español para comprar tu primera cafetera espresso compacta en Amazon Estados Unidos: reseñas y comparativas de CASABREWS CM5418, Breville Bambino y De’Longhi Dedica Arte, molinos, espumadores, básculas y accesorios compatibles de 51 mm y 54 mm.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    title:
      "Cafetera Espresso Compacta: Comparativas Amazon US, Molinos y Accesorios 2026",
    description:
      "600 guías especializadas y comparativas de las mejores cafeteras espresso compactas en Amazon EE. UU. y España: precio, tamaño en cm y facilidad de uso.",
    images: [
      {
        url: OG_DEFAULT(),
        width: 1200,
        height: 675,
        alt: "Cafetera espresso compacta extrayendo crema avellana en una cocina moderna",
      },
    ],
  },
};

const FAQ = [
  {
    q: "¿Cuál es la mejor primera cafetera espresso compacta para comprar en Amazon Estados Unidos?",
    a: "Depende de tu presupuesto: si buscas la mejor relación calidad-precio por menos de $150, la CASABREWS CM5418 (15 cm de ancho, 20 bares y manómetro frontal) es la n.º 1 en ventas en Amazon US. Si tienes entre $200 y $250 y valoras el diseño italiano ultra-delgado con lanceta profesional para Latte Art, elige la De’Longhi Dedica Arte (EC885M). Y si buscas calidad de cafetería de especialidad con calentamiento ThermoJet en 3 segundos, PID digital y portafiltro de 54 mm (~$299), la Breville Bambino (BES450) es imbatible.",
  },
  {
    q: "¿Qué diferencia hay entre la CASABREWS CM5418, la De’Longhi Dedica Arte y la Breville Bambino?",
    a: "Tanto la CASABREWS CM5418 como la De’Longhi Dedica Arte miden solo 15 cm (5.9 pulgadas) de ancho y utilizan portafiltros de 51 mm (3 orejas); la Casabrews destaca por su manómetro de presión frontal y menor precio, mientras que la Dedica Arte ofrece acabados metálicos superiores y la lanceta MyLatte Art. La Breville Bambino mide 19.5 cm de ancho, usa un portafiltro más ancho de 54 mm (18-19 g de café), calienta en 3 segundos y regula la presión a 9 bares reales con válvula OPV.",
  },
  {
    q: "¿Necesito comprar un molino de café desde el primer día?",
    a: "No es obligatorio el primer día porque las tres cafeteras incluyen filtros presurizados (de doble pared) diseñados para generar espuma/crema con café pre-molido de supermercado. Sin embargo, cuando quieras dar el salto a un espresso real de cafetería, añadir un molino de muelas cónicas para espresso (como el Baratza Encore ESP, Fellow Opus o un manual KINGrinder K6) será la mejora que más transformará el sabor en tu taza.",
  },
  {
    q: "¿Qué medida de accesorios (portafiltro bottomless y tamper) usa cada cafetera?",
    a: "Nunca compres un accesorio sin verificar el diámetro y número de orejas: la CASABREWS CM5418 y la De’Longhi Dedica Arte (EC885M / EC685M) usan accesorios de 51 mm con portafiltro de 3 orejas (la De’Longhi Stilosa usa 51 mm pero de 2 orejas). La Breville Bambino y Bambino Plus usan portafiltros de 54 mm (tamper calibrado de 53.3 mm). Y modelos como la Gaggia Classic Evo Pro, HiBREW H10A o CASABREWS Ultra usan el estándar comercial de 58 mm (tamper de 58.5 mm).",
  },
  {
    q: "¿Por qué una cafetera de 15 bares como la Breville Bambino hace mejor espresso que una de 20 bares?",
    a: "Porque el espresso perfecto se extrae a 9 bares en el portafiltro, no a 20. Las bombas vibratorias italianas de 15 o 20 bares indican la presión máxima teórica de la bomba; la Breville Bambino incorpora una válvula OPV (Over Pressure Valve) que limita la presión a 9 bares constantes para no romper la pastilla de café, además de un chip PID que mantiene el agua a 93 °C exactos.",
  },
  {
    q: "¿Cada cuánto tiempo debo descalcificar mi cafetera espresso compacta?",
    a: "Con agua filtrada o de dureza media, cada 2 a 3 meses (o cada 200 cafés, cuando se enciende la luz naranja/roja de alerta en la Dedica, Bambino o Casabrews). Utiliza siempre descalcificador a base de ácido láctico como De’Longhi EcoDecalk o polvo Urnex Dezcal; nunca uses vinagre blanco porque ataca las juntas de silicona y deja olor persistente en el Thermoblock.",
  },
  {
    q: "¿Qué báscula digital cabe en la bandeja pequeña de una cafetera compacta?",
    a: "Las bandejas de goteo de la Dedica (15 cm) y la Casabrews tienen solo 9 a 10 cm de fondo útil. Necesitas una báscula mini de espresso de ~10×10 cm con precisión de 0.1 gramos y temporizador automático, como la TIMEMORE Black Mirror Mini, la SearchPean Tiny 2S o la Wacaco Exagram Pro.",
  },
];

const CLAIMS = [
  "CASABREWS CM5418 (20 Bar + Manómetro)",
  "Breville Bambino ThermoJet 3 Segundos",
  "De’Longhi Dedica Arte (15 cm Slim)",
  "Accesorios Compatibles 51 mm / 54 mm / 58 mm",
  "Molinos Baratza Encore ESP & Fellow Opus",
  "Válvula OPV 9 Bares + Control PID 93 °C",
  "Microespuma Sedosa a 65 °C para Latte Art",
  "Ofertas Verificadas en Amazon EE. UU. y España",
];

const CLAIMS_2 = [
  "Breville Bambino Plus (Vapor MilQ)",
  "De’Longhi Dedica Maestro Plus",
  "Gaggia Classic Evo Pro 58 mm",
  "HiBREW H10A PID Programable",
  "Ninja Luxe Café ES601 3-en-1",
  "Turin DF54 Single Dose Flat Burr",
  "Dreo BaristaMaker & NanoFoamer PRO",
  "TIMEMORE Black Mirror Mini 0.1g",
];

const ICONS: Record<string, string> = {
  coffee: "☕",
  scale: "⚖️",
  trophy: "🏆",
  cog: "⚙️",
  sparkles: "🥛",
  sliders: "🔩",
  flame: "🔥",
  shield: "🛡️",
  wrench: "🔧",
  home: "🏠",
  droplet: "💧",
  cpu: "🌡️",
};

export default function Home() {
  const cats = getCategories();
  const all = getAllContent();
  const heroImg = ambient("home-hero-cafetera", "/img/ambiente/home-hero-cafetera.webp");

  const orbit: OrbitItem[] = [
    {
      k: "cafetera",
      name: "Cafetera Compacta (15–19 cm)",
      img: null,
      icon: "☕",
      role: "Thermoblock o ThermoJet con 9 a 20 bares en chasis reducido",
      d: "El corazón de tu estación. Modelos de 15 cm como la CASABREWS CM5418 y la De’Longhi Dedica Arte o de 19.5 cm como la Breville Bambino caben en cualquier apartamento y calientan entre 3 y 35 segundos.",
      href: safeHref("/mejores-cafeteras-y-accesorios/mejores-cafeteras-espresso-compactas-amazon/"),
    },
    {
      k: "molino",
      name: "Molino de Muelas para Espresso",
      img: null,
      icon: "⚙️",
      role: "Muelas cónicas o planas con micro-ajustes para 25–30 s",
      d: "El secreto del 70% del sabor. Un molino compacto como el Baratza Encore ESP (pasos 1 a 20), el Fellow Opus o el Turin DF54 muele al instante con la granulometría exacta para generar crema real.",
      href: safeHref("/mejores-cafeteras-y-accesorios/mejores-molinos-de-cafe-compactos-para-espresso/"),
    },
    {
      k: "portafiltro",
      name: "Portafiltro Bottomless (51/54 mm)",
      img: null,
      icon: "🔩",
      role: "Extracción despresurizada sin fondo para ver el cono de crema",
      d: "Al reemplazar el portafiltro presurizado de fábrica por un Bottomless de 51 mm (3 orejas para Casabrews/Dedica) o 54 mm (Breville Bambino) con cesta IMS, desbloqueas todo el cuerpo y dulzor del grano.",
      href: safeHref("/mejores-cafeteras-y-accesorios/mejores-portafiltros-bottomless-sin-fondo-51mm-54mm/"),
    },
    {
      k: "bascula",
      name: "Báscula Mini 0.1 g + Auto-Timer",
      img: null,
      icon: "⚖️",
      role: "Control exacto del ratio 1:2 (18 g seco → 36 g líquido)",
      d: "Una báscula ultra-compacta de 10×10 cm (TIMEMORE Mini o SearchPean Tiny 2S) entra en la bandeja estrecha de tu cafetera y mide al décimo de gramo tu dosis y tiempo de extracción.",
      href: safeHref("/mejores-cafeteras-y-accesorios/mejores-basculas-digitales-compactas-espresso/"),
    },
    {
      k: "tamper",
      name: "Tamper Calibrado (30 lb)",
      img: null,
      icon: "🎯",
      role: "Prensado 100% horizontal con muelle dinamométrico",
      d: "Los tampers de plástico que vienen en la caja doblan la cama de café. Un tamper con muelle y tope de borde (Normcore V4 de 51 mm, 53.3 mm o 58.5 mm) garantiza la misma presión siempre.",
      href: safeHref("/mejores-cafeteras-y-accesorios/mejores-tampers-calibrados-51mm-53mm-58mm/"),
    },
    {
      k: "wdt",
      name: "Agujas WDT 0.3 mm + Puck Screen",
      img: null,
      icon: "🪡",
      role: "Eliminación de grumos, cero channeling y ducha limpia",
      d: "Remover el café con agujas de acupuntura de 0.3 mm (técnica WDT) y colocar una malla Puck Screen de 1.7 mm encima distribuye el agua de forma uniforme y evita chorros a presión.",
      href: safeHref("/mejores-cafeteras-y-accesorios/mejores-distribuidores-wdt-y-dosificadores-magneticos/"),
    },
    {
      k: "vapor",
      name: "Lanceta Barista & Espumador",
      img: null,
      icon: "🥛",
      role: "Emulsión de microespuma sedosa a 60–65 °C sin burbujas",
      d: "Ya sea con la lanceta MyLatte Art de la Dedica Arte, el vapor automático MilQ de la Bambino Plus o un espumador externo Dreo BaristaMaker / NanoFoamer PRO, logras leche brillante para dibujar.",
      href: safeHref("/mejores-cafeteras-y-accesorios/mejores-espumadores-de-leche-latte-art/"),
    },
    {
      k: "agua",
      name: "Grano Fresco + Descalcificador",
      img: null,
      icon: "💧",
      role: "Agua de 50–100 ppm y limpieza con EcoDecalk y Cafiza",
      d: "El 98% del espresso es agua. Usar agua filtrada y descalcificar cada 60-90 días con ácido láctico (EcoDecalk / Urnex Dezcal) mantiene la presión de tu Thermoblock intacta por años.",
      href: safeHref("/mejores-cafeteras-y-accesorios/mejores-descalcificadores-y-limpiadores-cafetera-espresso/"),
    },
  ];

  const metrics: MetricItem[] = [
    {
      v: 14.9,
      dec: 1,
      u: "cm",
      l: "Ancho mínimo en encimera",
      pct: 96,
      note: "De’Longhi Dedica Arte y CASABREWS CM5418",
    },
    {
      v: 3,
      dec: 0,
      u: "seg",
      l: "Precalentamiento ThermoJet",
      pct: 98,
      note: "Breville Bambino y Bambino Plus",
    },
    {
      v: 9,
      dec: 0,
      u: "Bar",
      l: "Presión ideal en el grupo (OPV)",
      pct: 92,
      note: "Extracción sin amargor ni canalización",
    },
    {
      v: 93,
      dec: 0,
      u: "°C",
      l: "Temperatura estable con PID",
      pct: 94,
      note: "199–200 °F controlados electrónicamente",
    },
    {
      v: 27,
      dec: 0,
      u: "seg",
      l: "Tiempo de shot ratio 1:2",
      pct: 90,
      note: "18 g de café molido → 36 g de espresso",
    },
    {
      v: 65,
      dec: 0,
      u: "°C",
      l: "Punto dulce de la leche vaporizada",
      pct: 89,
      note: "Máximo dulzor natural de la lactosa",
    },
  ];

  const moments: Moment[] = [
    {
      img: ambient("home-casabrews-cm5418", heroImg),
      t: "CASABREWS CM5418 a Fondo",
      d: "Cómo leer su manómetro de 20 bares y qué accesorios de 51 mm la suben de nivel por menos de $150.",
      href: safeHref("/resenas-cafeteras/casabrews-cm5418-espresso/"),
      alt: "Cafetera CASABREWS CM5418 de acero inoxidable con manómetro frontal",
    },
    {
      img: ambient("home-breville-bambino", heroImg),
      t: "Breville Bambino vs. Bambino Plus",
      d: "ThermoJet en 3 segundos y grupo de 54 mm: ¿vale la pena pagar extra por el vaporizador automático MilQ?",
      href: safeHref("/comparativas/breville-bambino-vs-breville-bambino-plus/"),
      alt: "Cafetera Breville Bambino compacta extrayendo espresso",
    },
    {
      img: ambient("home-delonghi-dedica", heroImg),
      t: "De’Longhi Dedica Arte (15 cm)",
      d: "Por qué la nueva lanceta MyLatte Art convierte a la cafetera más delgada en una máquina de Latte Art.",
      href: safeHref("/resenas-cafeteras/delonghi-dedica-arte-ec885m/"),
      alt: "Cafetera De'Longhi Dedica Arte EC885M de 15 cm de ancho",
    },
    {
      img: ambient("home-molinos-espresso", heroImg),
      t: "Molinos Compactos para Espresso",
      d: "Baratza Encore ESP vs. Fellow Opus vs. Turin DF54: cuál cabe junto a tu cafetera y muele más fino.",
      href: safeHref("/comparativas/baratza-encore-esp-vs-fellow-opus/"),
      alt: "Molino de café compacto para espresso junto a un portafiltro",
    },
    {
      img: ambient("home-accesorios-51-54", heroImg),
      t: "Guía 51 mm vs. 54 mm vs. 58 mm",
      d: "Tabla exacta de orejas y milímetros para comprar tu portafiltro Bottomless y tamper sin equivocarte.",
      href: safeHref("/comparativas/portafiltro-51mm-vs-54mm-vs-58mm/"),
      alt: "Portafiltro sin fondo bottomless, tamper calibrado y distribuidor WDT",
    },
    {
      img: ambient("home-latte-art", heroImg),
      t: "Microespuma y Latte Art en Casa",
      d: "Técnica del vórtice a 65 °C con leche entera o de avena barista y los mejores espumadores automáticos.",
      href: safeHref("/mejores-cafeteras-y-accesorios/mejores-espumadores-de-leche-latte-art/"),
      alt: "Vertido de microespuma de leche formando un corazón de latte art",
    },
    {
      img: ambient("home-coffee-corner", heroImg),
      t: "Coffee Corner en Cocinas Pequeñas",
      d: "Cómo montar una estación completa con cafetera, molino, báscula y knock box en menos de 35 cm.",
      href: safeHref("/mejores-cafeteras-y-accesorios/mejores-cafeteras-espresso-ultra-delgadas-15-cm/"),
      alt: "Rincón de café compacto organizado en una encimera pequeña",
    },
  ];

  const calculatorOptions: EspressoMachineTier[] = [
    {
      key: "casabrews",
      label: "CASABREWS CM5418 (Calidad/Precio)",
      widthCm: 15.0,
      portafilterMm: 51,
      heatingSec: 35,
      img: ambient("home-casabrews-cm5418", heroImg),
      alt: "Cafetera espresso compacta CASABREWS CM5418 con manómetro",
      idealFor:
        "Quienes buscan su primera cafetera en Amazon EE. UU. por menos de $150 con manómetro visual para aprender a calibrar la molienda.",
      reviewHref: safeHref("/resenas-cafeteras/casabrews-cm5418-espresso/"),
      productKey: "CASABREWS_CM5418",
    },
    {
      key: "bambino",
      label: "Breville Bambino (Mejor Barista 54 mm)",
      widthCm: 19.5,
      portafilterMm: 54,
      heatingSec: 3,
      img: ambient("home-breville-bambino", heroImg),
      alt: "Cafetera espresso compacta Breville Bambino BES450",
      idealFor:
        "Amantes del café de especialidad que quieren calentamiento instantáneo en 3 segundos, control térmico PID y válvula OPV a 9 bares reales.",
      reviewHref: safeHref("/resenas-cafeteras/breville-bambino-bes450/"),
      productKey: "BREVILLE_BAMBINO",
    },
    {
      key: "dedica",
      label: "De’Longhi Dedica Arte (15 cm + Latte Art)",
      widthCm: 14.9,
      portafilterMm: 51,
      heatingSec: 35,
      img: ambient("home-delonghi-dedica", heroImg),
      alt: "Cafetera espresso ultra-delgada De'Longhi Dedica Arte EC885M",
      idealFor:
        "Cocinas con mínimo espacio disponible que buscan chasis metálico italiano de 14.9 cm y lanceta de vapor comercial MyLatte Art.",
      reviewHref: safeHref("/resenas-cafeteras/delonghi-dedica-arte-ec885m/"),
      productKey: "DELONGHI_DEDICA_ARTE",
    },
  ];

  const POPULAR_PATHS = [
    "/mejores-cafeteras-y-accesorios/mejores-cafeteras-espresso-compactas-amazon/",
    "/comparativas/casabrews-cm5418-vs-delonghi-dedica-vs-breville-bambino/",
    "/resenas-cafeteras/casabrews-cm5418-espresso/",
    "/resenas-cafeteras/breville-bambino-bes450/",
    "/resenas-cafeteras/delonghi-dedica-arte-ec885m/",
    "/mejores-cafeteras-y-accesorios/mejores-molinos-de-cafe-compactos-para-espresso/",
  ];
  const popular: Article[] = POPULAR_PATHS.map((p) => getByPath(p)).filter(
    Boolean
  ) as Article[];
  for (const a of all) {
    if (popular.length >= 6) break;
    if (!a.isPillar && !popular.includes(a)) popular.push(a);
  }

  const homeAmazon = getContextualAmazonProducts(
    "home",
    "mejores-cafeteras-y-accesorios",
    "Mejores Cafeteras Espresso Compactas en Amazon"
  );

  return (
    <>
      <ReadingProgress />
      <Header variant="dark" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${SITE_URL}/#webpage`,
              url: `${SITE_URL}/`,
              name: "Cafetera Espresso Compacta: Comparativas Amazon US, Molinos y Accesorios 2026",
              inLanguage: "es",
              isPartOf: { "@id": `${SITE_URL}/#website` },
              primaryImageOfPage: `${SITE_URL}${heroImg}`,
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/#faq`,
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />
      <main>
        {/* 1–2. Hero 3D Tilt + Partículas + Buscador */}
        <Hero heroImage={heroImg} />

        {/* 3. Doble Cinta Marquee en sentido opuesto */}
        <div className="relative border-b border-[var(--line)] bg-white py-5">
          <div className="marquee">
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track font-display text-lg font-bold text-fxink/80"
                aria-hidden={k === 1}
              >
                {CLAIMS.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-gradient-to-br from-fxlime to-fxblue" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="marquee reverse mt-3" aria-hidden>
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track text-sm font-semibold uppercase tracking-[0.14em] text-prune/75"
              >
                {CLAIMS_2.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-drinklight" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 4. ¿Por qué elegir una Cafetera Espresso Compacta? + Mosaico Spotlight (.spot) */}
        <section id="que-es" className="wrap py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Guía de Compra en Español para Amazon EE. UU.
              </span>
              <SplitHeading
                text="Espresso real con crema avellana,"
                accent={{
                  text: "sin sacrificar tu encimera",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                Una <strong className="text-fxink">cafetera espresso compacta moderna</strong>{" "}
                combina bloques térmicos de calentamiento ultrarrápido
                (Thermoblock o ThermoJet de 3 segundos), bombas italianas de 15
                a 20 bares y lancetas de vapor articuladas en un chasis de apenas{" "}
                <strong className="text-fxink">15 a 19.5 cm de ancho</strong>{" "}
                que cabe en cualquier cocina, estudio o apartamento.
              </p>
              <div
                className="mt-6 rounded-2xl border border-amber-300/60 bg-amber-50/70 p-5"
                data-reveal
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-900">
                  ☕ Cómo acertar al comprar tu primera cafetera en Amazon
                </p>
                <ul className="mt-2 space-y-1.5 text-[0.95rem] text-fxink">
                  <li>
                    • <strong>Menos de $150 USD (Mejor iniciación):</strong> la{" "}
                    <strong>CASABREWS CM5418</strong> te ofrece 15 cm de ancho,
                    cuerpo de acero y un manómetro frontal que te enseña
                    visualmente si estás moliendo bien.
                  </li>
                  <li>
                    • <strong>~$200–$250 USD (Diseño slim + Latte Art):</strong>{" "}
                    la <strong>De’Longhi Dedica Arte (EC885M)</strong> sustituye
                    el antiguo panarello por la lanceta profesional MyLatte Art.
                  </li>
                  <li>
                    • <strong>~$299 USD (Estándar barista 9 Bar OPV):</strong>{" "}
                    la <strong>Breville Bambino (BES450)</strong> calienta en 3
                    segundos, controla los 93 °C por PID y usa portafiltro de 54
                    mm.
                  </li>
                  <li>
                    • <strong>Compatibilidad garantizada:</strong> te indicamos
                    los accesorios exactos de <strong>51 mm</strong>,{" "}
                    <strong>54 mm</strong> o <strong>58 mm</strong> para tu
                    máquina.
                  </li>
                </ul>
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href="/comparativas/casabrews-cm5418-vs-delonghi-dedica-vs-breville-bambino/"
                  className="btn btn-buy shine"
                  data-magnetic
                >
                  Comparativa: Casabrews vs Bambino vs Dedica
                </Link>
                <Link
                  href="/mejores-cafeteras-y-accesorios/mejores-molinos-de-cafe-compactos-para-espresso/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Ver mejores molinos compactos
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="relative col-span-2 aspect-[16/8] overflow-hidden rounded-3xl shadow-[0_30px_60px_-35px_rgba(30,15,5,0.6)]"
                data-reveal
              >
                <Image
                  src={ambient("home-coffee-corner", heroImg)}
                  alt="Estación de café espresso compacta con molino y accesorios barista en una cocina moderna"
                  fill
                  sizes="(max-width:1024px) 100vw, 600px"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-fxink">
                  Coffee Corner completo en menos de 35 cm
                </span>
              </div>
              {[
                [
                  "📐",
                  "Chasis Slim 15 cm",
                  "Menos ancho que una caja de zapatos y altura libre para caber bajo alacenas de cocina en EE. UU.",
                ],
                [
                  "⚡",
                  "Lista en 3 a 35 s",
                  "Olvídate de esperar 20 minutos a que caliente una caldera antigua antes de ir a trabajar.",
                ],
                [
                  "🔩",
                  "51 mm, 54 mm y 58 mm",
                  "Guías verificadas de portafiltros Bottomless de 2 y 3 orejas, cestas IMS y tampers con muelle.",
                ],
                [
                  "🥛",
                  "Microespuma 65 °C",
                  "Lancetas de vapor frío al tacto y espumadores inteligentes para leche entera y de avena.",
                ],
              ].map(([e, t, d], i) => (
                <div
                  key={t}
                  className="card spot p-5"
                  data-reveal
                  data-reveal-delay={String(i)}
                >
                  <p className="text-2xl" aria-hidden>
                    {e}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold leading-tight">
                    {t}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ScrollStory: Las 4 fases de extracción y latte art */}
        <ScrollStory />

        {/* 6. Ingeniería de Presión OPV y Control Térmico PID (PressureExtractionSvg) */}
        <section className="relative isolate overflow-hidden bg-[#120c08] py-24 text-white">
          <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-fxblue/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-prune/40 blur-3xl" />
          <div className="hero-grid opacity-50" />
          <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="eyebrow !text-fxlime" data-reveal>
                Ciencia Barista sin Mitos Comerciales
              </span>
              <SplitHeading
                text="La verdad sobre los 15 y 20 bares"
                accent={{
                  text: "frente a los 9 bares reales y el PID",
                  className: "text-gradient",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-white/75" data-reveal>
                Muchos anuncios presumen de «20 bares», pero el secreto de un
                espresso dulce y espeso reside en tres tecnologías que
                analizamos en{" "}
                <strong className="text-white">CafeteraCompacta.com</strong>:{" "}
                <strong className="text-white">
                  pre-infusión a baja presión (3–4 bares)
                </strong>{" "}
                para asentar la pastilla,{" "}
                <strong className="text-white">
                  regulación OPV a 9 bares reales
                </strong>{" "}
                durante la extracción y{" "}
                <strong className="text-white">
                  estabilidad térmica PID a 93 °C (200 °F)
                </strong>
                .
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3" data-reveal>
                {[
                  ["🌡️", "Chip PID 93 °C"],
                  ["⏲️", "9 Bares OPV"],
                  ["💧", "Pre-Infusión 4 s"],
                ].map(([e, t]) => (
                  <div key={t} className="glass p-4 text-center">
                    <p className="text-2xl" aria-hidden>
                      {e}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{t}</p>
                  </div>
                ))}
              </div>
              <div className="glass mt-6 p-5 text-sm text-white/75" data-reveal>
                <strong className="text-white">
                  ¿Cómo aprovechar una cafetera de 20 bares como la CASABREWS
                  CM5418?
                </strong>{" "}
                Su manómetro frontal es tu mejor aliado: cuando usas el filtro
                presurizado, la válvula interna regula el flujo; y cuando pasas
                a un portafiltro Bottomless de 51 mm, ajustas el molino para que
                la aguja se mantenga exactamente en el centro de la{" "}
                <em>Zona Espresso</em>.
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href={safeHref(
                    "/resenas-cafeteras/casabrews-cm5418-espresso/"
                  )}
                  className="btn btn-glass"
                  data-magnetic
                >
                  Análisis del manómetro CASABREWS CM5418
                </Link>
                <Link
                  href={safeHref(
                    "/resenas-cafeteras/breville-bambino-bes450/"
                  )}
                  className="btn btn-glass"
                  data-magnetic
                >
                  Cómo funciona el ThermoJet de la Bambino
                </Link>
              </div>
            </div>
            <div data-reveal>
              <PressureExtractionSvg />
            </div>
          </div>
        </section>

        {/* 7. Órbita interactiva de los 8 componentes del rincón de café */}
        <section className="wrap py-24">
          <BaristaOrbit items={orbit} center={heroImg} />
        </section>

        {/* 8. Contadores animados + Tabla comparativa de especificaciones reales */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#23140b] via-[#120c08] to-[#3d1607] py-24 text-white">
          <div className="hero-aurora opacity-40" />
          <div className="wrap relative grid items-start gap-12 lg:grid-cols-[1.18fr_1fr]">
            <div>
              <span className="eyebrow !text-fxlime" data-reveal>
                Medidas y Parámetros Reales
              </span>
              <SplitHeading
                text="Los números exactos antes de"
                accent={{ text: "comprar en Amazon", className: "text-gradient" }}
                className="section-title mt-3"
              />
              <p className="mt-4 max-w-xl text-white/70" data-reveal>
                Medimos el ancho real en centímetros y pulgadas, el diámetro del
                portafiltro para que aciertes con tus accesorios, el tiempo de
                arranque en frío y el tipo de vaporizador de cada modelo.
              </p>
              <div className="mt-8">
                <MetricsCounters data={metrics} />
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/comparativas/casabrews-cm5418-vs-delonghi-dedica-arte/"
                  className="btn btn-lime shine text-sm"
                  data-magnetic
                >
                  CASABREWS CM5418 vs De’Longhi Dedica Arte
                </Link>
                <Link
                  href="/comparativas/breville-bambino-vs-delonghi-dedica-arte/"
                  className="btn btn-glass text-sm"
                  data-magnetic
                >
                  Breville Bambino vs Dedica Arte
                </Link>
              </div>
            </div>

            <div
              className="rounded-3xl border border-white/15 bg-white/95 p-5 sm:p-6 text-fxink shadow-2xl"
              data-reveal
            >
              <span className="inline-block rounded-full bg-fxsky px-3 py-1 text-xs font-extrabold text-fxbluedeep">
                📊 Tabla Comparativa Oficial Amazon US & ES
              </span>
              <h3 className="mt-2 font-display text-xl font-extrabold">
                Top 6 Cafeteras Compactas Cara a Cara
              </h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--line)] bg-fxsky text-fxink font-display">
                      <th className="p-2.5">Modelo</th>
                      <th className="p-2.5">Ancho</th>
                      <th className="p-2.5">Filtro</th>
                      <th className="p-2.5">Ventaja Clave</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)]">
                    <tr>
                      <td className="p-2.5 font-bold">CASABREWS CM5418</td>
                      <td className="p-2.5">15.0 cm</td>
                      <td className="p-2.5 font-bold text-amber-800">51 mm (3)</td>
                      <td className="p-2.5">Manómetro + Precio #1</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Breville Bambino</td>
                      <td className="p-2.5">19.5 cm</td>
                      <td className="p-2.5 font-bold text-amber-800">54 mm (3)</td>
                      <td className="p-2.5">ThermoJet 3 s + PID 9 Bar</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">De’Longhi Dedica Arte</td>
                      <td className="p-2.5">14.9 cm</td>
                      <td className="p-2.5 font-bold text-amber-800">51 mm (3)</td>
                      <td className="p-2.5">Slim + Lanceta MyLatte Art</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Breville Bambino Plus</td>
                      <td className="p-2.5">19.5 cm</td>
                      <td className="p-2.5 font-bold text-amber-800">54 mm (3)</td>
                      <td className="p-2.5">Vapor Automático MilQ</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Gaggia Classic Evo Pro</td>
                      <td className="p-2.5">23.0 cm</td>
                      <td className="p-2.5 font-bold text-amber-800">58 mm (2)</td>
                      <td className="p-2.5">Grupo Comercial + Caldera</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">HiBREW H10A</td>
                      <td className="p-2.5">23.0 cm</td>
                      <td className="p-2.5 font-bold text-amber-800">58 mm (2)</td>
                      <td className="p-2.5">PID Programable + 58 mm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[11px] text-[var(--muted)]">
                Nota: el número entre paréntesis indica las orejas del
                portafiltro (ej. 51 mm de 3 orejas en Casabrews CM5418 y Dedica
                Arte).
              </p>
            </div>
          </div>
        </section>

        {/* 9. Comparador interactivo Antes ↔ Después (Filtro Presurizado vs Portafiltro Bottomless) */}
        <section className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Crece a tu propio ritmo
              </span>
              <SplitHeading
                text="Fácil desde el primer día,"
                accent={{
                  text: "profesional cuando agregas molino y bottomless",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
            </div>
            <p className="text-lg text-[var(--muted)]" data-reveal>
              Arrastra el control: recién sacada de la caja puedes usar café
              molido con el <strong className="text-fxink">filtro presurizado</strong>;
              y cuando sumes un molino de espresso y un{" "}
              <strong className="text-fxink">portafiltro Bottomless de 51 o 54 mm</strong>,
              extraerás crema tigreada de cafetería de especialidad.
            </p>
          </div>
          <div data-reveal>
            <CremaComparisonSlider />
          </div>
        </section>

        {/* 10. MomentsCarousel 4:5 */}
        <section className="overflow-hidden bg-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Guías visuales paso a paso
              </span>
              <SplitHeading
                text="Domina cada detalle de tu"
                accent={{
                  text: "rincón de café compacto",
                  className: "text-fxbluedeep",
                }}
                className="section-title mt-3"
              />
            </div>
            <MomentsCarousel items={moments} />
          </div>
        </section>

        {/* 11. Calculadora de Coffee Corner y Ahorro Anual + Recomendador Amazon */}
        <section id="calculadora" className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Simulador de Inversión Barista
              </span>
              <SplitHeading
                text="Tu cafetera compacta se paga sola"
                accent={{
                  text: "en menos de 30 a 45 días",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
            </div>
            <ul className="grid gap-2 text-[var(--muted)] text-sm" data-reveal>
              {[
                "Compara CASABREWS CM5418, Breville Bambino y De’Longhi Dedica Arte",
                "Verifica ancho en cm, diámetro de portafiltro y tiempo de calentamiento",
                "Enlaces directos a Amazon.com (EE. UU.) y Amazon.es (España)",
                "Barista IA en línea (modelo mini rápido) para armar tu kit completo",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-fxlime/25 text-sm text-[#6b2d14]">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <CoffeeCornerCalculator options={calculatorOptions} />
          </div>

          {/* Vitrina Amazon Showcase en la Home */}
          <div className="mt-12" data-reveal>
            <AmazonAffiliateBox
              variant="showcase"
              sectionTitle={homeAmazon.sectionTitle}
              sectionSubtitle={homeAmazon.sectionSubtitle}
              products={homeAmazon.products}
              source="home"
            />
          </div>
        </section>

        {/* 12. Bento Grid de los 12 Silos + Las 6 Guías Más Consultadas */}
        <section className="bg-gradient-to-b from-white to-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Arquitectura de 12 Silos Temáticos · 600 Artículos
              </span>
              <SplitHeading
                text="Explora nuestras 600 guías"
                accent={{
                  text: "sin canibalización y 100% prácticas",
                  className: "text-fxbluedeep",
                }}
                className="section-title mt-3"
              />
            </div>
            <div className="grid auto-rows-[minmax(190px,auto)] gap-5 md:grid-cols-2 lg:grid-cols-4">
              {cats.map((c, i) => {
                const count = getArticlesIn(c.slug).length;
                const big = i === 0;
                const wide = i === 1 || i === 2;
                return (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}/`}
                    className={`card spot group flex flex-col p-6 sm:p-7 ${
                      big
                        ? "spot-dark border-transparent bg-gradient-to-br from-[#23140b] via-[#6b2d14] to-[#c87d32] text-white md:col-span-2 lg:row-span-2"
                        : ""
                    } ${wide ? "lg:col-span-2" : ""}`}
                    data-reveal
                    data-reveal-delay={String(i % 4)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${
                          big ? "bg-white/15" : "bg-fxsky"
                        }`}
                        aria-hidden
                      >
                        {ICONS[c.icon] || "☕"}
                      </span>
                      <div className="flex items-center gap-2">
                        {c.isTransactional && (
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                              big
                                ? "bg-amber-400 text-slate-950"
                                : "bg-amber-100 text-amber-900"
                            }`}
                          >
                            🛒 Transaccional Amazon
                          </span>
                        )}
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            big ? "text-fxlime" : "text-fxbluedeep"
                          }`}
                        >
                          {count} guías
                        </span>
                      </div>
                    </div>
                    <h3
                      className={`mt-5 font-display font-extrabold ${
                        big ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
                      }`}
                    >
                      {c.name}
                    </h3>
                    <p
                      className={`mt-2 text-sm ${
                        big ? "text-white/80" : "text-[var(--muted)]"
                      }`}
                    >
                      {c.description}
                    </p>
                    {big && (
                      <ul className="mt-6 space-y-2 text-sm text-white/85">
                        {getArticlesIn(c.slug)
                          .slice(0, 6)
                          .map((a) => (
                            <li key={a.path}>→ {a.title}</li>
                          ))}
                      </ul>
                    )}
                    <span
                      className={`mt-auto pt-5 text-sm font-semibold ${
                        big ? "text-fxlime" : "text-fxbluedeep"
                      }`}
                    >
                      Explorar silo completo →
                    </span>
                  </Link>
                );
              })}
            </div>

            {popular.length > 0 && (
              <div className="mt-16">
                <h3
                  className="font-display text-2xl font-extrabold sm:text-3xl"
                  data-reveal
                >
                  Las 6 reseñas y comparativas más consultadas
                </h3>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {popular.slice(0, 6).map((a) => (
                    <div key={a.path} data-reveal>
                      <ArticleCard a={a} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 13. Criterio Editorial E-E-A-T de CARLOS LINGAN BORJA */}
        <section className="wrap py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Rigor Técnico & Transparencia
              </span>
              <SplitHeading
                text="Análisis barista al milímetro,"
                accent={{
                  text: "pensado para compradores en Amazon",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                Dirigido por <strong className="text-fxink">{LEGAL_OWNER}</strong>{" "}
                ({LEGAL_LOCATION} ·{" "}
                <a
                  href={`mailto:${LEGAL_EMAIL}`}
                  className="text-fxblue underline"
                >
                  {LEGAL_EMAIL}
                </a>
                ), en CafeteraCompacta.com verificamos medidas reales en
                encimera, compatibilidad de portafiltros de 51 mm (2 y 3
                orejas), 54 mm y 58 mm, temperatura de extracción y rendimiento
                de espumado para que compres en Amazon con total seguridad.
              </p>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href="/politica-editorial/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Nuestra metodología barista
                </Link>
                <Link
                  href="/sobre-nosotros/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Sobre Carlos Lingan Borja
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card spot p-6" data-reveal>
                <span className="inline-flex rounded-full bg-fxlime/25 px-3 py-1 text-xs font-bold text-[#6b2d14]">
                  ✓ Lo que verificamos en cada cafetera
                </span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>• Ancho, fondo y altura bajo gabinetes de cocina</li>
                  <li>• Diámetro exacto de cesta y orejas del portafiltro</li>
                  <li>• Estabilidad térmica (PID, ThermoJet y Thermoblock)</li>
                  <li>• Potencia de vapor para emulsionar leche y avena</li>
                </ul>
              </div>
              <div
                className="card spot p-6"
                data-reveal
                data-reveal-delay="1"
              >
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                  🛒 Transparencia Amazon Associates
                </span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>• Enlaces directos a Amazon.com (cafeteracompacta-20)</li>
                  <li>• Soporte dual para Amazon.es (cafeteracompacta-21)</li>
                  <li>• Recomendación de molinos y accesorios 100% compatibles</li>
                  <li>• Nota legal: {BARISTA_DISCLAIMER}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 14. FAQ */}
        <section className="wrap pb-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Preguntas frecuentes
              </span>
              <SplitHeading
                text="Todo lo que debes saber antes de elegir tu cafetera"
                className="section-title mt-3"
              />
              <p className="mt-4 text-[var(--muted)]" data-reveal>
                ¿Dudas entre la CASABREWS CM5418, la Breville Bambino o la
                De’Longhi Dedica Arte? Nuestro Barista IA te responde al
                instante.
              </p>
              <div className="mt-6 flex flex-wrap gap-3" data-reveal>
                <OpenChatButton
                  label="Preguntar al Barista IA"
                  className="btn btn-buy"
                />
                <Link href="/comparativas/" className="btn btn-ghost">
                  Ver todas las comparativas
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="card card-static group p-5 open:shadow-lg"
                  data-reveal
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fxsky text-fxbluedeep transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[var(--muted)]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 15. CTA Aurora Final */}
        <section className="wrap pb-6">
          <div className="relative isolate overflow-hidden rounded-[36px] bg-gradient-to-br from-[#23140b] via-[#6b2d14] to-[#c87d32] px-6 py-14 text-white sm:px-14 sm:py-20">
            <Image
              src={heroImg}
              alt=""
              fill
              sizes="1200px"
              className="-z-[2] object-cover opacity-20 mix-blend-luminosity"
            />
            <div className="hero-grid opacity-60" />
            <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-drinklight/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-fxlime/25 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.35fr_1fr]">
              <div className="text-center lg:text-left">
                <SplitHeading
                  text="Estrena hoy tu cafetera espresso compacta"
                  accent={{
                    text: "y prepara café de especialidad en casa",
                    className: "text-fxlime",
                  }}
                  className="text-4xl font-extrabold sm:text-5xl"
                />
                <p className="mt-4 text-lg text-white/85">
                  Consulta nuestro ranking actualizado con precios, ofertas y
                  envío rápido en Amazon Estados Unidos (
                  <code>cafeteracompacta-20</code>) y Amazon España (
                  <code>cafeteracompacta-21</code>).
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Link
                    href="/mejores-cafeteras-y-accesorios/mejores-cafeteras-espresso-compactas-amazon/"
                    className="btn btn-lime shine text-base"
                    data-magnetic
                  >
                    🏆 Ver Ranking Top 9 en Amazon
                  </Link>
                  <OpenChatButton
                    label="Pedir recomendación al Barista IA"
                    className="btn btn-glass text-base"
                    magnetic
                  />
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[340px]">
                <div className="absolute inset-[12%] rounded-full bg-white/20 blur-3xl" />
                <div className="float-y relative aspect-[4/3] overflow-hidden rounded-3xl border-2 border-white/25 shadow-2xl">
                  <Image
                    src={heroImg}
                    alt="Cafetera espresso compacta recomendada en Amazon"
                    fill
                    sizes="340px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ClientEffects stickySource="home-sticky" />
    </>
  );
}
