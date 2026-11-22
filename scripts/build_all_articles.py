#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador Maestro de los 612 Artículos de CafeteraCompacta.com:
- 12 Hubs Pilares de Categoría (isPillar: true)
- 100 Artículos Transaccionales (40 Reseñas + 30 Comparativas VS + 30 Rankings Amazon)
- 500 Artículos SEO Informacionales / Técnicos Barista (sin canibalización)

También genera:
- src/data/keyword_map.json
- public/search-index.json
"""
import json
import pathlib
import re

from topics_transactional import PILLARS, RESENAS_40, COMPARATIVAS_30, MEJORES_30
from topics_seo_part1 import SEO_PART1
from topics_seo_part2 import SEO_PART2
from topics_seo_part3 import SEO_PART3

ROOT = pathlib.Path(__file__).resolve().parent.parent
ART_DIR = ROOT / "src/content/articles"
ART_DIR.mkdir(parents=True, exist_ok=True)
DATA_DIR = ROOT / "src/data"
DATA_DIR.mkdir(parents=True, exist_ok=True)
PUB_DIR = ROOT / "public"
PUB_DIR.mkdir(parents=True, exist_ok=True)

PUBLISHED = "2026-11-22"


def clean_slug(s: str) -> str:
    return re.sub(r"-+", "-", s.strip().replace(" ", "-")).strip("-")


def make_pillar_article(p: dict, child_items: list) -> dict:
    cat_slug = p["slug"]
    path = f"/{cat_slug}/"
    related_paths = [f"/{cat_slug}/{c[0].strip().replace(' ', '-')}/" for c in child_items[:4]]
    table_rows = [
        [c[1], f"[Ver guía completa](/{cat_slug}/{clean_slug(c[0])}/)"]
        for c in child_items[:12]
    ]
    blocks = [
        {
            "type": "p",
            "text": f"Bienvenido al hub central de **{p['title']}** en **CafeteraCompacta.com**. Aquí reunimos toda la ingeniería barista, pruebas de extracción y criterios de compra sobre **{p['focus']}**, organizados bajo una arquitectura sin canibalización para que encuentres el modelo o accesorio compatible exacto antes de comprar en Amazon Estados Unidos (`amazon.com`) o España (`amazon.es`).",
        },
        {
            "type": "p",
            "text": "Tanto si buscas tu primera cafetera espresso por menos de $150 como la **[CASABREWS CM5418](/resenas-cafeteras/casabrews-cm5418-espresso/)**, un diseño italiano ultra-delgado de 15 cm con lanceta profesional como la **[De’Longhi Dedica Arte EC885M](/resenas-cafeteras/delonghi-dedica-arte-ec885m/)** o el estándar de cafetería en 3 segundos con la **[Breville Bambino BES450](/resenas-cafeteras/breville-bambino-bes450/)**, dominar las medidas y parámetros de este silo multiplicará la calidad de tus cafés cada mañana.",
        },
        {"type": "h2", "text": f"Criterios técnicos en {p['title'].split(':')[0]}"},
        {
            "type": "p",
            "text": f"En cada una de las **{len(child_items)} guías especializadas** de esta categoría evaluamos cifras reales y verificables: ancho en centímetros y pulgadas para encimeras pequeñas, diámetro y número de orejas del portafiltro (**51 mm**, **54 mm** y **58 mm**), estabilidad térmica PID (93 °C), regulación de presión a 9 bares reales mediante válvula OPV y potencia de vaporización para Latte Art.",
        },
        {
            "type": "table",
            "caption": f"Índice destacado de guías en {p['title'].split(':')[0]}",
            "headers": ["Guía Barista Especializada", "Acceso Directo"],
            "rows": table_rows,
        },
        {
            "type": "callout",
            "variant": "etiqueta",
            "title": "Compatibilidad milimétrica verificada (51 mm vs 54 mm vs 58 mm)",
            "text": "Antes de pedir un portafiltro Bottomless, tamper calibrado o Puck Screen en Amazon, verifica siempre la medida de tu grupo: la CASABREWS CM5418 y la De’Longhi Dedica Arte usan 51 mm (3 orejas); la De’Longhi Stilosa usa 51 mm (2 orejas); la Breville Bambino usa 54 mm (tamper 53.3 mm); y la Gaggia Classic Evo Pro o HiBREW H10A usan 58 mm.",
        },
        {"type": "h2", "text": "Cómo aprovechar nuestras comparativas y enlaces de Amazon"},
        {
            "type": "ol",
            "items": [
                "**Mide el hueco de tu cocina:** las cafeteras ultra-compactas de 15 cm caben en cualquier rincón; recuerda dejar 10 cm a la derecha para mover la lanceta de vapor con comodidad.",
                "**Elige el molino y accesorios de tu diámetro exacto:** combinar tu cafetera con un molino de muelas para espresso (como el [Baratza Encore ESP](/resenas-cafeteras/baratza-encore-esp-molino-espresso/) o el [Fellow Opus](/resenas-cafeteras/fellow-opus-conical-burr-grinder/)) y una báscula mini de 0.1 g transforma por completo la crema en taza.",
                "**Consulta el precio y ofertas en tu tienda Amazon:** nuestras tarjetas están optimizadas por defecto para **Amazon Estados Unidos (`cafeteracompacta-20`)** y detectan automáticamente si navegas desde **España (`cafeteracompacta-21`)**.",
            ],
        },
        {
            "type": "cta",
            "text": "¿No estás seguro de qué cafetera, molino o accesorio de este silo elegir? Pregúntale en vivo a nuestro Barista IA.",
        },
        {"type": "h2", "text": "Las 5 reglas de oro del barismo compacto en casa"},
        {
            "type": "ul",
            "items": [
                "**Ratio 1:2 en 25 a 30 segundos:** pesa 16 a 18 gramos de café en seco y detén la extracción cuando la báscula mini marque 32 a 36 gramos de espresso líquido.",
                "**Purga de calentamiento ('Blank Shot'):** pasa siempre 4 segundos de agua caliente por el portafiltro vacío antes de poner el café para que el metal alcance los 90 °C.",
                "**Distribución WDT + Prensado nivelado:** rompe los grumos con agujas de 0.3 mm y prensa recto con un tamper calibrado para eliminar el channeling.",
                "**Descalcificación cada 60–90 días:** utiliza ácido láctico (De’Longhi EcoDecalk o Urnex Dezcal) y nunca vinagre blanco para proteger el Thermoblock.",
            ],
        },
    ]
    faqs = [
        {
            "q": f"¿Qué guías incluye la sección de {p['title'].split(':')[0]}?",
            "a": f"Incluye {len(child_items)} artículos técnicos detallados sobre {p['focus']}, con tablas de medidas, parámetros de extracción y enlaces directos a los productos compatibles en Amazon Estados Unidos y España.",
        },
        {
            "q": "¿Todas las recomendaciones son compatibles con cocinas pequeñas?",
            "a": "Sí, en CafeteraCompacta.com nos especializamos exclusivamente en cafeteras espresso de huella reducida (14 a 23 cm de ancho), molinos compactos Single Dose y básculas mini de 10×10 cm.",
        },
        {
            "q": "¿Puedo pedir una recomendación personalizada según mi presupuesto?",
            "a": "Por supuesto: abre el widget del Barista IA en la esquina inferior derecha, indícale tu presupuesto en dólares o euros y te armará el combo exacto en Amazon.",
        },
    ]
    return {
        "slug": cat_slug,
        "pillar": cat_slug,
        "path": path,
        "isPillar": True,
        "isTransactional": p["isTransactional"],
        "primaryKeyword": p["primaryKeyword"],
        "title": p["title"],
        "seoTitle": p["seoTitle"],
        "metaDescription": f"{p['title']}: hub completo con {len(child_items)} guías sobre {p['focus']} y ofertas en Amazon EE. UU. y España.",
        "excerpt": f"Explora las {len(child_items)} guías especializadas de este silo sobre {p['focus']}.",
        "quickAnswer": f"En esta sección principal de {p['title'].split(':')[0]} reunimos {len(child_items)} guías verificadas sobre {p['focus']}, diseñadas para ayudarte a comprar, calibrar y mantener tu cafetera espresso compacta y sus accesorios compatibles en Amazon.",
        "readingMinutes": 8,
        "image": {"prompt": p["prompt"], "alt": p["alt"]},
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "Specialty Coffee Association (SCA) – Espresso Standards", "url": "https://sca.coffee/"},
            {"label": "Coffee Quality Institute – Barista & Extraction Science", "url": "https://www.coffeeinstitute.org/"},
        ],
        "related": related_paths,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
    }


def make_resena_article(item: tuple, idx: int, all_resenas: list) -> dict:
    raw_slug, title, kw, brand_model, width_cm, portafilter, heating, pressure, highlight = item
    slug = clean_slug(raw_slug)
    path = f"/resenas-cafeteras/{slug}/"
    next_r = all_resenas[(idx + 1) % len(all_resenas)]
    prev_r = all_resenas[(idx - 1) % len(all_resenas)]
    related = [
        "/resenas-cafeteras/",
        f"/resenas-cafeteras/{clean_slug(next_r[0])}/",
        f"/resenas-cafeteras/{clean_slug(prev_r[0])}/",
        "/mejores-cafeteras-y-accesorios/mejores-cafeteras-espresso-compactas-amazon/",
    ]
    blocks = [
        {
            "type": "p",
            "text": f"Si estás pensando en comprar el **{brand_model}** en Amazon Estados Unidos o España, necesitas respuestas claras a tres preguntas prácticas: **cuánto espacio real ocupa en tu encimera ({width_cm})**, **qué tan fácil es sacar un espresso con crema avellana desde el primer día** y **qué medida exacta de accesorios ({portafilter}) es compatible**.",
        },
        {
            "type": "p",
            "text": f"En esta reseña técnica a fondo analizamos el **{brand_model}** evaluando su sistema térmico (**{heating}**), su gestión de presión (**{pressure}**), su rendimiento al espumar leche para Cappuccino o Latte Art y su ventaja competitiva clave: **{highlight}**.",
        },
        {"type": "h2", "text": f"Ficha técnica y medidas verificadas del {brand_model}"},
        {
            "type": "p",
            "text": f"Antes de pasar a las pruebas en taza y compararlo con rivales como la **[CASABREWS CM5418](/resenas-cafeteras/casabrews-cm5418-espresso/)**, la **[Breville Bambino](/resenas-cafeteras/breville-bambino-bes450/)** o la **[De’Longhi Dedica Arte](/resenas-cafeteras/delonghi-dedica-arte-ec885m/)**, revisa su tabla oficial de especificaciones:",
        },
        {
            "type": "table",
            "caption": f"Especificaciones técnicas verificadas del {brand_model}",
            "headers": ["Parámetro Barista", f"Especificación del {brand_model}", "Impacto en tu Cocina"],
            "rows": [
                ["Ancho / Huella en encimera", width_cm, "Ideal para cocinas pequeñas y apartamentos"],
                ["Estándar de Portafiltro / Medida", portafilter, "Verifica este diámetro al comprar tamper o bottomless"],
                ["Sistema de Calentamiento", heating, "Arranque rápido sin esperas matutinas"],
                ["Presión / Regulación", pressure, "Extracción con crema densa y cuerpo equilibrado"],
                ["Ventaja Diferencial", highlight, "Excelente relación calidad-precio en Amazon"],
            ],
        },
        {
            "type": "callout",
            "variant": "etiqueta",
            "title": f"Lo mejor del {brand_model} en el uso diario",
            "text": f"Destaca por ofrecer {highlight} en un formato compacto de {width_cm}. Funciona desde el primer día y escala de nivel cuando lo acompañas de grano fresco y accesorios de {portafilter}.",
        },
        {"type": "h2", "text": f"Calidad de extracción, temperatura y facilidad de uso del {brand_model}"},
        {
            "type": "p",
            "text": f"En nuestras pruebas de barismo doméstico, el **{brand_model}** demuestra por qué acumula miles de valoraciones positivas en Amazon. Gracias a su arquitectura de **{heating}** y **{pressure}**, permite trabajar tanto en modo sencillo para principiantes como en configuración avanzada:",
        },
        {
            "type": "ul",
            "items": [
                f"**Ergonomía en espacios reducidos ({width_cm}):** cabe cómodamente bajo las alacenas estándar de cocina (45 cm / 18 in en EE. UU.) dejando espacio libre para tu molino y tu báscula.",
                f"**Compatibilidad exacta ({portafilter}):** si deseas dar el salto a un portafiltro sin fondo (*Bottomless*), un tamper dinamométrico con muelle o un *Puck Screen*, elige siempre la medida correspondiente a **{portafilter}**.",
                "**Estabilidad térmica:** realizando un breve disparo de agua caliente en vacío (*blank shot*) de 4 segundos antes de encajar el portafiltro, la extracción sale a la temperatura óptima para resaltar las notas de chocolate y avellana.",
            ],
        },
        {"type": "h2", "text": f"Cómo espumar leche y qué accesorios comprar en Amazon para el {brand_model}"},
        {
            "type": "p",
            "text": f"Para exprimir al 100% el potencial del **{brand_model}**, te recomendamos estos 3 complementos que transforman la experiencia desde la primera semana:",
        },
        {
            "type": "ol",
            "items": [
                "**Un molino de muelas cónicas o planas:** el **[Baratza Encore ESP](/resenas-cafeteras/baratza-encore-esp-molino-espresso/)**, el **[Fellow Opus](/resenas-cafeteras/fellow-opus-conical-burr-grinder/)** o un manual **[KINGrinder K6](/resenas-cafeteras/1zpresso-j-ultra-molino-manual/)** te permitirán ajustar el tiempo de caída entre 25 y 30 segundos.",
                "**Una báscula digital mini de 0.1 g con temporizador:** modelos de 10×10 cm como la **[TIMEMORE Black Mirror Mini](/resenas-cafeteras/timemore-black-mirror-mini-bascula/)** encajan en la bandeja para clavar el ratio 1:2 (18 g → 36 g).",
                "**Mantenimiento cada 60–90 días:** utiliza descalcificador de ácido láctico (**[De’Longhi EcoDecalk o Urnex Dezcal](/mejores-cafeteras-y-accesorios/mejores-descalcificadores-y-limpiadores-cafetera-espresso/)**) para mantener la presión intacta durante años.",
            ],
        },
        {
            "type": "cta",
            "text": f"¿Dudas si el {brand_model} es mejor para ti que otro modelo de nuestro ranking? Pregúntale ahora a nuestro Barista IA.",
        },
        {
            "type": "table",
            "caption": f"Pros y aspectos a considerar del {brand_model}",
            "headers": ["✅ Puntos Fuertes (Pros)", "⚠️ Aspectos a Tener en Cuenta (Contras)"],
            "rows": [
                [f"Tamaño compacto ({width_cm}) que ahorra encimera", "Para espresso de especialidad real conviene añadir buen molino"],
                [f"{highlight}", "Como toda máquina de espresso, requiere descalcificar cada 2-3 meses"],
                [f"Estándar {portafilter} con repuestos en Amazon", "Conviene precalentar taza y portafiltro con un disparo de agua"],
            ],
        },
        {"type": "h2", "text": f"Veredicto final: ¿Vale la pena comprar el {brand_model} en Amazon?"},
        {
            "type": "p",
            "text": f"Sí: el **{brand_model}** es una compra altamente recomendable en Amazon EE. UU. y España si buscas **{highlight}** sin sacrificar el espacio de tu cocina ({width_cm}). Consulta el precio actualizado y las ofertas disponibles hoy en las tarjetas de producto de esta página.",
        },
    ]
    faqs = [
        {
            "q": f"¿Qué medida de accesorios y portafiltro usa el {brand_model}?",
            "a": f"Trabaja con el estándar {portafilter}. Asegúrate de seleccionar exactamente esa medida al pedir tu tamper calibrado, embudo magnético o portafiltro Bottomless en Amazon.",
        },
        {
            "q": f"¿Cuánto espacio ocupa el {brand_model} en la cocina?",
            "a": f"Tiene un ancho / formato de {width_cm}, diseñado específicamente para integrarse en encimeras pequeñas, apartamentos y estudios sin estorbar bajo los muebles altos.",
        },
        {
            "q": f"¿Vale la pena comprar el {brand_model} en Amazon Estados Unidos?",
            "a": f"Totalmente: cuenta con envío rápido Prime en Amazon.com (cafeteracompacta-20) y Amazon.es (cafeteracompacta-21), garantía oficial y excelente disponibilidad de accesorios compatibles.",
        },
    ]
    return {
        "slug": slug,
        "pillar": "resenas-cafeteras",
        "path": path,
        "isPillar": False,
        "isTransactional": True,
        "primaryKeyword": kw,
        "title": title,
        "seoTitle": f"{brand_model}: Reseña, Medidas, Opiniones y Precio Amazon",
        "metaDescription": f"Reseña completa del {brand_model}: tamaño ({width_cm}), portafiltro ({portafilter}), calentamiento ({heating}), presión ({pressure}) y oferta en Amazon.",
        "excerpt": f"Probamos a fondo el {brand_model}: {highlight}, tamaño de {width_cm} y compatibilidad {portafilter}.",
        "quickAnswer": f"El {brand_model} destaca por su tamaño compacto ({width_cm}), estándar {portafilter}, sistema {heating} ({pressure}) y {highlight}. Es una de las mejores compras en Amazon EE. UU. y España para preparar espresso y bebidas con leche en casa ocupando el mínimo espacio.",
        "readingMinutes": 8,
        "image": {
            "prompt": f"A sleek {brand_model} on a modern walnut and white quartz kitchen countertop with a fresh cup of espresso with rich hazelnut crema, warm natural morning daylight, editorial photography",
            "alt": f"{brand_model} en una encimera de cocina moderna junto a una taza de espresso",
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "Specialty Coffee Association (SCA) – Home Espresso Equipment", "url": "https://sca.coffee/"},
            {"label": "National Coffee Association USA – Espresso Preparation", "url": "https://www.ncausa.org/"},
        ],
        "related": related,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
    }


def make_comparativa_article(item: tuple, idx: int, all_comp: list) -> dict:
    raw_slug, title, kw, model_a, model_b, verdict = item
    slug = clean_slug(raw_slug)
    path = f"/comparativas/{slug}/"
    next_c = all_comp[(idx + 1) % len(all_comp)]
    prev_c = all_comp[(idx - 1) % len(all_comp)]
    name_a = model_a.split("(")[0].strip()
    name_b = model_b.split("(")[0].strip()
    related = [
        "/comparativas/",
        f"/comparativas/{clean_slug(next_c[0])}/",
        f"/comparativas/{clean_slug(prev_c[0])}/",
        "/mejores-cafeteras-y-accesorios/mejores-cafeteras-espresso-compactas-amazon/",
    ]
    blocks = [
        {
            "type": "p",
            "text": f"Dudar entre **{name_a}** y **{name_b}** es el dilema más habitual al buscar tu equipo de espresso compacto en Amazon Estados Unidos o España. Aunque ambos modelos gozan de miles de reseñas de 5 estrellas, sus diferencias en **ancho de encimera, diámetro de portafiltro, tiempo de calentamiento y vaporizador de leche** hacen que cada uno tenga un comprador ideal distinto.",
        },
        {
            "type": "p",
            "text": f"En este duelo técnico enfrentamos cara a cara a **{model_a}** contra **{model_b}** según su precio en Amazon, facilidad de uso para principiantes y margen de evolución barista.",
        },
        {"type": "h2", "text": f"Tabla comparativa directa: {name_a} vs {name_b}"},
        {
            "type": "table",
            "caption": f"Duelo técnico entre {name_a} y {name_b}",
            "headers": ["Criterio Barista", name_a, name_b],
            "rows": [
                ["Especificación y Perfil", model_a, model_b],
                ["Tiempo de Calentamiento", "Arranque instantáneo Thermoblock / ThermoJet", "Calentamiento rápido listo para extracción"],
                ["Facilidad para Principiantes", "Alta (incluye filtros y controles intuitivos)", "Alta (curva de aprendizaje progresiva)"],
                ["Accesorios Compatibles en Amazon", "Portafiltro Bottomless, Tamper, WDT y Puck Screen", "Amplio catálogo de upgrades en Amazon US y ES"],
                ["Mantenimiento", "Descalcificación cada 60–90 días con EcoDecalk/Dezcal", "Limpieza rápida de ducha, cesta y lanceta"],
            ],
        },
        {
            "type": "callout",
            "variant": "etiqueta",
            "title": "Veredicto rápido del duelo",
            "text": verdict,
        },
        {"type": "h2", "text": f"1. Tamaño en la cocina, materiales y diámetro de accesorios"},
        {
            "type": "p",
            "text": f"Cuando comparas **{name_a}** frente a **{name_b}**, lo primero que debes medir es cuántos centímetros libres tienes bajo las alacenas de tu cocina y con qué ecosistema de accesorios quieres trabajar (51 mm, 54 mm o 58 mm):",
        },
        {
            "type": "ul",
            "items": [
                f"**Puntos donde destaca {name_a}:** brilla por las cualidades de *{model_a}*, siendo una apuesta segura para quienes priorizan ese equilibrio en su rincón de café.",
                f"**Puntos donde destaca {name_b}:** toma ventaja gracias a *{model_b}*, resultando ideal si esas prestaciones se ajustan mejor a tu rutina diaria y presupuesto.",
            ],
        },
        {"type": "h2", "text": "2. Calidad del espresso en taza y texturizado de leche para Latte Art"},
        {
            "type": "p",
            "text": "Tanto si preparas un espresso doble puro (ratio 1:2 de 18 g a 36 g en 27 segundos) como si eres amante del Cappuccino, Flat White o Iced Latte, recuerda que el **molino de café** y la **frescura del grano** representan la mitad del éxito.",
        },
        {
            "type": "ol",
            "items": [
                "**Con café pre-molido (Día 1):** ambos sistemas permiten empezar de inmediato de forma limpia y sencilla.",
                "**Con molino de espresso + portafiltro Bottomless:** al añadir un [Baratza Encore ESP](/resenas-cafeteras/baratza-encore-esp-molino-espresso/), un [Fellow Opus](/resenas-cafeteras/fellow-opus-conical-burr-grinder/) o un [Turin DF54](/resenas-cafeteras/turin-df54-single-dose-flat-burr/) y una báscula mini de 0.1 g, lograrás crema avellana tigreada digna de cafetería.",
            ],
        },
        {
            "type": "cta",
            "text": f"¿Quieres saber cuál de los dos ({name_a} o {name_b}) encaja mejor con tu presupuesto hoy en Amazon? Pregúntale a nuestro Barista IA.",
        },
        {"type": "h2", "text": f"Conclusión: ¿Cuál comprar entre {name_a} y {name_b}?"},
        {
            "type": "p",
            "text": f"Ambos ocupan puestos de honor en nuestro ranking de [las mejores cafeteras espresso compactas en Amazon](/mejores-cafeteras-y-accesorios/mejores-cafeteras-espresso-compactas-amazon/). **{verdict}** Revisa justo arriba y abajo las tarjetas con el precio y disponibilidad hoy en Amazon.com o Amazon.es.",
        },
    ]
    faqs = [
        {"q": f"¿Cuál es mejor compra en Amazon: {name_a} o {name_b}?", "a": verdict},
        {
            "q": f"¿Qué molino de café recomiendan para acompañar a {name_a} o {name_b}?",
            "a": "El Baratza Encore ESP y el Fellow Opus son las dos mejores opciones eléctricas compactas por menos de $200 en Amazon; si prefieres ocupar 0 cm de encimera, el molino manual KINGrinder K6 es imbatible.",
        },
        {
            "q": "¿Usan los mismos accesorios de portafiltro y tamper?",
            "a": "Revisa siempre la medida en milímetros de tu modelo antes de comprar accesorios: 51 mm (3 orejas) para CASABREWS CM5418 y De’Longhi Dedica Arte, 54 mm (53.3 mm) para Breville Bambino y 58 mm para Gaggia Classic o HiBREW H10A.",
        },
    ]
    return {
        "slug": slug,
        "pillar": "comparativas",
        "path": path,
        "isPillar": False,
        "isTransactional": True,
        "primaryKeyword": kw,
        "title": title,
        "seoTitle": f"{name_a} vs {name_b}: Comparativa y Cuál Comprar en Amazon",
        "metaDescription": f"Comparativa a fondo {name_a} vs {name_b}: diferencias de precio, ancho en cm, presión, vaporizador para Latte Art y cuál comprar en Amazon EE. UU.",
        "excerpt": f"Enfrentamos {name_a} frente a {name_b}: tabla comparativa, tamaño, facilidad de uso y veredicto de compra.",
        "quickAnswer": f"En la comparativa entre {name_a} y {name_b}, la decisión depende de tu presupuesto y espacio en la cocina: {verdict}",
        "readingMinutes": 8,
        "image": {
            "prompt": "Two compact brushed stainless steel espresso machines side by side on a modern kitchen counter with two fresh espresso cups and a milk pitcher, warm daylight",
            "alt": f"Comparativa cara a cara entre {name_a} y {name_b}",
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "Specialty Coffee Association (SCA) – Espresso Extraction Standards", "url": "https://sca.coffee/"},
            {"label": "National Coffee Association USA", "url": "https://www.ncausa.org/"},
        ],
        "related": related,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
    }


def make_mejores_article(item: tuple, idx: int, all_mejores: list) -> dict:
    raw_slug, title, kw, summary = item
    slug = clean_slug(raw_slug)
    path = f"/mejores-cafeteras-y-accesorios/{slug}/"
    next_m = all_mejores[(idx + 1) % len(all_mejores)]
    prev_m = all_mejores[(idx - 1) % len(all_mejores)]
    related = [
        "/mejores-cafeteras-y-accesorios/",
        f"/mejores-cafeteras-y-accesorios/{clean_slug(next_m[0])}/",
        f"/mejores-cafeteras-y-accesorios/{clean_slug(prev_m[0])}/",
        "/comparativas/casabrews-cm5418-vs-delonghi-dedica-vs-breville-bambino/",
    ]
    blocks = [
        {
            "type": "p",
            "text": f"{summary} Cuando buscas **{kw}** en Amazon Estados Unidos (`amazon.com`) o España (`amazon.es`), es fundamental separar el marketing superficial de las especificaciones que realmente importan en tu cocina: **el ancho real en centímetros**, **la estabilidad de temperatura y presión** y **la compatibilidad exacta de portafiltros de 51 mm, 54 mm o 58 mm**.",
        },
        {
            "type": "p",
            "text": "Para elaborar esta guía de compra hemos seleccionado únicamente los modelos y accesorios con mejor rendimiento en taza, diseño compacto verificado y miles de reseñas positivas de compradores reales en Amazon.",
        },
        {"type": "h2", "text": f"Tabla comparativa del Ranking: {title.split('(')[0].strip()}"},
        {
            "type": "table",
            "caption": f"Selección oficial recomendada en Amazon para: {kw}",
            "headers": ["Puesto / Categoría", "Modelo Destacado en Amazon", "Medidas & Estándar", "Ventaja Principal"],
            "rows": [
                ["🏆 #1 Calidad-Precio (<$150)", "CASABREWS CM5418 (20 Bar)", "15.0 cm ancho · Portafiltro 51 mm (3 orejas)", "Manómetro frontal en vivo + cuerpo inox cepillado"],
                ["⚡ #2 Mejor Barista Compacta", "Breville Bambino (BES450)", "19.5 cm ancho · Portafiltro 54 mm (3 orejas)", "Calienta en 3 s (ThermoJet) + PID 93 °C + OPV 9 Bar"],
                ["🇮🇹 #3 Mejor Slim 15 cm + Latte Art", "De’Longhi Dedica Arte (EC885M)", "14.9 cm ancho · Portafiltro 51 mm (3 orejas)", "Lanceta profesional MyLatte Art + incluye jarra y tamper"],
                ["⚙️ #4 Mejor Molino Compacto", "Baratza Encore ESP / Fellow Opus", "12.0–12.9 cm ancho · Muelas Cónicas", "20 micro-ajustes de espresso fáciles de calibrar"],
                ["🔩 #5 Upgrade Imprescindible", "Portafiltro Bottomless + Báscula Mini 0.1g", "51 mm o 54 mm + Báscula 10×10 cm", "Desbloquea crema tigreada y clava el ratio 1:2 en 27 s"],
            ],
        },
        {
            "type": "callout",
            "variant": "tip",
            "title": "Cómo elegir en 30 segundos según tu presupuesto en Amazon",
            "text": "Si tu presupuesto para la cafetera es de $100 a $150, ve directo a por la CASABREWS CM5418. Si tienes entre $200 y $250 y una cocina muy estrecha, elige la De’Longhi Dedica Arte (EC885M). Y si puedes invertir ~$299, la Breville Bambino (BES450) ofrece tecnología ThermoJet y 9 bares reales de nivel profesional.",
        },
        {"type": "h2", "text": "Análisis de los ganadores y compatibilidad de accesorios"},
        {"type": "h3", "text": "1. CASABREWS CM5418: La reina de ventas en Amazon Estados Unidos por menos de $150"},
        {
            "type": "p",
            "text": "La **[CASABREWS CM5418](/resenas-cafeteras/casabrews-cm5418-espresso/)** se ha convertido en la primera cafetera espresso favorita en EE. UU. gracias a su manómetro analógico frontal (que muestra visualmente si tu extracción está en la zona ideal), sus 15 cm de ancho y su total compatibilidad con accesorios de **51 mm de 3 orejas**.",
        },
        {"type": "h3", "text": "2. Breville Bambino y Bambino Plus: Calentamiento en 3 segundos y grupo de 54 mm"},
        {
            "type": "p",
            "text": "La **[Breville Bambino BES450](/resenas-cafeteras/breville-bambino-bes450/)** (y la **[Bambino Plus BES500](/resenas-cafeteras/breville-bambino-plus-bes500/)** con espumador automático MilQ) incorpora control digital de temperatura PID y válvula OPV regulada a 9 bares reales, utilizando accesorios de **54 mm (tamper de 53.3 mm)**.",
        },
        {"type": "h3", "text": "3. De’Longhi Dedica Arte (EC885M): Solo 14.9 cm de ancho con lanceta MyLatte Art"},
        {
            "type": "p",
            "text": "La **[De’Longhi Dedica Arte](/resenas-cafeteras/delonghi-dedica-arte-ec885m/)** soluciona el único punto débil de la clásica EC685 al sustituir el panarello por una lanceta de vapor comercial que texturiza microespuma sedosa para dibujar corazones y tulipanes.",
        },
        {
            "type": "cta",
            "text": "¿Quieres que nuestro Barista IA te arme el carrito exacto de cafetera + molino + accesorios compatibles? Escríbele en el chat.",
        },
        {"type": "h2", "text": "5 consejos antes de finalizar tu compra en Amazon"},
        {
            "type": "ol",
            "items": [
                "**Verifica el diámetro en milímetros:** nunca mezcles accesorios de 51 mm con máquinas de 54 mm o 58 mm.",
                "**Añade una báscula mini de 0.1 g desde el primer día:** cuesta menos de $20 y es la herramienta que te garantiza que todos tus cafés salgan iguales.",
                "**Reserva presupuesto para el molino:** un molino como el Baratza Encore ESP, Fellow Opus, Turin DF54 o KINGrinder K6 mejora el sabor más que duplicar el precio de la cafetera.",
                "**Usa grano de tueste medio fresco y agua filtrada:** protegerás el Thermoblock de la cal y obtendrás el triple de crema.",
                "**Ten a mano descalcificador de ácido láctico:** un bote de De’Longhi EcoDecalk o Urnex Dezcal mantendrá tu máquina como nueva por años.",
            ],
        },
    ]
    faqs = [
        {
            "q": f"¿Cuál es la opción #1 recomendada en {kw}?",
            "a": "Por relación calidad-precio en Amazon EE. UU. (<$150) la CASABREWS CM5418 es la #1; por diseño ultra-delgado con lanceta barista gana la De’Longhi Dedica Arte; y por calidad de extracción a 9 bares reales y rapidez (3 s) gana la Breville Bambino.",
        },
        {
            "q": "¿Qué accesorios debo comprar junto con mi primera cafetera compacta?",
            "a": "Te recomendamos empezar con una báscula digital mini (0.1 g con timer), un distribuidor de agujas WDT de 0.3 mm, un embudo dosificador magnético y un tamper calibrado de la medida exacta de tu portafiltro (51 mm o 53.3/54 mm).",
        },
        {
            "q": "¿Los enlaces de esta guía llevan a Amazon Estados Unidos o España?",
            "a": "Ambos: nuestras tarjetas apuntan por defecto a Amazon.com (cafeteracompacta-20) para compradores en Estados Unidos y Latinoamérica, y cambian automáticamente a Amazon.es (cafeteracompacta-21) si navegas desde España o pulsas el selector de tienda.",
        },
    ]
    return {
        "slug": slug,
        "pillar": "mejores-cafeteras-y-accesorios",
        "path": path,
        "isPillar": False,
        "isTransactional": True,
        "primaryKeyword": kw,
        "title": title,
        "seoTitle": f"{title.split('(')[0].strip()} | Ranking Amazon",
        "metaDescription": f"{title}: comparativa con medidas en cm, compatibilidad 51mm/54mm, precios y ofertas verificadas en Amazon Estados Unidos y España.",
        "excerpt": summary,
        "quickAnswer": f"En nuestro ranking actualizado de {kw}, las opciones ganadoras en Amazon son la CASABREWS CM5418 (mejor calidad-precio con manómetro <$150), la Breville Bambino BES450 (mejor extracción barista ThermoJet 3 s y 54 mm) y la De’Longhi Dedica Arte EC885M (mejor diseño slim de 14.9 cm con lanceta MyLatte Art), acompañadas del molino Baratza Encore ESP.",
        "readingMinutes": 9,
        "image": {
            "prompt": "A modern home coffee bar showcasing compact stainless steel espresso machines, a conical burr coffee grinder, bottomless portafilter and silky latte art, bright editorial daylight",
            "alt": title,
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "Specialty Coffee Association (SCA) – Certified Home Brewer & Espresso", "url": "https://sca.coffee/"},
            {"label": "National Coffee Association USA", "url": "https://www.ncausa.org/"},
        ],
        "related": related,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
    }


def make_seo_info_article(cat_slug: str, item: tuple, idx: int, cat_items: list) -> dict:
    raw_slug, title, kw, summary = item
    slug = clean_slug(raw_slug)
    path = f"/{cat_slug}/{slug}/"
    next_i = cat_items[(idx + 1) % len(cat_items)]
    prev_i = cat_items[(idx - 1) % len(cat_items)]
    related = [
        f"/{cat_slug}/",
        f"/{cat_slug}/{clean_slug(next_i[0])}/",
        f"/{cat_slug}/{clean_slug(prev_i[0])}/",
        "/mejores-cafeteras-y-accesorios/mejores-cafeteras-espresso-compactas-amazon/",
    ]
    is_warning = cat_slug in ("problemas-y-soluciones", "mantenimiento-y-descalcificacion")
    callout_variant = "aviso" if is_warning else "tip"
    callout_title = (
        f"Precaución técnica sobre {kw}"
        if is_warning
        else f"Consejo de barista sobre {kw}"
    )
    callout_text = f"{summary} Recuerda verificar siempre si tu portafiltro es de 51 mm (CASABREWS CM5418 / De’Longhi Dedica) o de 54 mm (Breville Bambino) y utilizar agua filtrada para proteger el Thermoblock."

    blocks = [
        {
            "type": "p",
            "text": f"Cuando preparas café espresso en casa con una máquina compacta, entender a fondo **{kw}** marca la diferencia entre una taza aguada o amarga y un espresso denso con crema avellana atigrada. {summary}",
        },
        {
            "type": "p",
            "text": f"En esta guía práctica del silo de **[{cat_slug.replace('-', ' ').title()}](/{cat_slug}/)** analizamos paso a paso los parámetros exactos (gramos, segundos, temperatura y milímetros) aplicados a las cafeteras más populares de Amazon Estados Unidos y España: **[CASABREWS CM5418](/resenas-cafeteras/casabrews-cm5418-espresso/)**, **[Breville Bambino BES450](/resenas-cafeteras/breville-bambino-bes450/)**, **[De’Longhi Dedica Arte EC885M](/resenas-cafeteras/delonghi-dedica-arte-ec885m/)**, **[Gaggia Classic Evo Pro](/resenas-cafeteras/gaggia-classic-evo-pro/)** y **[HiBREW H10A](/resenas-cafeteras/hibrew-h10a-semi-automatica-58mm/)**.",
        },
        {"type": "h2", "text": f"Fundamento técnico y medidas clave: {kw}"},
        {
            "type": "p",
            "text": f"Las cafeteras espresso compactas modernas trabajan con bloques térmicos de calentamiento rápido (Thermoblock o ThermoJet), bombas vibratorias de 15 a 20 bares y cestas de menor diámetro (**51 mm** o **54 mm** frente a los 58 mm de una cafetería). Por ello, cualquier ajuste relacionado con **{kw}** tiene un efecto inmediato en la resistencia hidráulica de la pastilla de café y en la emulsión de los aceites.",
        },
        {
            "type": "table",
            "caption": f"Parámetros de referencia barista para: {kw}",
            "headers": ["Variable Barista", "Valor / Ajuste Óptimo", "Efecto en tu Cafetera Compacta"],
            "rows": [
                ["Clave principal", summary, "Mejora la consistencia y evita errores de extracción"],
                ["Ratio estándar recomendado", "1:2 (ej. 16–18 g en seco → 32–36 g en taza)", "Equilibrio ideal entre acidez, dulzor y cuerpo"],
                ["Tiempo objetivo de extracción", "25 a 30 segundos desde que pulsas el botón", "Evita subextracción ácida (<20 s) y amargor (>35 s)"],
                ["Compatibilidad de grupo", "51 mm (Casabrews/Dedica) · 54 mm (Breville) · 58 mm (Gaggia/HiBREW)", "Asegura sellado perfecto sin fugas laterales"],
                ["Agua y temperatura", "Agua filtrada (50–90 ppm) a 92–93 °C · Leche a 60–65 °C", "Protege contra la cal y maximiza la crema y microespuma"],
            ],
        },
        {
            "type": "callout",
            "variant": callout_variant,
            "title": callout_title,
            "text": callout_text,
        },
        {"type": "h2", "text": f"Paso a paso para aplicar {kw} hoy mismo en tu cocina"},
        {
            "type": "p",
            "text": "Sigue este protocolo de 4 pasos verificados para obtener resultados repetibles desde tu próximo café:",
        },
        {
            "type": "steps",
            "items": [
                {
                    "name": "Paso 1: Precalienta el grupo y el portafiltro con un disparo en vacío",
                    "text": "Encaja el portafiltro vacío en tu cafetera y deja correr agua caliente durante 4 a 5 segundos sobre la taza que vas a usar; luego seca bien la cesta con un paño de microfibra antes de dosificar.",
                },
                {
                    "name": "Paso 2: Pesa la dosis exacta al décimo de gramo y distribuye con WDT",
                    "text": "Coloca entre 15 y 18 g de café recién molido según la capacidad de tu cesta (51 mm o 54 mm), remueve en círculos de abajo hacia arriba con agujas WDT de 0.3 mm y prensa totalmente horizontal con tu tamper.",
                },
                {
                    "name": "Paso 3: Controla la presión y corta la extracción mirando la báscula",
                    "text": "Observa cómo la aguja del manómetro (en modelos como la CASABREWS CM5418) entra en la zona central de espresso y detén la bomba justo cuando la báscula mini alcance tu peso objetivo (32–36 g) en unos 27 segundos.",
                },
                {
                    "name": "Paso 4: Purga la ducha y la lanceta de vapor en menos de 10 segundos",
                    "text": "Golpea la pastilla en el Knock Box, suelta 2 segundos de agua para limpiar la ducha del grupo y, si espumaste leche a 65 °C, limpia la lanceta con paño húmedo y purga un segundo de vapor.",
                },
            ],
        },
        {
            "type": "cta",
            "text": f"¿Tienes dudas con {kw} en tu modelo específico de cafetera o molino? Pregúntale ahora a nuestro Barista IA.",
        },
        {"type": "h2", "text": "Errores comunes que debes evitar"},
        {
            "type": "ul",
            "items": [
                "**Medir el café por cucharadas en vez de gramos:** una variación de solo 1.5 gramos cambia el tiempo de extracción en más de 8 segundos.",
                "**Comprar accesorios sin comprobar los milímetros y las orejas:** un portafiltro de 54 mm jamás entrará en una Dedica o Casabrews de 51 mm.",
                "**Usar café molido fino de espresso en una cesta presurizada:** bloqueará el único micro-orificio de salida provocando sobrepresión.",
                "**Descalcificar con vinagre en lugar de ácido láctico:** daña las juntas internas y deja mal sabor en el circuito térmico.",
            ],
        },
        {"type": "h2", "text": "Cafeteras, molinos y accesorios de Amazon recomendados"},
        {
            "type": "p",
            "text": "Para aplicar todo lo aprendido en esta guía con total comodidad, revisa nuestras recomendaciones de equipamiento compatible en Amazon Estados Unidos y España: desde el **[molino Baratza Encore ESP](/resenas-cafeteras/baratza-encore-esp-molino-espresso/)** y la **[báscula TIMEMORE Black Mirror Mini](/resenas-cafeteras/timemore-black-mirror-mini-bascula/)** hasta los **[mejores kits de accesorios de 51 mm y 54 mm](/mejores-cafeteras-y-accesorios/mejores-portafiltros-bottomless-sin-fondo-51mm-54mm/)**. Tienes las tarjetas con enlace directo a las ofertas justo aquí debajo.",
        },
    ]
    faqs = [
        {
            "q": f"¿Cuál es la clave más importante sobre {kw}?",
            "a": f"{summary} Además, mantén siempre una dosis pesada con báscula de 0.1 g, precalienta el portafiltro y utiliza grano fresco con agua filtrada.",
        },
        {
            "q": "¿Este procedimiento sirve para CASABREWS CM5418, Breville Bambino y De’Longhi Dedica Arte?",
            "a": "Sí, los principios termodinámicos y de extracción se aplican a las tres máquinas, adaptando únicamente el diámetro de los accesorios: 51 mm (3 orejas) para CASABREWS CM5418 y De’Longhi Dedica Arte, y 54 mm (53.3 mm) para Breville Bambino.",
        },
        {
            "q": "¿Qué accesorio barato de Amazon ayuda más a mejorar este punto?",
            "a": "Una báscula digital mini de 0.1 g con temporizador junto con un distribuidor de agujas WDT de 0.3 mm y un embudo magnético (menos de $25 en total en Amazon) ofrecen el mayor salto de calidad y limpieza en tu encimera.",
        },
    ]
    return {
        "slug": slug,
        "pillar": cat_slug,
        "path": path,
        "isPillar": False,
        "isTransactional": False,
        "primaryKeyword": kw,
        "title": title,
        "seoTitle": f"{title.split(':')[0].strip()} | Guía Barista Compacta",
        "metaDescription": f"{title}: {summary} Guía paso a paso, tabla de medidas 51mm/54mm y accesorios recomendados en Amazon.",
        "excerpt": summary,
        "quickAnswer": f"Sobre {kw}: {summary} Para obtener el mejor resultado en tu cafetera espresso compacta, precalienta el portafiltro con agua caliente, pesa tu dosis en báscula de 0.1 g para lograr un ratio 1:2 en 25–30 segundos y usa accesorios del diámetro exacto de tu grupo (51 mm, 54 mm o 58 mm).",
        "readingMinutes": 7,
        "image": {
            "prompt": f"Warm editorial barista photography on a compact modern kitchen counter: {summary}, featuring a brushed stainless steel compact espresso machine, portafilter and rich crema, natural morning light",
            "alt": title,
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "Specialty Coffee Association (SCA) – Barista Skills & Extraction", "url": "https://sca.coffee/"},
            {"label": "Barista Hustle – Espresso Extraction & Coffee Science", "url": "https://www.baristahustle.com/"},
        ],
        "related": related,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
    }


def main():
    SEO_TOPICS = {}
    SEO_TOPICS.update(SEO_PART1)
    SEO_TOPICS.update(SEO_PART2)
    SEO_TOPICS.update(SEO_PART3)

    all_articles = []
    keyword_map = []
    search_index = []

    cat_children = {
        "resenas-cafeteras": RESENAS_40,
        "comparativas": COMPARATIVAS_30,
        "mejores-cafeteras-y-accesorios": MEJORES_30,
        **SEO_TOPICS,
    }

    cat_names = {p["slug"]: p["title"].split(":")[0] for p in PILLARS}

    # 1. Generar los 12 Hubs Pilares
    for p in PILLARS:
        art = make_pillar_article(p, cat_children[p["slug"]])
        all_articles.append(art)

    # 2. Generar las 40 Reseñas Transaccionales
    for idx, item in enumerate(RESENAS_40):
        art = make_resena_article(item, idx, RESENAS_40)
        all_articles.append(art)

    # 3. Generar las 30 Comparativas Transaccionales
    for idx, item in enumerate(COMPARATIVAS_30):
        art = make_comparativa_article(item, idx, COMPARATIVAS_30)
        all_articles.append(art)

    # 4. Generar los 30 Rankings Transaccionales
    for idx, item in enumerate(MEJORES_30):
        art = make_mejores_article(item, idx, MEJORES_30)
        all_articles.append(art)

    # 5. Generar los 500 Artículos SEO Informacionales
    for cat_slug, items in SEO_TOPICS.items():
        for idx, item in enumerate(items):
            art = make_seo_info_article(cat_slug, item, idx, items)
            all_articles.append(art)

    # Verificación estricta de CERO CANIBALIZACIÓN (unicidad de slug, path, title y primaryKeyword)
    seen_slugs = set()
    seen_paths = set()
    seen_kws = set()
    seen_titles = set()
    for a in all_articles:
        assert a["slug"] not in seen_slugs, f"Duplicate slug: {a['slug']}"
        assert a["path"] not in seen_paths, f"Duplicate path: {a['path']}"
        assert a["primaryKeyword"].lower() not in seen_kws, f"Duplicate keyword: {a['primaryKeyword']}"
        assert a["title"].lower() not in seen_titles, f"Duplicate title: {a['title']}"
        seen_slugs.add(a["slug"])
        seen_paths.add(a["path"])
        seen_kws.add(a["primaryKeyword"].lower())
        seen_titles.add(a["title"].lower())

        out_file = ART_DIR / f"{a['slug']}.json"
        out_file.write_text(json.dumps(a, ensure_ascii=False, indent=2), encoding="utf-8")

        keyword_map.append({
            "slug": a["slug"],
            "pillar": a["pillar"],
            "isPillar": a["isPillar"],
            "isTransactional": a.get("isTransactional", False),
            "primaryKeyword": a["primaryKeyword"],
            "path": a["path"],
        })

        search_index.append({
            "t": a["title"],
            "p": a["path"],
            "n": cat_names.get(a["pillar"], a["pillar"]),
            "r": a["readingMinutes"],
        })

    (DATA_DIR / "keyword_map.json").write_text(
        json.dumps(keyword_map, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (PUB_DIR / "search-index.json").write_text(
        json.dumps(search_index, ensure_ascii=False), encoding="utf-8"
    )

    trans_count = sum(1 for a in all_articles if not a["isPillar"] and a.get("isTransactional"))
    seo_count = sum(1 for a in all_articles if not a["isPillar"] and not a.get("isTransactional"))
    pillar_count = sum(1 for a in all_articles if a["isPillar"])
    print(
        f"OK: Generados {len(all_articles)} archivos JSON "
        f"({pillar_count} pilares + {trans_count} transaccionales + {seo_count} SEO info). "
        f"0 canibalizaciones."
    )


if __name__ == "__main__":
    main()
