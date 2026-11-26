export const AMAZON_TAG_US = "cafeteracompacta-20";
export const AMAZON_TAG_ES = "cafeteracompacta-21";

export type AmazonStoreRegion = "US" | "ES";

export type AmazonCategoryType =
  | "espresso-machine"
  | "grinder"
  | "frother"
  | "scale"
  | "accessory-51mm"
  | "accessory-54mm"
  | "accessory-58mm"
  | "cleaning-beans";

export interface AmazonProductRecommendation {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  features: string[];
  categoryType: AmazonCategoryType;
  specs?: {
    width: string;
    portafilter: string;
    heating: string;
    pressure: string;
  };
  asinUS?: string;
  asinES?: string;
  queryUS: string;
  queryES: string;
  ctaLabel: string;
}

/**
 * Genera el enlace oficial de afiliado Amazon según la región:
 * - EE. UU. / Latinoamérica / Global (US - Predeterminado): amazon.com con tag=cafeteracompacta-20
 * - España / Europa (ES): amazon.es con tag=cafeteracompacta-21
 */
export function buildAmazonUrl(
  product: AmazonProductRecommendation,
  region: AmazonStoreRegion
): string {
  if (region === "ES") {
    if (product.asinES) {
      return `https://www.amazon.es/dp/${product.asinES}?tag=${AMAZON_TAG_ES}`;
    }
    const q = encodeURIComponent(product.queryES);
    return `https://www.amazon.es/s?k=${q}&tag=${AMAZON_TAG_ES}`;
  }

  if (product.asinUS) {
    return `https://www.amazon.com/dp/${product.asinUS}?tag=${AMAZON_TAG_US}`;
  }
  const q = encodeURIComponent(product.queryUS);
  return `https://www.amazon.com/s?k=${q}&tag=${AMAZON_TAG_US}`;
}

/**
 * Detecta automáticamente la región del visitante.
 * Por defecto prioriza Amazon Estados Unidos ("US") y activa "ES" si navega desde España/Europa.
 */
export function detectUserAmazonRegion(): AmazonStoreRegion {
  if (typeof window === "undefined") {
    return "US";
  }
  try {
    const saved = window.localStorage.getItem("cc_amazon_region");
    if (saved === "US" || saved === "ES") return saved;
  } catch {
    // ignore
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = (navigator.language || "").toLowerCase();
    if (
      tz === "Europe/Madrid" ||
      tz === "Atlantic/Canary" ||
      tz === "Europe/Ceuta" ||
      tz.startsWith("Europe/") ||
      lang === "es-es"
    ) {
      return "ES";
    }
    return "US";
  } catch {
    return "US";
  }
}

