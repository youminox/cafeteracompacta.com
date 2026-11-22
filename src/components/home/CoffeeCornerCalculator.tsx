"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CATALOG,
  buildAmazonUrl,
  detectUserAmazonRegion,
  type AmazonStoreRegion,
  type AmazonProductRecommendation,
} from "@/lib/amazon";
import { trackClick } from "@/lib/client-constants";
import OpenChatButton from "@/components/OpenChatButton";

export type EspressoMachineTier = {
  key: string;
  label: string;
  widthCm: number;
  portafilterMm: number;
  heatingSec: number;
  img: string;
  alt: string;
  idealFor: string;
  reviewHref: string;
  productKey: keyof typeof CATALOG;
};

/**
 * Calculadora interactiva clonada de PriceBlock.tsx de prunex1.com:
 * Alterna entre las 3 cafeteras espresso compactas estrella (CASABREWS CM5418, Breville Bambino y De'Longhi Dedica Arte)
 * y calcula cuánto dinero en dólares ahorras al año frente a comprar café en Starbucks/cafeterías según tus tazas diarias.
 */
export default function CoffeeCornerCalculator({
  options,
}: {
  options: EspressoMachineTier[];
}) {
  const [k, setK] = useState(options[0].key);
  const [cupsPerDay, setCupsPerDay] = useState(2);
  const [region, setRegion] = useState<AmazonStoreRegion>("US");

  useEffect(() => {
    setRegion(detectUserAmazonRegion());
  }, []);

  const p = options.find((o) => o.key === k) || options[0];
  const amzProd: AmazonProductRecommendation =
    CATALOG[p.productKey] || CATALOG.CASABREWS_CM5418;
  const amzUrl = buildAmazonUrl(amzProd, region);
  const storeName = region === "US" ? "Amazon.com" : "Amazon.es";
  const currency = region === "US" ? "$" : "€";

  // Un Latte/Espresso en cafetería en EE. UU. cuesta ~$5.50 USD; hecho en casa con grano de especialidad cuesta ~$0.55 USD
  const cafeCostYear = Math.round(cupsPerDay * 5.5 * 365);
  const homeCostYear = Math.round(cupsPerDay * 0.55 * 365);
  const savedMoneyYear = cafeCostYear - homeCostYear;
  const paybackDays = Math.max(
    18,
    Math.round((p.key === "bambino" ? 299 : p.key === "dedica" ? 249 : 139) / (cupsPerDay * 4.95))
  );

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="card card-static spot relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-drink/10 blur-3xl" />
        <div className="relative">
          <div
            className="inline-flex flex-wrap rounded-full bg-fxsky p-1 gap-1"
            role="tablist"
            aria-label="Selector de cafetera espresso compacta"
          >
            {options.map((o) => (
              <button
                key={o.key}
                role="tab"
                type="button"
                aria-selected={o.key === k}
                onClick={() => setK(o.key)}
                className={`rounded-full px-3.5 py-2 text-xs sm:text-sm font-bold transition cursor-pointer ${
                  o.key === k
                    ? "bg-white text-fxbluedeep shadow"
                    : "text-[var(--muted)] hover:text-fxink"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid items-center gap-6 sm:grid-cols-[1fr_1.15fr]">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[240px] overflow-hidden rounded-2xl border border-[var(--line)] shadow-sm">
              <Image
                key={p.img}
                src={p.img}
                alt={p.alt}
                fill
                sizes="240px"
                className="object-cover"
                style={{ animation: "fadeup .45s ease both" }}
              />
            </div>
            <div>
              <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-900">
                {amzProd.badge}
              </span>
              <p className="mt-1.5 font-display text-xl sm:text-2xl font-extrabold tracking-tight text-fxink leading-snug">
                {amzProd.title.split("—")[0].trim()}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">
                {p.idealFor}
              </p>
              <p className="mt-2 text-xs font-bold text-prune">
                Ancho: {p.widthCm} cm · Portafiltro: {p.portafilterMm} mm · Lista en{" "}
                {p.heatingSec} s
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={amzUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() =>
                trackClick(`calc-amazon-${p.key}`, {
                  article_slug: amzProd.id,
                  article_title: amzProd.title,
                  category: "amazon",
                  target_url: amzUrl,
                })
              }
              className="btn btn-buy shine flex-1 text-sm"
              data-magnetic
            >
              🛒 Ver precio en {storeName} ↗
            </a>
            <Link href={p.reviewHref} className="btn btn-ghost text-sm">
              Leer reseña completa →
            </Link>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#23140b] via-[#120c08] to-[#3d1607] p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-fxlime/15 blur-3xl" />
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-fxlime">
          Calculadora de Ahorro Anual y Retorno de Inversión
        </p>
        <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          ¿En cuántos días se paga sola tu cafetera compacta?
        </h3>
        <p className="mt-2 text-sm text-white/70">
          Desliza según cuántos Lattes, Cappuccinos o Espressos toman en casa al
          día. Cada taza casera cuesta ~{currency}0.55 en grano frente a los ~{currency}5.50 de
          una cafetería comercial.
        </p>
        <label
          htmlFor="cups-count"
          className="mt-6 flex items-center justify-between text-sm font-semibold"
        >
          <span>Tazas de espresso / latte al día en casa</span>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-display text-lg text-fxlime">
            {cupsPerDay} {cupsPerDay === 1 ? "taza / día" : "tazas / día"}
          </span>
        </label>
        <input
          id="cups-count"
          type="range"
          min={1}
          max={6}
          step={1}
          value={cupsPerDay}
          onChange={(e) => setCupsPerDay(Number(e.target.value))}
          className="mt-3 w-full accent-[#E5A93C]"
        />
        <div className="mt-1 flex justify-between text-[0.7rem] text-white/45">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <span key={n}>
              {n} {n === 1 ? "taza" : "tazas"}
            </span>
          ))}
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            ["Ahorro neto / año", `${currency}${savedMoneyYear.toLocaleString()}`],
            ["Se paga sola en", `${paybackDays} días`],
            ["Ancho en cocina", `${p.widthCm} cm`],
          ].map(([l, val], i) => (
            <div
              key={l}
              className={`glass flex flex-col-reverse p-3 ${
                i === 0 ? "border-fxlime/50 bg-fxlime/10" : ""
              }`}
            >
              <dt className="mt-1 text-[0.7rem] leading-tight text-white/60">
                {l}
              </dt>
              <dd
                className={`font-display font-extrabold ${
                  i === 0
                    ? "text-xl text-fxlime sm:text-2xl"
                    : "text-xl sm:text-2xl"
                }`}
              >
                {val}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-xs text-white/60">
          <span>
            Con {cupsPerDay} {cupsPerDay === 1 ? "café diario" : "cafés diarios"},
            amortizas tu equipo en solo <strong>{paybackDays} días</strong>.
          </span>
          <OpenChatButton
            label="Armar mi combo con el Barista IA"
            prompt={`Tomo ${cupsPerDay} cafés al día y me interesa la ${p.label} (${p.portafilterMm} mm). ¿Qué molino y accesorios compatibles me recomiendas en Amazon?`}
            className="text-fxlime font-bold hover:underline !bg-transparent !p-0"
          />
        </div>
      </div>
    </div>
  );
}
