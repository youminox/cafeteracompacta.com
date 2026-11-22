import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import { SITE_URL, LEGAL_OWNER, LEGAL_LOCATION, LEGAL_EMAIL } from "@/lib/content";
import { AMAZON_TAG_ES, AMAZON_TAG_US } from "@/lib/amazon";

export const metadata: Metadata = {
  title: "Divulgación de Afiliados de Amazon | Cafetera Compacta",
  description: `Declaración de transparencia sobre enlaces de afiliados de Amazon Estados Unidos (${AMAZON_TAG_US}) y España (${AMAZON_TAG_ES}) en CafeteraCompacta.com.`,
  alternates: { canonical: `${SITE_URL}/divulgacion-de-afiliados/` },
};

export default function DivulgacionAfiliadosPage() {
  return (
    <SimplePage
      title="Divulgación de Afiliados de Amazon"
      crumb="Divulgación de afiliados"
      href="/divulgacion-de-afiliados/"
      intro="Transparencia total sobre cómo se financia CafeteraCompacta.com mediante el Programa de Afiliados de Amazon Estados Unidos y España."
    >
      <h2>1. Declaración oficial de afiliación con Amazon</h2>
      <p>
        <strong>CafeteraCompacta.com</strong>, portal titularidad de{" "}
        <strong>{LEGAL_OWNER}</strong> (domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong> · correo electrónico:{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>), participa
        oficialmente en el Programa de Afiliados de Amazon:
      </p>
      <ul>
        <li>
          <strong>Amazon Estados Unidos y Latinoamérica (Amazon.com):</strong>{" "}
          ID de rastreo oficial <code>{AMAZON_TAG_US}</code>.
        </li>
        <li>
          <strong>Amazon España y Unión Europea (Amazon.es):</strong> ID de
          seguimiento oficial <code>{AMAZON_TAG_ES}</code>.
        </li>
      </ul>
      <p>
        En calidad de Afiliado de Amazon, obtenemos ingresos por las compras
        adscritas que cumplen los requisitos aplicables.
      </p>

      <h2>2. ¿Tiene algún costo adicional para el comprador?</h2>
      <p>
        <strong>Absolutamente ninguno.</strong> El precio que pagas en Amazon es
        exactamente el mismo (incluyendo descuentos Prime, cupones de fabricante
        y ofertas relámpago) tanto si accedes desde nuestros botones como si
        entras directamente a Amazon. La pequeña comisión procede del presupuesto
        de marketing de Amazon y nos permite mantener 600 guías gratuitas sin
        anuncios intrusivos.
      </p>

      <h2>3. Criterio de selección e independencia editorial</h2>
      <p>
        Nuestras comparativas de modelos como la{" "}
        <strong>CASABREWS CM5418</strong>, la <strong>Breville Bambino</strong>{" "}
        y la <strong>De’Longhi Dedica Arte</strong>, así como las
        recomendaciones de molinos, espumadores, básculas y accesorios de 51 mm,
        54 mm y 58 mm, se basan estrictamente en pruebas de compatibilidad
        física, estabilidad de presión, dimensiones para cocinas pequeñas y
        valoraciones verificadas de compradores reales.
      </p>
    </SimplePage>
  );
}