export const CATALOG: Record<string, AmazonProductRecommendation> = {
  CASABREWS_CM5418: {
    id: "casabrews-cm5418",
    badge: "🏆 #1 Más Vendida Amazon US · Manómetro 20 Bar",
    title: "CASABREWS CM5418 — Cafetera Espresso Compacta 20 Bar en Acero Inoxidable con Manómetro",
    subtitle:
      "La cafetera espresso compacta favorita en Amazon Estados Unidos para empezar: solo 15 cm de ancho, manómetro de presión frontal en vivo, lanceta de vapor articulada y portafiltro de 51 mm.",
    features: [
      "Chasis ultra-compacto de 15 cm (5.9 in) de ancho en acero inoxidable cepillado con tanque extraíble de 1.0 L",
      "Manómetro frontal analógico que muestra en tiempo real si tu molienda está en la zona ideal de extracción",
      "Bomba italiana de 20 bares con pre-infusión a baja presión y lanceta de vapor para espumar leche y Cappuccino",
    ],
    categoryType: "espresso-machine",
    specs: {
      width: "15.0 cm (5.9 in)",
      portafilter: "51 mm (3 orejas)",
      heating: "Thermoblock 1350W (~35 s)",
      pressure: "20 Bar + Manómetro",
    },
    queryUS: "CASABREWS CM5418 Espresso Machine 20 Bar Stainless Steel",
    queryES: "CASABREWS CM5418 Cafetera Espresso 20 Bar Acero Inoxidable",
    ctaLabel: "Ver Precio y Oferta de CASABREWS CM5418 en Amazon",
  },
  BREVILLE_BAMBINO: {
    id: "breville-bambino",
    badge: "⚡ Mejor Calidad Barista · Lista en 3 Segundos",
    title: "Breville Bambino (BES450) — Cafetera Espresso Compacta ThermoJet con Portafiltro 54 mm",
    subtitle:
      "El estándar de oro en cafeteras compactas: calienta en solo 3 segundos gracias a la tecnología ThermoJet, control digital de temperatura PID, válvula OPV a 9 bares reales y portafiltro de 54 mm.",
    features: [
      "Sistema ThermoJet listo para extraer espresso o vaporizar en 3 segundos reales con control electrónico PID",
      "Pre-infusión a baja presión seguida de extracción regulada a 9 bares reales mediante válvula OPV comercial",
      "Portafiltro de 54 mm para dosis de 18-19 g y lanceta de vapor manual de alta potencia para microespuma Latte Art",
    ],
    categoryType: "espresso-machine",
    specs: {
      width: "19.5 cm (7.7 in)",
      portafilter: "54 mm (3 orejas)",
      heating: "ThermoJet 3 s + PID",
      pressure: "15 Bar (OPV 9 Bar)",
    },
    queryUS: "Breville Bambino Espresso Machine BES450BSS",
    queryES: "Sage the Bambino Cafetera Espresso Compacta Acero Inoxidable",
    ctaLabel: "Consultar Precio de Breville Bambino en Amazon",
  },
  DELONGHI_DEDICA_ARTE: {
    id: "delonghi-dedica-arte",
    badge: "🇮🇹 Mejor Diseño Slim 15 cm · Lanceta MyLatte Art",
    title: "De’Longhi Dedica Arte (EC885M) — Cafetera Espresso Ultra-Delgada 15 cm con Lanceta Barista",
    subtitle:
      "La evolución definitiva de la legendaria Dedica: mantiene sus 15 cm de ancho, incorpora la lanceta de vapor profesional MyLatte Art sin panarello e incluye jarra de leche y tamper metálico.",
    features: [
      "Diseño italiano de solo 15 cm (5.9 in) de ancho con cuerpo metálico que cabe en cualquier rincón de cocina",
      "Lanceta de vapor profesional MyLatte Art para texturizar microespuma sedosa sin burbujas grandes",
      "Bandeja de goteo de doble altura (acepta tazas de hasta 13 cm), Thermoblock de 15 bares y portafiltro de 51 mm",
    ],
    categoryType: "espresso-machine",
    specs: {
      width: "14.9 cm (5.85 in)",
      portafilter: "51 mm (3 orejas)",
      heating: "Thermoblock 1300W (~35 s)",
      pressure: "15 Bar Italian Pump",
    },
    queryUS: "De'Longhi Dedica Arte Espresso Machine EC885M",
    queryES: "De'Longhi Dedica Arte EC885.M Cafetera Espresso",
    ctaLabel: "Ver Oferta de De’Longhi Dedica Arte en Amazon",
  },
  BREVILLE_BAMBINO_PLUS: {
    id: "breville-bambino-plus",
    badge: "🥛 Mejor Espumador Automático · Vapor MilQ",
    title: "Breville Bambino Plus (BES500) — Espresso Compacta con Espumador de Leche Automático MilQ",
    subtitle:
      "Toda la potencia ThermoJet de 3 segundos y PID de la Bambino, añadiendo vaporizador automático con sensor de temperatura en la base (3 niveles de espuma y 3 de calor) y válvula solenoide de 3 vías.",
    features: [
      "Vaporizador automático MilQ manos libres con sensor térmico inferior y autolimpieza al bajar la lanceta",
      "Válvula solenoide de 3 vías que seca la pastilla de café al instante tras terminar el shot",
      "Tanque de agua grande de 1.9 L, portafiltro de 54 mm en acero inoxidable y calentamiento en 3 segundos",
    ],
    categoryType: "espresso-machine",
    specs: {
      width: "19.5 cm (7.7 in)",
      portafilter: "54 mm Inox",
      heating: "ThermoJet 3 s + Solenoide",
      pressure: "15 Bar (OPV 9 Bar)",
    },
    queryUS: "Breville Bambino Plus Espresso Machine BES500BSS",
    queryES: "Sage the Bambino Plus Cafetera Espresso Automática",
    ctaLabel: "Ver Breville Bambino Plus en Amazon",
  },
  DELONGHI_DEDICA_MAESTRO_PLUS: {
    id: "delonghi-dedica-maestro-plus",
    badge: "✨ Nueva Generación Dedica · Vapor AutoLatte",
    title: "De’Longhi Dedica Maestro Plus (EC950M) — Cafetera Compacta con Espumador Automático AutoLatte",
    subtitle:
      "El modelo más avanzado de la familia Dedica: control activo de temperatura, 3 perfiles de pre-infusión y lanceta AutoLatte con sensor térmico infrarrojo para espumar leche automáticamente.",
    features: [
      "Lanceta AutoLatte con 3 texturas de espuma automáticas y modo manual para practicar Latte Art",
      "3 ajustes de temperatura de infusión y 3 niveles de pre-infusión en un chasis compacto de 20.7 cm",
      "Incluye portafiltro de 51 mm, tamper pesado de acero, jarra de leche y bandeja de doble nivel",
    ],
    categoryType: "espresso-machine",
    specs: {
      width: "20.7 cm (8.1 in)",
      portafilter: "51 mm (3 orejas)",
      heating: "Active Temp Thermoblock",
      pressure: "15 Bar",
    },
    queryUS: "De'Longhi Dedica Maestro Plus Espresso Machine EC950M",
    queryES: "De'Longhi Dedica Maestro Plus EC950.M Cafetera Espresso",
    ctaLabel: "Ver De’Longhi Dedica Maestro Plus en Amazon",
  },
  CASABREWS_3700_ESSENTIAL: {
    id: "casabrews-3700essential",
    badge: "💰 Mejor Económica precio variable en Amazon · Superventas Amazon US",
    title: "CASABREWS 3700Essential — Cafetera Espresso Compacta 20 Bar para Principiantes",
    subtitle:
      "La opción más asequible de CASABREWS en Amazon Estados Unidos con bomba de 20 bares, tanque de 1.3 L, calentador de tazas superior y lanceta de vapor de acero inoxidable.",
    features: [
      "Relación calidad-precio imbatible para tu primer rincón de café sin gastar más de precio variable en Amazon",
      "Filtros presurizados de 51 mm que garantizan crema espesa incluso con café pre-molido de supermercado",
      "Tanque transparente extraíble de 43 oz (1.3 L) y protección automática contra sobrecalentamiento",
    ],
    categoryType: "espresso-machine",
    specs: {
      width: "15.8 cm (6.2 in)",
      portafilter: "51 mm",
      heating: "Thermoblock 1350W",
      pressure: "20 Bar",
    },
    queryUS: "CASABREWS 3700Essential Espresso Machine 20 Bar",
    queryES: "CASABREWS 3700Essential Cafetera Espresso 20 Bares",
    ctaLabel: "Ver CASABREWS 3700Essential en Amazon",
  },
  DELONGHI_STILOSA: {
    id: "delonghi-stilosa",
    badge: "💵 Mejor precio variable en Amazon · Caldera Inox",
    title: "De’Longhi Stilosa (EC260BK) — Cafetera Espresso Compacta de 15 Bares con Caldera de Acero",
    subtitle:
      "La puerta de entrada más económica y fiable al espresso en Amazon EE. UU.: caldera de acero inoxidable, portafiltro ergonómico de 51 mm y vaporizador para capuchinos.",
    features: [
      "Caldera interna de acero inoxidable de larga durabilidad y bomba de 15 bares de presión",
      "Portafiltro de 51 mm con filtros para 1 y 2 tazas y bandeja abatible para vasos altos de Latte",
      "Tamaño compacto de 20.5 cm de ancho, ideal para apartamentos, estudiantes y presupuestos ajustados",
    ],
    categoryType: "espresso-machine",
    specs: {
      width: "20.5 cm (8.07 in)",
      portafilter: "51 mm (2 orejas)",
      heating: "Caldera Acero Inox",
      pressure: "15 Bar",
    },
    queryUS: "De'Longhi Stilosa Manual Espresso Machine EC260BK",
    queryES: "De'Longhi Stilosa EC260.BK Cafetera Espresso",
    ctaLabel: "Ver Precio de De’Longhi Stilosa en Amazon",
  },
  GAGGIA_CLASSIC_EVO_PRO: {
    id: "gaggia-classic-evo-pro",
    badge: "👑 Leyenda Italiana 58 mm · Chasis Acero Comercial",
    title: "Gaggia Classic Evo Pro (RI9380) — Cafetera Espresso Compacta Italiana con Portafiltro 58 mm",
    subtitle:
      "Fabricada en Milán con grupo y portafiltro comercial de latón cromado de 58 mm, válvula solenoide de 3 vías, válvula OPV de 9 bares en EE. UU. y lanceta de vapor profesional de 2 orificios.",
    features: [
      "Portafiltro comercial de 58 mm en acero/latón idéntico al de las cafeteras de cafetería profesional",
      "Válvula solenoide comercial de 3 vías y válvula OPV calibrada a 9 bares en la versión norteamericana",
      "Construcción 100% reparable en acero inoxidable cepillado de solo 23 cm de ancho para toda la vida",
    ],
    categoryType: "espresso-machine",
    specs: {
      width: "23.0 cm (9.0 in)",
      portafilter: "58 mm Comercial",
      heating: "Caldera + Solenoide 3 Vías",
      pressure: "9 Bar OPV (15 Bar Pump)",
    },
    queryUS: "Gaggia Classic Evo Pro Espresso Machine",
    queryES: "Gaggia Classic Evo Pro Cafetera Espresso Acero Inoxidable",
    ctaLabel: "Ver Gaggia Classic Evo Pro en Amazon",
  },
  HIBREW_H10A: {
    id: "hibrew-h10a",
    badge: "🔬 Mejor 58 mm Económica · PID Programable",
    title: "HiBREW H10A — Cafetera Espresso Compacta Semi-Automática 58 mm con Control PID yPantalla",
    subtitle:
      "La única cafetera compacta de su rango de precio con portafiltro comercial de 58 mm, temperatura PID ajustable grado a grado (90–95 °C), tiempo de pre-infusión programable y manómetro.",
    features: [
      "Portafiltro de 58 mm de tamaño profesional y cuerpo de acero inoxidable cepillado de 23 cm de ancho",
      "Pantalla digital para programar temperatura de extracción, temperatura de vapor y segundos de pre-infusión",
      "Manómetro frontal de presión y lanceta de vapor articulada de 270° para practicar Latte Art",
    ],
    categoryType: "espresso-machine",
    specs: {
      width: "23.0 cm (9.0 in)",
      portafilter: "58 mm Comercial",
      heating: "Thermoblock + PID ajustable",
      pressure: "19-20 Bar + Manómetro",
    },
    queryUS: "HiBREW H10A Semi Automatic Espresso Machine 58mm PID",
    queryES: "HiBREW H10A Cafetera Espresso 58mm PID",
    ctaLabel: "Ver HiBREW H10A 58 mm en Amazon",
  },
  NINJA_LUXE_CAFE: {
    id: "ninja-luxe-cafe",
    badge: "🤖 Mejor Todo-en-Uno Asistida · Báscula + Molino",
    title: "Ninja Luxe Café Premier (ES601) — Estación Compacta 3-en-1: Espresso, Cold Brew y Filtro",
    subtitle:
      "Revolución en Amazon US: molino cónico con báscula integrada que dosifica por peso, tecnología Barista Assist que te dice qué número de molienda usar y espumador automático Dual Froth.",
    features: [
      "Tecnología Barista Assist con báscula integrada y 25 ajustes de molienda cónica automática",
      "Prepara Espresso doble/cuádruple, Cold Pressed Espresso y Café de Filtro equilibrado en una sola máquina",
      "Espumador automático Dual Froth con batidor integrado en la jarra para espuma fría y caliente",
    ],
    categoryType: "espresso-machine",
    specs: {
      width: "33.0 cm (Todo-en-1)",
      portafilter: "53 mm Asistido",
      heating: "ThermoJet + PID",
      pressure: "15 Bar",
    },
    queryUS: "Ninja Luxe Cafe Premier Series Espresso Machine ES601",
    queryES: "Ninja Luxe Cafe Premier ES601 Cafetera Espresso",
    ctaLabel: "Ver Ninja Luxe Café ES601 en Amazon",
  },
  BARATZA_ENCORE_ESP: {
    id: "baratza-encore-esp",
    badge: "⚙️ #1 Molino Compacto para Espresso · Micro-Pasos 1-20",
    title: "Baratza Encore ESP — Molino de Café Compacto de Muelas Cónicas Especial para Espresso",
    subtitle:
      "El molino eléctrico compacto más recomendado del mundo para acompañar tu Breville Bambino, De’Longhi Dedica o CASABREWS CM5418: 20 micro-ajustes de alta resolución para espresso y 20 para filtro.",
    features: [
      "Rango 1 a 20 de micro-pasos ultrafinos diseñados específicamente para calibrar espresso sin frustración",
      "Muelas cónicas europeas M2 de acero endurecido de 40 mm fabricadas en Liechtenstein",
      "Incluye vaso dosificador metálico con adaptador para portafiltros de 54 mm y 58 mm (y compatible con 51 mm)",
    ],
    categoryType: "grinder",
    queryUS: "Baratza Encore ESP Electric Conical Burr Coffee Grinder",
    queryES: "Baratza Encore ESP Molinillo de Café Espresso",
    ctaLabel: "Ver Molino Baratza Encore ESP en Amazon",
  },
  FELLOW_OPUS: {
    id: "fellow-opus",
    badge: "🖤 Molino Minimalista y Silencioso · 41+ Ajustes",
    title: "Fellow Opus Conical Burr Grinder — Molino de Café Compacto Todo-Terreno para Espresso",
    subtitle:
      "Diseño moderno ultra-compacto de solo 12.9 cm de ancho con muelas cónicas C6-40 Burly Burrs, anillo interno de micro-ajuste Bevel y tecnología antiestática para no ensuciar tu encimera.",
    features: [
      "41 ajustes principales + anillo interior micrométrico para clavar el tiempo de extracción de 25-30 s",
      "Tecnología antiestática integrada y tolva Single Dose para retención mínima de café molido",
      "Tapa que funciona como medidor volumétrico de granos y parada automática inteligente",
    ],
    categoryType: "grinder",
    queryUS: "Fellow Opus Conical Burr Coffee Grinder Espresso",
    queryES: "Fellow Opus Molinillo de Café Muelas Cónicas Espresso",
    ctaLabel: "Ver Molino Fellow Opus en Amazon",
  },
  TURIN_DF54: {
    id: "turin-df54",
    badge: "💎 Mejor Molino Muelas Planas 54 mm · Retención Cero",
    title: "Turin DF54 / MiiCoffee DF54 — Molino Single Dose Compacto de Muelas Planas de 54 mm",
    subtitle:
      "Calidad de molienda de cafetería de especialidad en tamaño mini: muelas planas de acero inoxidable de 54 mm, ajuste continuo sin escalones (stepless), generador de plasma antiestático y fuelle.",
    features: [
      "Muelas planas (Flat Burrs) de 54 mm para máxima claridad de sabor y cuerpo sedoso en espresso",
      "Dial micrométrico continuo (Stepless) que permite ajustes infinitos al milímetro",
      "Generador de iones de plasma en el conducto de salida que elimina la estática y retención (< 0.1 g)",
    ],
    categoryType: "grinder",
    queryUS: "MiiCoffee DF54 Single Dose Flat Burr Coffee Grinder",
    queryES: "DF54 Single Dose Flat Burr Molinillo Café Espresso 54mm",
    ctaLabel: "Ver Molino Single Dose DF54 en Amazon",
  },
  KINGRINDER_K6_1ZPRESSO: {
    id: "kingrinder-k6",
    badge: "🖐️ Mejor Molino Manual Espresso · Cero Espacio en Encimera",
    title: "KINGrinder K6 / 1Zpresso J-Ultra — Molino de Café Manual de Alta Precisión para Espresso",
    subtitle:
      "Si no tienes espacio para otro electrodoméstico: muelas heptagonales de acero inoxidable de 48 mm con dial externo de 16 micras por clic que muele para espresso despresurizado en 35 segundos.",
    features: [
      "Ajuste externo de 60 clics por vuelta (16 micras por clic) capaz de calibrar cualquier portafiltro Bottomless",
      "Se guarda dentro de un cajón o junto a tu cafetera ocupando 0 cm de enchufes en la cocina",
      "Calidad de molienda comparable a molinos eléctricos de más de precio variable en Amazon por una fracción de su precio",
    ],
    categoryType: "grinder",
    queryUS: "KINGrinder K6 Manual Hand Coffee Grinder Espresso",
    queryES: "KINGrinder K6 Molinillo de Café Manual Espresso",
    ctaLabel: "Ver Molino Manual Espresso en Amazon",
  },
  DREO_BARISTAMAKER: {
    id: "dreo-baristamaker",
    badge: "🎨 #1 Espumador para Latte Art · Leche Entera y Avena",
    title: "Dreo BaristaMaker Milk Frother — Espumador de Leche Inteligente para Microespuma y Latte Art",
    subtitle:
      "Diseñado con impulsor patentado de dos etapas que rompe las burbujas hasta 0.5 mm, creando microespuma brillante lista para verter corazones y tulipanes con leche de vaca, avena o almendra.",
    features: [
      "Modo Microfoam específico para Latte Art con programas calibrados para leche entera, avena, soja y almendra",
      "Jarra de acero inoxidable con pico vertedor de barista profesional incluida en un solo equipo",
      "Control digital LED con calentamiento preciso a 65 °C sin quemar las proteínas de la leche",
    ],
    categoryType: "frother",
    queryUS: "Dreo BaristaMaker Milk Frother Latte Art Microfoam",
    queryES: "Dreo BaristaMaker Espumador de Leche Latte Art",
    ctaLabel: "Ver Espumador Dreo BaristaMaker en Amazon",
  },
  SUBMINIMAL_NANOFOAMER_PRO: {
    id: "subminimal-nanofoamer",
    badge: "🌪️ Microespuma Invisible sin Vapor · Tecnología NanoScreen",
    title: "Subminimal NanoFoamer PRO / V2 Lithium — Creador de Microespuma Sedosa para Espresso",
    subtitle:
      "La herramienta favorita de los baristas caseros con cafeteras compactas: usa mallas micrométricas NanoScreen para transformar la leche caliente en pintura sedosa de microespuma en segundos.",
    features: [
      "Pantallas NanoScreen intercambiables para elegir entre microespuma sedosa (Flat White) o cremosa (Latte)",
      "Versión V2 Lithium recargable por USB-C e impermeable IP4, o versión PRO automática de sobremesa",
      "Complemento perfecto si quieres espumar la leche al mismo tiempo que extraes el espresso en tu cafetera",
    ],
    categoryType: "frother",
    queryUS: "Subminimal NanoFoamer Lithium Milk Frother Microfoam",
    queryES: "Subminimal NanoFoamer V2 Lithium Espumador Microespuma",
    ctaLabel: "Ver Subminimal NanoFoamer en Amazon",
  },
  TIMEMORE_MINI_SCALE: {
    id: "timemore-mini-scale",
    badge: "⚖️ Cabe en Bandeja Bambino/Dedica · 0.1g + Auto-Timer",
    title: "TIMEMORE Black Mirror Mini / SearchPean Tiny 2S — Báscula Digital Compacta para Espresso",
    subtitle:
      "Báscula ultra-delgada de precisión 0.1 gramos diseñada específicamente para caber en las bandejas estrechas de la CASABREWS CM5418, De’Longhi Dedica y Breville Bambino.",
    features: [
      "Sensibilidad de 0.1 g con temporizador automático que arranca en cuanto cae la primera gota de espresso",
      "Dimensiones mini (~10×10 cm) para que no sobresalga ni vibre sobre la rejilla de goteo de tu cafetera",
      "Batería de litio recargable por USB-C, superficie resistente a salpicaduras y alfombrilla de silicona térmica",
    ],
    categoryType: "scale",
    queryUS: "Mini Espresso Scale with Timer 0.1g Rechargeable",
    queryES: "Báscula Café Espresso Mini con Temporizador 0.1g USB",
    ctaLabel: "Ver Báscula Mini de Espresso en Amazon",
  },
  KIT_51MM_CASABREWS_DEDICA: {
    id: "kit-51mm-bottomless",
    badge: "🔩 Upgrade 51 mm (3 Orejas) · Compatible Casabrews & Dedica",
    title: "Portafiltro Bottomless 51 mm (3 Orejas) + Tamper Calibrado 51 mm + WDT y Embudo Magnético",
    subtitle:
      "El upgrade n.º 1 para desbloquear el verdadero potencial de tu CASABREWS CM5418 o De’Longhi Dedica Arte (EC885M / EC685M): portafiltro sin fondo de acero inoxidable con cesta no presurizada.",
    features: [
      "Diseño de 3 orejas de 51 mm verificado para encajar en De’Longhi Dedica EC685/EC885 y CASABREWS CM5418/3700",
      "Permite visualizar la extracción en vivo para corregir el channeling y obtener crema avellana tigreada",
      "Combínalo con Tamper con muelle de 51 mm, distribuidor de agujas WDT 0.3 mm y Puck Screen de 51 mm",
    ],
    categoryType: "accessory-51mm",
    queryUS: "51mm Bottomless Portafilter 3 Ears Delonghi Dedica Casabrews",
    queryES: "Portafiltro Sin Fondo 51mm 3 Orejas Delonghi Dedica Casabrews",
    ctaLabel: "Ver Portafiltro y Accesorios 51 mm en Amazon",
  },
  KIT_54MM_BREVILLE_BAMBINO: {
    id: "kit-54mm-breville",
    badge: "🎯 Upgrade 54 mm (53.3 mm) · Compatible Breville Bambino",
    title: "Portafiltro Bottomless 54 mm + Tamper Calibrado Normcore V4 (53.3 mm) + Embudo y Puck Screen",
    subtitle:
      "Accesorios de precisión diseñados al milímetro para el grupo de 54 mm de la Breville Bambino y Bambino Plus (Sage en Europa): prensado 100% nivelado a 30 lb y extracción limpia sin salpicaduras.",
    features: [
      "Tamper calibrado de 53.3 mm con tope autonivelante en el borde de la cesta para evitar prensados torcidos",
      "Portafiltro sin fondo de 54 mm (3 orejas Breville) con cesta no presurizada de 18-20 g",
      "Puck Screen de acero inoxidable 1.7 mm que mantiene la ducha de tu Bambino impecable tras cada café",
    ],
    categoryType: "accessory-54mm",
    queryUS: "54mm Bottomless Portafilter and 53.3mm Calibrated Tamper Breville Bambino",
    queryES: "Portafiltro Sin Fondo 54mm y Tamper Calibrado 53.3mm Sage Bambino",
    ctaLabel: "Ver Accesorios 54 mm para Breville Bambino en Amazon",
  },
  KIT_58MM_PRO_BARISTA: {
    id: "kit-58mm-barista",
    badge: "🏅 Estándar Comercial 58 mm · Gaggia / HiBREW H10A / Lelit",
    title: "Kit Barista 58 mm: Tamper Calibrado 58.5 mm + Portafiltro Bottomless + Cesta IMS Precision",
    subtitle:
      "Herramientas de estándar comercial de 58 mm y 58.5 mm para Gaggia Classic Evo Pro, HiBREW H10A, CASABREWS Ultra y cafeteras prosumer.",
    features: [
      "Tamper dinamométrico de 58.5 mm que cubre el 100% del perímetro de las cestas de precisión IMS y VST",
      "Distribuidor de agujas WDT de 0.3 mm y anillo dosificador magnético de aluminio anodizado",
      "Puck Screen de 58.5 mm y alfombrilla de silicona esquinera para proteger la encimera al prensar",
    ],
    categoryType: "accessory-58mm",
    queryUS: "58.5mm Spring Loaded Calibrated Tamper WDT Tool Puck Screen 58mm",
    queryES: "Tamper Calibrado 58.5mm WDT Puck Screen 58mm Espresso",
    ctaLabel: "Ver Accesorios Barista 58 mm en Amazon",
  },
  DESCALER_ECODECALK_CAFIZA: {
    id: "descaler-ecodecalk-cafiza",
    badge: "🛡️ Mantenimiento Oficial · Elimina Cal y Aceites Rancios",
    title: "De’Longhi EcoDecalk Descalcificador + Urnex Cafiza / Dezcal Limpiador de Cafeteras Espresso",
    subtitle:
      "El kit de mantenimiento indispensable para evitar que el sarro obstruya el Thermoblock de tu cafetera compacta y eliminar los aceites amargos del portafiltro y la ducha.",
    features: [
      "Ácido láctico vegetal (EcoDecalk / Dezcal) que disuelve la cal sin corroer el aluminio ni el acero del Thermoblock",
      "Detergente Urnex Cafiza para backflushing y remojo de cestas, filtros presurizados y puck screens",
      "Alarga la vida útil de la bomba de 15/20 bares, restaura la presión del vapor y apaga la alerta de descalcificación",
    ],
    categoryType: "cleaning-beans",
    queryUS: "De'Longhi EcoDecalk Descaler and Urnex Cafiza Espresso Cleaner",
    queryES: "De'Longhi EcoDecalk Descalcificador y Urnex Cafiza Limpiador Espresso",
    ctaLabel: "Ver Descalcificador y Limpiador Espresso en Amazon",
  },
  LAVAZZA_SUPER_CREMA_BEANS: {
    id: "lavazza-super-crema",
    badge: "☕ #1 Café en Grano para Espresso en Amazon US · Crema Avellana",
    title: "Lavazza Super Crema / Illy Classico Whole Bean — Café en Grano para Espresso + Bote al Vacío",
    subtitle:
      "El blend de tueste medio-espresso más vendido en Amazon Estados Unidos: notas de avellana, azúcar moreno y crema espesa muy fácil de calibrar en cafeteras compactas.",
    features: [
      "Tueste medio equilibrado (Arábica y Robusta lavado) que perdona pequeños errores de molienda y da gran crema",
      "Ideal tanto para filtros presurizados (con molino económico) como para portafiltros Bottomless de 51 y 54 mm",
      "Acompáñalo con un bote hermético al vacío (Fellow Atmos / Airscape) para conservar la frescura 3 veces más tiempo",
    ],
    categoryType: "cleaning-beans",
    queryUS: "Lavazza Super Crema Whole Bean Coffee Espresso 2.2 lb",
    queryES: "Lavazza Super Crema Café en Grano para Espresso 1kg",
    ctaLabel: "Ver Café en Grano para Espresso en Amazon",
  },
  KNOCK_BOX_PITCHER_SET: {
    id: "knock-box-pitcher",
    badge: "📐 Optimiza tu Rincón de Café · Jarra Barista + Knock Box Compacto",
    title: "Jarra Espumadora de Leche Acero Inox 350 ml / 450 ml + Knock Box Compacto y Tapete de Silicona",
    subtitle:
      "Los accesorios ergonómicos esenciales para montar un Coffee Corner ordenado en menos de 35 cm de encimera sin salpicar café molido.",
    features: [
      "Jarra de acero inoxidable 304 con marcas internas en oz/ml y pico agudo para dibujar Latte Art",
      "Knock Box compacto con barra de goma silenciosa amortiguadora para descargar la pastilla de un golpe",
      "Tapete de silicona antideslizante que protege la encimera durante el prensado con el tamper",
    ],
    categoryType: "accessory-51mm",
    queryUS: "Espresso Knock Box Mini Milk Frothing Pitcher 12oz Tamping Mat",
    queryES: "Knock Box Café Espresso Compacto Jarra Leche 350ml Barista",
    ctaLabel: "Ver Jarra Barista y Knock Box Compacto en Amazon",
  },
};

