import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-sync-key",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const SITE = "https://cafeteracompacta.com";
const ALLOWED_MODELS = ["gpt-4o-mini", "gpt-4o"];
const AMAZON_TAG_US = "cafeteracompacta-20";
const AMAZON_TAG_ES = "cafeteracompacta-21";

export interface ArticleRow {
  slug: string;
  title: string;
  category: string;
  category_name: string;
  excerpt: string | null;
  featured_image: string | null;
  read_time: string | null;
  search_text: string | null;
}

export interface ArticleCard {
  slug: string;
  title: string;
  category: string;
  categoryName: string;
  url: string;
  image: string;
  readTime: string;
  excerpt: string;
}

export interface AmazonProductCard {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  rating: string;
  reviewsCount: string;
  urlUS: string;
  urlES: string;
}

const AMAZON_PRODUCTS: Record<string, AmazonProductCard> = {
  "casabrews-cm5418": {
    id: "casabrews-cm5418",
    badge: "🏆 #1 Más Vendida Amazon US · Manómetro 20 Bar",
    title: "CASABREWS CM5418 — Cafetera Espresso Compacta 20 Bar en Acero Inoxidable con Manómetro",
    subtitle:
      "Solo 15 cm de ancho, manómetro de presión frontal en vivo, lanceta de vapor articulada y portafiltro de 51 mm (3 orejas).",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("CASABREWS CM5418 Espresso Machine 20 Bar Stainless Steel")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("CASABREWS CM5418 Cafetera Espresso 20 Bar Acero Inoxidable")}&tag=${AMAZON_TAG_ES}`,
  },
  "breville-bambino": {
    id: "breville-bambino",
    badge: "⚡ Mejor Calidad Barista · Lista en 3 Segundos",
    title: "Breville Bambino (BES450) — Cafetera Espresso Compacta ThermoJet con Portafiltro 54 mm",
    subtitle:
      "Calienta en 3 segundos (ThermoJet), control electrónico PID a 93 °C, válvula OPV a 9 bares reales y grupo de 54 mm.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Breville Bambino Espresso Machine BES450BSS")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Sage the Bambino Cafetera Espresso Compacta Acero Inoxidable")}&tag=${AMAZON_TAG_ES}`,
  },
  "delonghi-dedica-arte": {
    id: "delonghi-dedica-arte",
    badge: "🇮🇹 Mejor Diseño Slim 15 cm · Lanceta MyLatte Art",
    title: "De’Longhi Dedica Arte (EC885M) — Cafetera Espresso Ultra-Delgada 15 cm con Lanceta Barista",
    subtitle:
      "Chasis metálico de 14.9 cm de ancho con lanceta de vapor comercial MyLatte Art, jarra de leche, tamper metálico y grupo de 51 mm.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("De'Longhi Dedica Arte Espresso Machine EC885M")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("De'Longhi Dedica Arte EC885.M Cafetera Espresso")}&tag=${AMAZON_TAG_ES}`,
  },
  "breville-bambino-plus": {
    id: "breville-bambino-plus",
    badge: "🥛 Mejor Espumador Automático · Vapor MilQ",
    title: "Breville Bambino Plus (BES500) — Espresso Compacta con Espumador de Leche Automático MilQ",
    subtitle:
      "ThermoJet de 3 s + vaporizador automático MilQ manos libres con sensor térmico + válvula solenoide de 3 vías.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Breville Bambino Plus Espresso Machine BES500BSS")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Sage the Bambino Plus Cafetera Espresso Automática")}&tag=${AMAZON_TAG_ES}`,
  },
  "baratza-encore-esp": {
    id: "baratza-encore-esp",
    badge: "⚙️ #1 Molino Compacto para Espresso · Micro-Pasos 1-20",
    title: "Baratza Encore ESP — Molino de Café Compacto de Muelas Cónicas Especial para Espresso",
    subtitle:
      "20 micro-ajustes de alta resolución para calibrar espresso en tu Bambino, Dedica o Casabrews + 20 ajustes para filtro.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Baratza Encore ESP Electric Conical Burr Coffee Grinder")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Baratza Encore ESP Molinillo de Café Espresso")}&tag=${AMAZON_TAG_ES}`,
  },
  "fellow-opus": {
    id: "fellow-opus",
    badge: "🖤 Molino Minimalista y Silencioso · 41+ Ajustes",
    title: "Fellow Opus Conical Burr Grinder — Molino de Café Compacto Antiestático para Espresso",
    subtitle:
      "Solo 12.9 cm de ancho con muelas C6-40 de 6 cuchillas, tecnología antiestática y tolva Single Dose.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Fellow Opus Conical Burr Coffee Grinder Espresso")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Fellow Opus Molinillo de Café Muelas Cónicas Espresso")}&tag=${AMAZON_TAG_ES}`,
  },
  "dreo-baristamaker": {
    id: "dreo-baristamaker",
    badge: "🎨 #1 Espumador para Latte Art · Leche Entera y Avena",
    title: "Dreo BaristaMaker Milk Frother — Espumador de Leche Inteligente para Microespuma y Latte Art",
    subtitle:
      "Impulsor patentado de 2 etapas y jarra de acero inoxidable que crea microespuma de 0.5 mm a 65 °C para dibujar Latte Art.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Dreo BaristaMaker Milk Frother Latte Art Microfoam")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Dreo BaristaMaker Espumador de Leche Latte Art")}&tag=${AMAZON_TAG_ES}`,
  },
  "timemore-mini-scale": {
    id: "timemore-mini-scale",
    badge: "⚖️ Cabe en Bandeja Bambino/Dedica · 0.1g + Auto-Timer",
    title: "TIMEMORE Black Mirror Mini / SearchPean Tiny 2S — Báscula Digital Compacta para Espresso",
    subtitle:
      "Báscula ultra-delgada (~10×10 cm) con sensibilidad de 0.1 g y cronómetro automático al caer la primera gota.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Mini Espresso Scale with Timer 0.1g Rechargeable")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Báscula Café Espresso Mini con Temporizador 0.1g USB")}&tag=${AMAZON_TAG_ES}`,
  },
  "kit-51mm-bottomless": {
    id: "kit-51mm-bottomless",
    badge: "🔩 Upgrade 51 mm (3 Orejas) · Compatible Casabrews & Dedica",
    title: "Portafiltro Bottomless 51 mm (3 Orejas) + Tamper Calibrado 51 mm + WDT y Embudo Magnético",
    subtitle:
      "Kit completo de 51 mm (3 orejas) compatible con CASABREWS CM5418 y De’Longhi Dedica Arte EC885M / EC685M.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("51mm Bottomless Portafilter 3 Ears Delonghi Dedica Casabrews")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Portafiltro Sin Fondo 51mm 3 Orejas Delonghi Dedica Casabrews")}&tag=${AMAZON_TAG_ES}`,
  },
  "kit-54mm-breville": {
    id: "kit-54mm-breville",
    badge: "🎯 Upgrade 54 mm (53.3 mm) · Compatible Breville Bambino",
    title: "Portafiltro Bottomless 54 mm + Tamper Calibrado Normcore V4 (53.3 mm) + Embudo y Puck Screen",
    subtitle:
      "Accesorios de precisión diseñados al milímetro para el grupo de 54 mm de la Breville Bambino y Bambino Plus.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("54mm Bottomless Portafilter and 53.3mm Calibrated Tamper Breville Bambino")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Portafiltro Sin Fondo 54mm y Tamper Calibrado 53.3mm Sage Bambino")}&tag=${AMAZON_TAG_ES}`,
  },
};

