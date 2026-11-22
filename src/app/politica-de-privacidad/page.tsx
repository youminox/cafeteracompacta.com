import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import { SITE_URL, LEGAL_OWNER, LEGAL_LOCATION, LEGAL_EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de Privacidad y Protección de Datos | Cafetera Compacta",
  description: `Política de privacidad de CafeteraCompacta.com. Responsable del tratamiento: ${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION} (${LEGAL_EMAIL}).`,
  alternates: { canonical: `${SITE_URL}/politica-de-privacidad/` },
};

export default function PoliticaPrivacidadPage() {
  return (
    <SimplePage
      title="Política de Privacidad"
      crumb="Política de privacidad"
      href="/politica-de-privacidad/"
      intro="Transparencia sobre el tratamiento de datos personales, funcionamiento del Barista IA y ejercicio de derechos ARCO y privacidad."
    >
      <h2>1. Responsable del tratamiento de los datos</h2>
      <ul>
        <li>
          <strong>Responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico para privacidad y derechos ARCO:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
        <li>
          <strong>Sitio web:</strong> {SITE_URL}
        </li>
      </ul>

      <h2>2. Datos que recopilamos y finalidad</h2>
      <p>
        En <strong>CafeteraCompacta.com</strong> respetamos al máximo la
        privacidad del lector. No exigimos registro de cuenta ni recopilamos
        datos bancarios. Únicamente se procesan:
      </p>
      <ul>
        <li>
          <strong>Consultas en el sistema de Chat Online (Barista IA):</strong>{" "}
          cuando el usuario decide interactuar con el asistente virtual, se
          almacena un identificador técnico anónimo de sesión, las consultas
          realizadas sobre cafeteras o accesorios y los clics hacia guías o
          productos recomendados, con el único propósito de responder sus
          inquietudes y mejorar la calidad de las recomendaciones.
        </li>
        <li>
          <strong>Comunicaciones por correo electrónico:</strong> si el usuario
          escribe voluntariamente a{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>, su dirección de
          correo se utilizará exclusivamente para responder su consulta.
        </li>
      </ul>

      <h2>3. Base legal y normativa aplicable</h2>
      <p>
        El tratamiento de datos se realiza en cumplimiento de la{" "}
        <strong>
          Ley N.º 29733 (Ley de Protección de Datos Personales del Perú)
        </strong>{" "}
        y su reglamento, así como bajo los principios del Reglamento General de
        Protección de Datos (RGPD) para visitantes europeos y la normativa de
        privacidad estatal aplicable a usuarios hispanohablantes en Estados
        Unidos (CCPA/CPRA).
      </p>

      <h2>4. Destinatarios y encargados del tratamiento</h2>
      <p>
        No vendemos ni cedemos datos personales a terceros. Para la operación
        técnica del chat en línea utilizamos la infraestructura segura en la
        nube de Supabase y el procesamiento de lenguaje natural de OpenAI (modelo
        mini predeterminado), bajo estrictos acuerdos de confidencialidad y
        seguridad cifrada HTTPS/TLS.
      </p>

      <h2>5. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)</h2>
      <p>
        En cualquier momento puedes ejercer tus derechos de acceso,
        rectificación, supresión, limitación u oposición enviando un correo
        electrónico directo al titular responsable{" "}
        <strong>{LEGAL_OWNER}</strong> (domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong>) a la dirección{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
