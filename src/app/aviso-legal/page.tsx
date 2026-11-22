import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import { SITE_URL, LEGAL_OWNER, LEGAL_LOCATION, LEGAL_EMAIL } from "@/lib/content";
import { AMAZON_TAG_ES, AMAZON_TAG_US } from "@/lib/amazon";

export const metadata: Metadata = {
  title: "Aviso Legal y Condiciones de Uso | Cafetera Compacta",
  description: `Aviso legal y titularidad de CafeteraCompacta.com a cargo de ${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION} (${LEGAL_EMAIL}).`,
  alternates: { canonical: `${SITE_URL}/aviso-legal/` },
};

export default function AvisoLegalPage() {
  return (
    <SimplePage
      title="Aviso Legal y Condiciones de Uso"
      crumb="Aviso legal"
      href="/aviso-legal/"
      intro="Información de titularidad legal, condiciones generales de uso, propiedad intelectual y naturaleza editorial independiente del portal CafeteraCompacta.com."
    >
      <h2>1. Datos identificativos del titular de la web</h2>
      <p>
        En cumplimiento de las disposiciones vigentes sobre servicios de la
        sociedad de la información, comercio electrónico y transparencia
        digital, se informa a los usuarios y lectores que el presente portal web{" "}
        <strong>cafeteracompacta.com</strong> es propiedad y está gestionado
        por:
      </p>
      <ul>
        <li>
          <strong>Titular del sitio web:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio legal:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico oficial de contacto:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
        <li>
          <strong>Dominio principal:</strong> {SITE_URL}
        </li>
      </ul>

      <h2>2. Objeto y naturaleza del sitio web</h2>
      <p>
        <strong>CafeteraCompacta.com</strong> es una publicación digital en
        español dedicada al análisis técnico, comparativas de dimensiones,
        temperatura, presión y facilidad de uso de cafeteras espresso compactas
        (como CASABREWS CM5418, Breville Bambino y De’Longhi Dedica Arte), así
        como molinos de café, espumadores de leche, básculas digitales y
        accesorios compatibles de 51 mm, 54 mm y 58 mm disponibles en Amazon
        Estados Unidos y España.
      </p>

      <h2>3. Independencia de marcas comerciales</h2>
      <p>
        Este sitio web es un medio editorial independiente operado por{" "}
        <strong>{LEGAL_OWNER}</strong>. Todas las marcas registradas, nombres de
        modelos y denominaciones comerciales citadas con fines descriptivos y
        comparativos (incluyendo CASABREWS®, Breville®, Sage®, De’Longhi®,
        Gaggia®, Baratza®, Fellow®, Nespresso®, Subminimal®, Dreo®, TIMEMORE®,
        Normcore®, entre otras) pertenecen exclusivamente a sus respectivos
        fabricantes y titulares.
      </p>

      <h2>4. Participación en el Programa de Afiliados de Amazon</h2>
      <p>
        <strong>{LEGAL_OWNER}</strong> participa en el Programa de Afiliados de
        Amazon.com Associates (Estados Unidos y Global, ID de rastreo:{" "}
        <code>{AMAZON_TAG_US}</code>) y en el Programa de Afiliados de Amazon EU
        (España, ID de seguimiento: <code>{AMAZON_TAG_ES}</code>). En calidad de
        Afiliado de Amazon, este sitio web obtiene ingresos por las compras
        adscritas que cumplen los requisitos aplicables, sin ningún costo
        adicional para el usuario.
      </p>

      <h2>5. Propiedad intelectual e industrial</h2>
      <p>
        La totalidad de los textos, estructura de silos temáticos, tablas
        técnicas comparativas, calculadoras interactivas, diagramas SVG, código
        fuente y fotografías originales de <strong>cafeteracompacta.com</strong>{" "}
        son titularidad intelectual de <strong>{LEGAL_OWNER}</strong>. Queda
        prohibida su reproducción o distribución sin autorización expresa por
        escrito solicitada a <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        .
      </p>

      <h2>6. Legislación aplicable y contacto</h2>
      <p>
        El presente Aviso Legal se rige por la normativa vigente en la República
        del Perú (incluyendo la Ley N.º 29571, Código de Protección y Defensa
        del Consumidor) y los estándares internacionales de protección al
        consumidor aplicable a usuarios en Estados Unidos y la Unión Europea.
        Para cualquier comunicación legal, puede dirigirse directamente a{" "}
        <strong>{LEGAL_OWNER}</strong> en <strong>{LEGAL_LOCATION}</strong> a
        través del correo <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