function calculateCostUsd(
  model: string,
  promptTokens: number,
  completionTokens: number
): number {
  if (model.includes("mini")) {
    return Number(
      (promptTokens * 0.00000015 + completionTokens * 0.0000006).toFixed(6)
    );
  }
  return Number(
    (promptTokens * 0.0000025 + completionTokens * 0.00001).toFixed(6)
  );
}

const norm = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const STOPWORDS = new Set([
  "como",
  "cual",
  "cuales",
  "que",
  "quien",
  "donde",
  "cuando",
  "por",
  "para",
  "con",
  "sin",
  "una",
  "uno",
  "los",
  "las",
  "del",
  "al",
  "hola",
  "quiero",
  "puedo",
  "recomienda",
  "mejor",
  "mejores",
  "sobre",
  "mas",
  "muy",
  "tiene",
  "tengo",
  "cafetera",
  "cafeteras",
  "cafe",
  "espresso",
]);

function extractTokens(text: string): string[] {
  return norm(text)
    .split(" ")
    .filter((w) => w.length >= 3 && !STOPWORDS.has(w));
}

let catalogCache: {
  at: number;
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
} | null = null;

async function loadCatalog(): Promise<{
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
}> {
  if (
    catalogCache &&
    Date.now() - catalogCache.at < 10 * 60 * 1000 &&
    catalogCache.rows.length > 0
  ) {
    return catalogCache;
  }
  const { data } = await supabase
    .from("cafetera_articles")
    .select(
      "slug, title, category, category_name, excerpt, featured_image, read_time, search_text"
    )
    .eq("active", true)
    .range(0, 999);

  const rows: ArticleRow[] = [];
  const bySlug = new Map<string, ArticleRow>();
  if (Array.isArray(data)) {
    for (const r of data as ArticleRow[]) {
      if (!bySlug.has(r.slug)) {
        bySlug.set(r.slug, r);
        rows.push(r);
      }
    }
  }
  catalogCache = { at: Date.now(), rows, bySlug };
  return catalogCache;
}

