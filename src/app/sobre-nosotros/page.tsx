import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import OpenChatButton from "@/components/OpenChatButton";
import { SITE_URL, LEGAL_OWNER, LEGAL_LOCATION, LEGAL_EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre Nosotros y Carlos Lingan Borja | Cafetera Compacta",
  description: `Conoce la misión de CafeteraCompacta.com y a su fundador ${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION} (${LEGAL_EMAIL}).`,
  alternates: { canonical: `${SITE_URL}/sobre-nosotros/` },
};

export default function SobreNosotrosPage() {
  return (
    <SimplePage
      title="Sobre Nosotros"
      crumb="Sobre nosotros"
      href="/sobre-nosotros/"
      intro="Ayudamos a los amantes del café en español a elegir su primera cafetera espresso compacta, molino y accesorios compatibles en Amazon Estados Unidos y España sin equivocarse de medidas ni gastar de más."
    >
      <h2>Nuestra misión: café de especialidad en cocinas reales</h2>
      <p>
        Comprar tu primera cafetera espresso en Amazon Estados Unidos puede ser
        abrumador: docenas de marcas prometen «20 bares profesionales», pero
        pocas explican si realmente caben en una cocina pequeña, qué diferencia
        hay entre la <strong>CASABREWS CM5418</strong>, la{" "}
        <strong>Breville Bambino</strong> y la{" "}
        <strong>De’Longhi Dedica Arte</strong>, o por qué un tamper de 54 mm no
        entra en un portafiltro de 51 mm.
      </p>
      <p>
        Por eso creamos <strong>CafeteraCompacta.com</strong>: una enciclopedia
        práctica de <strong>600 guías especializadas</strong> en español (500
        artículos técnicos de barismo y mantenimiento + 100 análisis y
        comparativas transaccionales) diseñada para que aciertes a la primera.
      </p>

      <h2>Titular y Fundador del Proyecto</h2>
      <div className="my-6 rounded-3xl border border-[var(--line)] bg-fxsky p-6">
        <p className="font-display text-xl font-extrabold text-fxink">
          {LEGAL_OWNER}
        </p>
        <p className="mt-1 text-sm font-semibold text-fxbluedeep">
          Fundador & Editor Jefe de CafeteraCompacta.com
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Emprendedor digital y especialista en arquitectura SEO y comercio
          electrónico, domiciliado en <strong>{LEGAL_LOCATION}</strong>. Dirige
          la verificación técnica de cada guía, el catálogo de compatibilidad de
          accesorios por milímetros y el entrenamiento del Barista IA.
        </p>
        <ul className="mt-3 text-sm">
          <li>
            <strong>Titular legal:</strong> {LEGAL_OWNER}
          </li>
          <li>
            <strong>Domicilio:</strong> {LEGAL_LOCATION}
          </li>
          <li>
            <strong>Email directo:</strong>{" "}
            <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
          </li>
        </ul>
      </div>

      <h2>¿Necesitas una recomendación personalizada ahora mismo?</h2>
      <p>
        Puedes abrir nuestro <strong>Barista IA en línea</strong> para recibir al
        instante el combo exacto de cafetera compacta, molino, espumador y
        báscula según tu presupuesto en Amazon:
      </p>
      <div className="my-6">
        <OpenChatButton
          label="Hablar con el Barista IA ahora"
          prompt="Hola, quiero comprar mi primera cafetera espresso compacta en Amazon y necesito ayuda para elegir entre CASABREWS CM5418, Breville Bambino y De'Longhi Dedica Arte."
          className="btn btn-buy shine"
        />
      </div>
    </SimplePage>
  );
}