export interface ContextualAmazonBundle {
  sectionTitle: string;
  sectionSubtitle: string;
  products: [
    AmazonProductRecommendation,
    AmazonProductRecommendation,
    AmazonProductRecommendation,
  ];
  vsCompetitor?: AmazonProductRecommendation;
}

/**
 * Selecciona los 3 productos de Amazon más relevantes según el slug, categoría y título de la página,
 * garantizando compatibilidad exacta de medidas (51 mm para Casabrews/Dedica, 54 mm para Breville, 58 mm para Gaggia/HiBREW).
 */
export function getContextualAmazonProducts(
  slug: string,
  category: string,
  title?: string
): ContextualAmazonBundle {
  const text = `${slug} ${category} ${title || ""}`.toLowerCase();

  // 1. Breville Bambino Plus
  if (text.includes("bambino-plus") || text.includes("bambino plus") || text.includes("bes500")) {
    return {
      sectionTitle: "Selección Oficial Amazon: Breville Bambino Plus + Accesorios Compatibles de 54 mm",
      sectionSubtitle:
        "Combina el calentamiento ThermoJet de 3 segundos y el espumador automático MilQ con herramientas de 54 mm y un molino de precisión.",
      products: [
        CATALOG.BREVILLE_BAMBINO_PLUS,
        CATALOG.KIT_54MM_BREVILLE_BAMBINO,
        CATALOG.BARATZA_ENCORE_ESP,
      ],
      vsCompetitor: CATALOG.BREVILLE_BAMBINO,
    };
  }

  // 2. Breville Bambino vs De'Longhi Dedica Arte
  if (
    (text.includes("bambino") && text.includes("dedica")) ||
    (text.includes("breville") && text.includes("delonghi"))
  ) {
    return {
      sectionTitle: "Duelo en Amazon: Breville Bambino (54 mm ThermoJet) vs De’Longhi Dedica Arte (15 cm Slim)",
      sectionSubtitle:
        "Compara precio, disponibilidad y valoraciones verificadas de las dos cafeteras espresso compactas más premiadas en Amazon.",
      products: [
        CATALOG.BREVILLE_BAMBINO,
        CATALOG.DELONGHI_DEDICA_ARTE,
        CATALOG.BARATZA_ENCORE_ESP,
      ],
      vsCompetitor: CATALOG.DELONGHI_DEDICA_ARTE,
    };
  }

  // 3. CASABREWS CM5418 vs De'Longhi Dedica Arte
  if (text.includes("casabrews") && (text.includes("dedica") || text.includes("delonghi"))) {
    return {
      sectionTitle: "Duelo en Amazon: CASABREWS CM5418 (20 Bar Manómetro) vs De’Longhi Dedica Arte (EC885M)",
      sectionSubtitle:
        "Ambas miden 15 cm de ancho y usan portafiltros de 51 mm (3 orejas): consulta sus precios y el kit de upgrade compatible.",
      products: [
        CATALOG.CASABREWS_CM5418,
        CATALOG.DELONGHI_DEDICA_ARTE,
        CATALOG.KIT_51MM_CASABREWS_DEDICA,
      ],
      vsCompetitor: CATALOG.DELONGHI_DEDICA_ARTE,
    };
  }

  // 4. CASABREWS CM5418 vs Breville Bambino
  if (text.includes("casabrews") && (text.includes("bambino") || text.includes("breville"))) {
    return {
      sectionTitle: "Duelo en Amazon: CASABREWS CM5418 (Mejor Calidad-Precio) vs Breville Bambino (Mejor Barista)",
      sectionSubtitle:
        "Consulta las ofertas actuales en Amazon Estados Unidos y España junto con la báscula mini compatible con ambas bandejas.",
      products: [
        CATALOG.CASABREWS_CM5418,
        CATALOG.BREVILLE_BAMBINO,
        CATALOG.TIMEMORE_MINI_SCALE,
      ],
      vsCompetitor: CATALOG.BREVILLE_BAMBINO,
    };
  }

  // 5. Breville Bambino / 54 mm
  if (
    text.includes("bambino") ||
    text.includes("breville") ||
    text.includes("sage") ||
    text.includes("54mm") ||
    text.includes("54 mm") ||
    text.includes("53.3")
  ) {
    return {
      sectionTitle: "Equipamiento Recomendado en Amazon para Breville Bambino (Grupo de 54 mm)",
      sectionSubtitle:
        "La cafetera compacta ThermoJet de 3 segundos junto con el portafiltro Bottomless de 54 mm, tamper de 53.3 mm y molino espresso.",
      products: [
        CATALOG.BREVILLE_BAMBINO,
        CATALOG.KIT_54MM_BREVILLE_BAMBINO,
        CATALOG.BARATZA_ENCORE_ESP,
      ],
      vsCompetitor: CATALOG.DELONGHI_DEDICA_ARTE,
    };
  }

  // 6. De'Longhi Dedica Maestro Plus
  if (text.includes("maestro") || text.includes("ec950")) {
    return {
      sectionTitle: "De’Longhi Dedica Maestro Plus (EC950M) y Accesorios de 51 mm en Amazon",
      sectionSubtitle:
        "Vaporizador automático AutoLatte, control térmico activo y compatibilidad con accesorios barista de 51 mm.",
      products: [
        CATALOG.DELONGHI_DEDICA_MAESTRO_PLUS,
        CATALOG.DELONGHI_DEDICA_ARTE,
        CATALOG.KIT_51MM_CASABREWS_DEDICA,
      ],
      vsCompetitor: CATALOG.DELONGHI_DEDICA_ARTE,
    };
  }

  // 7. De'Longhi Stilosa
  if (text.includes("stilosa") || text.includes("ec260")) {
    return {
      sectionTitle: "Las Reinas del Espresso Económico en Amazon: De’Longhi Stilosa y CASABREWS CM5418",
      sectionSubtitle:
        "Ideales para estrenar tu primer rincón de café en casa con presupuesto inferior a precio variable en Amazon.",
      products: [
        CATALOG.DELONGHI_STILOSA,
        CATALOG.CASABREWS_CM5418,
        CATALOG.KIT_51MM_CASABREWS_DEDICA,
      ],
      vsCompetitor: CATALOG.CASABREWS_CM5418,
    };
  }

  // 8. De'Longhi Dedica Arte / Style
  if (
    text.includes("dedica") ||
    text.includes("delonghi") ||
    text.includes("de’longhi") ||
    text.includes("ec885") ||
    text.includes("ec685")
  ) {
    return {
      sectionTitle: "Kit Barista Ideal en Amazon para De’Longhi Dedica Arte (15 cm · Portafiltro 51 mm)",
      sectionSubtitle:
        "La cafetera italiana ultra-delgada con lanceta MyLatte Art, su portafiltro Bottomless de 51 mm (3 orejas) y báscula mini.",
      products: [
        CATALOG.DELONGHI_DEDICA_ARTE,
        CATALOG.KIT_51MM_CASABREWS_DEDICA,
        CATALOG.TIMEMORE_MINI_SCALE,
      ],
      vsCompetitor: CATALOG.CASABREWS_CM5418,
    };
  }

  // 9. CASABREWS 3700Essential
  if (text.includes("3700")) {
    return {
      sectionTitle: "CASABREWS 3700Essential vs CASABREWS CM5418: Superventas Compactas en Amazon",
      sectionSubtitle:
        "Bomba de 20 bares, filtros de 51 mm y lanceta de acero inoxidable al mejor precio de Amazon Estados Unidos.",
      products: [
        CATALOG.CASABREWS_3700_ESSENTIAL,
        CATALOG.CASABREWS_CM5418,
        CATALOG.KIT_51MM_CASABREWS_DEDICA,
      ],
      vsCompetitor: CATALOG.CASABREWS_CM5418,
    };
  }

  // 10. CASABREWS CM5418
  if (text.includes("casabrews") || text.includes("cm5418")) {
    return {
      sectionTitle: "Kit Completo en Amazon para CASABREWS CM5418 (20 Bar + Accesorios 51 mm)",
      sectionSubtitle:
        "La cafetera compacta con manómetro n.º 1 en ventas en Amazon US junto con su portafiltro sin fondo de 51 mm y báscula mini.",
      products: [
        CATALOG.CASABREWS_CM5418,
        CATALOG.KIT_51MM_CASABREWS_DEDICA,
        CATALOG.TIMEMORE_MINI_SCALE,
      ],
      vsCompetitor: CATALOG.DELONGHI_DEDICA_ARTE,
    };
  }

  // 11. Gaggia / HiBREW / 58 mm
  if (
    text.includes("gaggia") ||
    text.includes("hibrew") ||
    text.includes("58mm") ||
    text.includes("58 mm") ||
    text.includes("lelit")
  ) {
    return {
      sectionTitle: "Cafeteras Compactas de Grupo Comercial 58 mm y Herramientas de Precisión en Amazon",
      sectionSubtitle:
        "Extracción de cafetería profesional con portafiltros de 58 mm, tampers de 58.5 mm y molino Single Dose de muelas planas.",
      products: [
        text.includes("hibrew") ? CATALOG.HIBREW_H10A : CATALOG.GAGGIA_CLASSIC_EVO_PRO,
        CATALOG.KIT_58MM_PRO_BARISTA,
        CATALOG.TURIN_DF54,
      ],
      vsCompetitor: CATALOG.BREVILLE_BAMBINO,
    };
  }

  // 12. Ninja Luxe Cafe
  if (text.includes("ninja") || text.includes("es601")) {
    return {
      sectionTitle: "Estaciones de Café Asistidas y Automáticas Mejor Valoradas en Amazon",
      sectionSubtitle:
        "Molino con báscula integrada, calibración asistida y espumador manos libres para resultados consistentes.",
      products: [
        CATALOG.NINJA_LUXE_CAFE,
        CATALOG.BREVILLE_BAMBINO_PLUS,
        CATALOG.LAVAZZA_SUPER_CREMA_BEANS,
      ],
      vsCompetitor: CATALOG.BREVILLE_BAMBINO_PLUS,
    };
  }

  // 13. Molinos y Molienda
  if (
    category === "molinos-y-molienda" ||
    text.includes("molino") ||
    text.includes("molienda") ||
    text.includes("baratza") ||
    text.includes("fellow") ||
    text.includes("df54") ||
    text.includes("1zpresso") ||
    text.includes("kingrinder")
  ) {
    const secondGrinder =
      text.includes("df54") || text.includes("plana")
        ? CATALOG.TURIN_DF54
        : text.includes("manual") || text.includes("kingrinder") || text.includes("1zpresso")
        ? CATALOG.KINGRINDER_K6_1ZPRESSO
        : CATALOG.FELLOW_OPUS;
    return {
      sectionTitle: "Los Mejores Molinos de Café Compactos para Espresso en Amazon",
      sectionSubtitle:
        "Muelas cónicas y planas con micro-ajustes específicos para calibrar tu extracción en 25-30 segundos sin ocupar espacio.",
      products: [
        CATALOG.BARATZA_ENCORE_ESP,
        secondGrinder,
        CATALOG.TIMEMORE_MINI_SCALE,
      ],
      vsCompetitor: secondGrinder,
    };
  }

  // 14. Espumadores y Latte Art
  if (
    category === "espumadores-y-latte-art" ||
    text.includes("espumador") ||
    text.includes("latte-art") ||
    text.includes("latte art") ||
    text.includes("microespuma") ||
    text.includes("nanofoamer") ||
    text.includes("dreo") ||
    text.includes("leche")
  ) {
    return {
      sectionTitle: "Mejores Espumadores de Leche y Jarras Barista para Latte Art en Amazon",
      sectionSubtitle:
        "Consigue microespuma brillante y sedosa a 60–65 °C con leche entera o de avena barista.",
      products: [
        CATALOG.DREO_BARISTAMAKER,
        CATALOG.SUBMINIMAL_NANOFOAMER_PRO,
        CATALOG.KNOCK_BOX_PITCHER_SET,
      ],
      vsCompetitor: CATALOG.SUBMINIMAL_NANOFOAMER_PRO,
    };
  }

  // 15. Básculas y Accesorios Barista (51mm / 54mm / 58mm)
  if (
    category === "basculas-y-accesorios-barista" ||
    text.includes("bascula") ||
    text.includes("báscula") ||
    text.includes("portafiltro") ||
    text.includes("bottomless") ||
    text.includes("tamper") ||
    text.includes("wdt") ||
    text.includes("puck") ||
    text.includes("knock-box")
  ) {
    if (text.includes("51")) {
      return {
        sectionTitle: "Accesorios Barista Compatibles de 51 mm (CASABREWS CM5418 y De’Longhi Dedica)",
        sectionSubtitle:
          "Portafiltros sin fondo de 3 orejas, tampers calibrados, distribuidores WDT y básculas mini verificadas.",
        products: [
          CATALOG.KIT_51MM_CASABREWS_DEDICA,
          CATALOG.TIMEMORE_MINI_SCALE,
          CATALOG.KNOCK_BOX_PITCHER_SET,
        ],
        vsCompetitor: CATALOG.KIT_54MM_BREVILLE_BAMBINO,
      };
    }
    return {
      sectionTitle: "Básculas Mini (0.1 g) y Accesorios Barista de Precisión en Amazon",
      sectionSubtitle:
        "Herramientas compactas para medir tus ratios 1:2, eliminar el channeling y prensar nivelado a 30 lb.",
      products: [
        CATALOG.TIMEMORE_MINI_SCALE,
        CATALOG.KIT_51MM_CASABREWS_DEDICA,
        CATALOG.KIT_54MM_BREVILLE_BAMBINO,
      ],
      vsCompetitor: CATALOG.KIT_54MM_BREVILLE_BAMBINO,
    };
  }

  // 16. Mantenimiento y Descalcificación
  if (
    category === "mantenimiento-y-descalcificacion" ||
    text.includes("descalcifica") ||
    text.includes("limpi") ||
    text.includes("cafiza") ||
    text.includes("ecodecalk") ||
    text.includes("sarro")
  ) {
    return {
      sectionTitle: "Kit Oficial de Descalcificación y Limpieza Barista en Amazon",
      sectionSubtitle:
        "Protege el Thermoblock contra la cal, apaga la luz de alerta y elimina los aceites rancios del grupo.",
      products: [
        CATALOG.DESCALER_ECODECALK_CAFIZA,
        CATALOG.CASABREWS_CM5418,
        CATALOG.DELONGHI_DEDICA_ARTE,
      ],
      vsCompetitor: CATALOG.CASABREWS_CM5418,
    };
  }

  // 17. Café en Grano y Agua
  if (
    category === "cafe-en-grano-y-agua" ||
    text.includes("grano") ||
    text.includes("tueste") ||
    text.includes("lavazza") ||
    text.includes("agua")
  ) {
    return {
      sectionTitle: "Mejores Cafés en Grano para Espresso y Conservación al Vacío en Amazon",
      sectionSubtitle:
        "Blends con crema avellana espesa ideales para cafeteras compactas junto con el molino n.º 1 para calibrarlos.",
      products: [
        CATALOG.LAVAZZA_SUPER_CREMA_BEANS,
        CATALOG.BARATZA_ENCORE_ESP,
        CATALOG.DESCALER_ECODECALK_CAFIZA,
      ],
      vsCompetitor: CATALOG.BARATZA_ENCORE_ESP,
    };
  }

  // 18. Espacios pequeños y Coffee Corner
  if (
    category === "espacios-pequenos-y-coffee-corner" ||
    text.includes("15-cm") ||
    text.includes("compact") ||
    text.includes("espacio")
  ) {
    return {
      sectionTitle: "Equipamiento Ultra-Compacto (15 cm de Ancho) para Cocinas Pequeñas en Amazon",
      sectionSubtitle:
        "Las cafeteras más estrechas del mercado y accesorios diseñados para montar tu estación barista en menos de 30 cm.",
      products: [
        CATALOG.DELONGHI_DEDICA_ARTE,
        CATALOG.CASABREWS_CM5418,
        CATALOG.KNOCK_BOX_PITCHER_SET,
      ],
      vsCompetitor: CATALOG.CASABREWS_CM5418,
    };
  }

  // 19. Default Top 3 (CASABREWS CM5418 + Breville Bambino + De'Longhi Dedica Arte)
  return {
    sectionTitle: "Top 3 Cafeteras Espresso Compactas Más Recomendadas en Amazon EE. UU. y España",
    sectionSubtitle:
      "Los 3 modelos líderes por tamaño en encimera, facilidad de uso, calidad de extracción y miles de reseñas verificadas.",
    products: [
      CATALOG.CASABREWS_CM5418,
      CATALOG.BREVILLE_BAMBINO,
      CATALOG.DELONGHI_DEDICA_ARTE,
    ],
    vsCompetitor: CATALOG.BREVILLE_BAMBINO,
  };
}