function toArticleCard(r: ArticleRow): ArticleCard {
  const img = r.featured_image || "/img/ambiente/home-hero-cafetera.webp";
  const url =
    r.slug === r.category
      ? `${SITE}/${r.category}/`
      : `${SITE}/${r.category}/${r.slug}/`;
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    categoryName: r.category_name,
    url,
    image: img.startsWith("http") ? img : `${SITE}${img}`,
    readTime: r.read_time || "7 min",
    excerpt: (r.excerpt || "").slice(0, 145),
  };
}

function searchArticles(
  rows: ArticleRow[],
  userMessage: string,
  historyText: string,
  limit = 14
): ArticleRow[] {
  const primaryTokens = extractTokens(userMessage);
  const contextTokens = extractTokens(historyText).filter(
    (t) => !primaryTokens.includes(t)
  );
  const fullPhrase = norm(userMessage);

  const starterSlugs = [
    "mejores-cafeteras-espresso-compactas-amazon",
    "casabrews-cm5418-vs-delonghi-dedica-vs-breville-bambino",
    "casabrews-cm5418-espresso",
    "breville-bambino-bes450",
    "delonghi-dedica-arte-ec885m",
    "mejores-molinos-de-cafe-compactos-para-espresso",
    "portafiltro-51mm-vs-54mm-vs-58mm",
    "mejores-espumadores-de-leche-latte-art",
  ];

  if (primaryTokens.length === 0 && contextTokens.length === 0) {
    const picked: ArticleRow[] = [];
    for (const s of starterSlugs) {
      const f = rows.find((r) => r.slug === s);
      if (f) picked.push(f);
    }
    return picked.length > 0 ? picked : rows.slice(0, 8);
  }

  const scored: Array<{ r: ArticleRow; score: number }> = [];
  for (const r of rows) {
    const titleNorm = norm(r.title);
    const catNorm = norm(`${r.category_name} ${r.category}`);
    const bodyNorm =
      r.search_text || `${titleNorm} ${catNorm} ${norm(r.excerpt || "")}`;

    let score = 0;
    if (fullPhrase.length >= 5 && titleNorm.includes(fullPhrase)) score += 45;

    let matchedPrimary = 0;
    for (const tok of primaryTokens) {
      if (titleNorm.includes(tok)) {
        score += 16;
        matchedPrimary++;
      } else if (catNorm.includes(tok)) {
        score += 9;
        matchedPrimary++;
      } else if (bodyNorm.includes(tok)) {
        score += 5;
        matchedPrimary++;
      }
    }
    if (matchedPrimary >= 2) score += matchedPrimary * 8;
    if (starterSlugs.includes(r.slug)) score += 5;

    for (const cTok of contextTokens.slice(-5)) {
      if (titleNorm.includes(cTok)) score += 3;
    }

    if (score > 0) scored.push({ r, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.r);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (b: unknown, status = 200) =>
    new Response(JSON.stringify(b), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const body =
      req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const mode = body.mode || (req.method === "GET" ? "config" : "chat");

    // 0. Seed / Sync articles endpoint
    if (mode === "seed_articles") {
      const syncKey = req.headers.get("x-sync-key") || "";
      if (syncKey !== "cafetera-sync-2026") {
        return json({ error: "No autorizado" }, 401);
      }
      const rows = Array.isArray(body.articles) ? body.articles : [];
      if (rows.length === 0) return json({ error: "Sin artículos" }, 400);
      const { error } = await supabase
        .from("cafetera_articles")
        .upsert(rows, { onConflict: "slug" });
      if (error) return json({ error: error.message }, 500);
      catalogCache = null;
      return json({ success: true, count: rows.length });
    }

    // 1. Load live config (Default: gpt-4o-mini as requested by user)
    const { data: configRow } = await supabase
      .from("cafetera_chat_config")
      .select("*")
      .eq("id", "default")
      .maybeSingle();

    const config = configRow || {
      is_enabled: true,
      ai_model: "gpt-4o-mini",
      temperature: 0.35,
      max_messages_per_session: 30,
      daily_budget_usd: 5.0,
      welcome_message:
        "¡Hola! ☕ Soy tu Barista IA de CafeteraCompacta.com (modelo mini rápido). Cuéntame tu presupuesto en Amazon, el espacio en tu cocina o qué modelo tienes (CASABREWS CM5418, Breville Bambino, De’Longhi Dedica Arte...) y te recomiendo la cafetera, molino, espumador, báscula o accesorios exactos.",
      custom_instructions: "",
    };

    const activeModel = ALLOWED_MODELS.includes(config.ai_model)
      ? config.ai_model
      : "gpt-4o-mini";

    if (mode === "config" || req.method === "GET") {
      return json({
        is_enabled: config.is_enabled,
        welcome_message: config.welcome_message,
        ai_model: activeModel,
        max_messages_per_session: config.max_messages_per_session,
      });
    }

    // 2. Track click on an article or Amazon product
    if (mode === "track_click") {
      const {
        session_id,
        visitor_id,
        article_slug,
        article_title,
        category,
        target_url,
        page_url,
      } = body;
      if (target_url) {
        await supabase.from("cafetera_chat_clicks").insert({
          session_id: session_id || null,
          visitor_id: String(visitor_id || "anon").slice(0, 80),
          article_slug: article_slug ? String(article_slug).slice(0, 180) : null,
          article_title: article_title
            ? String(article_title).slice(0, 240)
            : null,
          category: category ? String(category).slice(0, 80) : null,
          target_url: String(target_url).slice(0, 500),
          page_url: page_url ? String(page_url).slice(0, 500) : null,
        });

        if (session_id) {
          const { data: sess } = await supabase
            .from("cafetera_chat_sessions")
            .select("clicks_count, clicked_urls")
            .eq("id", session_id)
            .maybeSingle();
          if (sess) {
            const urls = Array.isArray(sess.clicked_urls)
              ? sess.clicked_urls
              : [];
            if (!urls.includes(target_url)) urls.push(target_url);
            await supabase
              .from("cafetera_chat_sessions")
              .update({
                clicks_count: (sess.clicks_count || 0) + 1,
                clicked_urls: urls,
              })
              .eq("id", session_id);
          }
        }
      }
      return json({ success: true });
    }

    // 3. Chat Completion
    if (!config.is_enabled) {
      return json({
        reply: `En este momento el Barista IA está en mantenimiento breve. Puedes ver nuestras comparativas en [CafeteraCompacta.com](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: ["Ver Top 9 en Amazon", "Comparativas VS"],
        disabled: true,
      });
    }

    const userMessage = String(body.message || "").trim().slice(0, 1000);
    if (!userMessage) return json({ error: "Mensaje vacío" }, 400);

    const visitorId = String(
      body.visitor_id || "cc-" + crypto.randomUUID().slice(0, 8)
    ).slice(0, 80);
    const region = body.region === "ES" ? "ES" : "US";
    const storeName = region === "ES" ? "Amazon.es" : "Amazon.com";
    const pageUrl = String(body.page_url || SITE + "/").slice(0, 500);
    const userAgent = String(
      body.user_agent || req.headers.get("user-agent") || ""
    ).slice(0, 300);
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
    let sessionId: string | null = body.session_id || null;

    let existingSession: any = null;
    if (sessionId) {
      const { data: s } = await supabase
        .from("cafetera_chat_sessions")
        .select("*")
        .eq("id", sessionId)
        .maybeSingle();
      existingSession = s;
    }

    if (!existingSession) {
      const { data: created, error: createErr } = await supabase
        .from("cafetera_chat_sessions")
        .insert({
          visitor_id: visitorId,
          page_url: pageUrl,
          user_agent: userAgent,
          first_user_message: userMessage.slice(0, 250),
          last_user_message: userMessage.slice(0, 250),
          messages_count: 1,
          model_used: activeModel,
        })
        .select("*")
        .single();

      if (!createErr && created) {
        existingSession = created;
        sessionId = created.id;
      }
    }

    if (sessionId) {
      await supabase.from("cafetera_chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: userMessage,
      });
    }

    const catalog = await loadCatalog();
    const recentHistoryText = history
      .slice(-3)
      .map((h: any) => h?.content || "")
      .join(" ");
    const candidateRows = searchArticles(
      catalog.rows,
      userMessage,
      recentHistoryText,
      14
    );

    const candidatesPrompt =
      candidateRows.length > 0
        ? candidateRows
            .map((r) => {
              const u =
                r.slug === r.category
                  ? `${SITE}/${r.category}/`
                  : `${SITE}/${r.category}/${r.slug}/`;
              return `- SLUG: "${r.slug}" | TÍTULO: "${r.title}" | CATEGORÍA: ${r.category_name} | URL: ${u} | RESUMEN: ${(r.excerpt || "").slice(0, 140)}`;
            })
            .join("\n")
        : "No se encontraron artículos exactos con esos términos.";

    const amazonCatalogPrompt = Object.values(AMAZON_PRODUCTS)
      .map(
        (p) =>
          `- PRODUCT_ID: "${p.id}" | ${p.badge} | NOMBRE: "${p.title}" | DETALLE: ${p.subtitle} | URL_${region}: ${region === "ES" ? p.urlES : p.urlUS}`
      )
      .join("\n");

    const systemPrompt = `Eres el Barista IA Oficial de CafeteraCompacta.com (${SITE}), la enciclopedia líder en español con 600 guías para quienes quieren comprar y dominar su primera cafetera espresso compacta en Amazon Estados Unidos y España (fundado por Carlos Lingan Borja, info@charlielingan.com).

Tu doble misión es:
1. RESPONDER TODAS LAS DUDAS DEL USUARIO con precisión barista:
   - Comparar CASABREWS CM5418, Breville Bambino BES450, Breville Bambino Plus BES500 (vapor automático MilQ + solenoide) y De’Longhi Dedica Arte EC885M.
   - Recomendar molinos (Baratza Encore ESP, Fellow Opus, Turin DF54, KINGrinder K6), espumadores (Dreo BaristaMaker, Subminimal NanoFoamer), básculas mini (TIMEMORE Black Mirror Mini 0.1g) y accesorios compatibles cuidando siempre los milímetros (51 mm vs 54 mm vs 58 mm).
   - Enlazar en tu respuesta a entre 1 y 3 guías de nuestro listado inferior usando Markdown exacto: [Título](${SITE}/categoria/slug/) e incluir sus slugs en "recommended_slugs".
2. AYUDAR ACTIVAMENTE A QUE COMPREN EL PRODUCTO IDEAL EN AMAZON (${storeName}):
   - Recomienda siempre la cafetera, molino o accesorio exacto de nuestro CATÁLOGO AMAZON OFICIAL de abajo.
   - Incluye en tu texto un enlace Markdown directo al producto en ${storeName} usando su URL_${region} exacta y añade entre 1 y 2 IDs en "recommended_product_ids".

CATÁLOGO AMAZON OFICIAL (${storeName}):
${amazonCatalogPrompt}

ARTÍCULOS ENCONTRADOS EN CAFETERACOMPACTA.COM:
${candidatesPrompt}

Responde ÚNICAMENTE con un objeto JSON válido con estas 4 llaves exactas:
{
  "reply": "Tu respuesta experta en español con enlaces Markdown a nuestras guías y al producto en ${storeName}",
  "recommended_slugs": ["slug-1", "slug-2"],
  "recommended_product_ids": ["casabrews-cm5418"],
  "suggested_options": ["Opción 1", "Opción 2", "Opción 3"]
}`;

    const chatMessages: any[] = [{ role: "system", content: systemPrompt }];
    for (const h of history) {
      if (
        h &&
        (h.role === "user" || h.role === "assistant") &&
        typeof h.content === "string"
      ) {
        chatMessages.push({ role: h.role, content: h.content.slice(0, 1200) });
      }
    }
    chatMessages.push({ role: "user", content: userMessage });

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: activeModel,
          messages: chatMessages,
          temperature: Number(config.temperature) || 0.35,
          max_tokens: 900,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!openaiRes.ok) {
      throw new Error("OpenAI status " + openaiRes.status);
    }

    const openaiData = await openaiRes.json();
    const rawContent = openaiData.choices?.[0]?.message?.content || "{}";
    let parsed: any = {};
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      parsed = {
        reply: rawContent,
        recommended_slugs: candidateRows.slice(0, 2).map((r) => r.slug),
        recommended_product_ids: ["casabrews-cm5418"],
        suggested_options: [
          "¿CASABREWS CM5418 vs Breville Bambino?",
          "¿Qué molino compacto elegir?",
          "¿Accesorios 51 mm vs 54 mm?",
        ],
      };
    }

    const slugs: string[] = Array.isArray(parsed.recommended_slugs)
      ? parsed.recommended_slugs.slice(0, 3)
      : [];
    const recommendedArticles: ArticleCard[] = slugs
      .map((s) => catalog.bySlug.get(s))
      .filter((r): r is ArticleRow => Boolean(r))
      .map(toArticleCard);

    const productIds: string[] = Array.isArray(parsed.recommended_product_ids)
      ? parsed.recommended_product_ids.slice(0, 2)
      : ["casabrews-cm5418"];
    const recommendedProducts: AmazonProductCard[] = productIds
      .map((id) => AMAZON_PRODUCTS[id])
      .filter((p): p is AmazonProductCard => Boolean(p));

    const suggestedOptions: string[] = Array.isArray(parsed.suggested_options)
      ? parsed.suggested_options
          .slice(0, 3)
          .map((s: unknown) => String(s).slice(0, 72))
      : [];

    const replyText: string =
      parsed.reply ||
      `Te recomiendo explorar nuestro ranking en [CafeteraCompacta.com](${SITE}/mejores-cafeteras-y-accesorios/mejores-cafeteras-espresso-compactas-amazon/).`;

    const promptTokens = openaiData.usage?.prompt_tokens || 0;
    const completionTokens = openaiData.usage?.completion_tokens || 0;
    const totalTokens =
      openaiData.usage?.total_tokens || promptTokens + completionTokens;
    const costUsd = calculateCostUsd(
      activeModel,
      promptTokens,
      completionTokens
    );

    if (sessionId && existingSession) {
      await supabase.from("cafetera_chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: replyText,
        recommended_articles: recommendedArticles,
        suggested_options: suggestedOptions,
        model: activeModel,
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: totalTokens,
        cost_usd: costUsd,
      });

      const prevRecs: string[] = Array.isArray(
        existingSession.recommended_articles
      )
        ? existingSession.recommended_articles
        : [];
      for (const ra of recommendedArticles) {
        if (!prevRecs.includes(ra.title)) prevRecs.push(ra.title);
      }
      for (const rp of recommendedProducts) {
        const label = `[Amazon] ${rp.title}`;
        if (!prevRecs.includes(label)) prevRecs.push(label);
      }

      await supabase
        .from("cafetera_chat_sessions")
        .update({
          last_user_message: userMessage.slice(0, 250),
          messages_count: (existingSession.messages_count || 1) + 2,
          recommended_articles: prevRecs.slice(0, 30),
          prompt_tokens: (existingSession.prompt_tokens || 0) + promptTokens,
          completion_tokens:
            (existingSession.completion_tokens || 0) + completionTokens,
          total_tokens: (existingSession.total_tokens || 0) + totalTokens,
          estimated_cost_usd: Number(
            (Number(existingSession.estimated_cost_usd || 0) + costUsd).toFixed(
              6
            )
          ),
          model_used: activeModel,
          last_message_at: new Date().toISOString(),
        })
        .eq("id", sessionId);
    }

    await supabase.from("token_usage").insert({
      source: "cafeteracompacta.com",
      content_type: "ai_chat",
      model: activeModel,
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
      images_generated: 0,
      estimated_cost_usd: costUsd,
      slug: sessionId || visitorId,
    });

    return json({
      session_id: sessionId,
      reply: replyText,
      recommended_articles: recommendedArticles,
      recommended_products: recommendedProducts,
      suggested_options: suggestedOptions,
      model: activeModel,
    });
  } catch (err: any) {
    return json(
      {
        error: err.message || "Error interno",
        reply: `Puedes explorar nuestras 600 guías en [CafeteraCompacta.com](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: ["Intentar de nuevo"],
      },
      500
    );
  }
});
