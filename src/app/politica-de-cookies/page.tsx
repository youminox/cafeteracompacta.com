import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import { SITE_URL, LEGAL_OWNER, LEGAL_LOCATION, LEGAL_EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de Cookies y Almacenamiento Local | Cafetera Compacta",
  description: `Política de cookies y localStorage de CafeteraCompacta.com, titularidad de ${LEGAL_OWNER} (${LEGAL_LOCATION}).`,
  alternates: { canonical: `${SITE_URL}/politica-de-cookies/` },
};

export default function PoliticaCookiesPage() {
  return (
    <SimplePage
      title="Política de Cookies y Almacenamiento Local"
      crumb="Política de cookies"
      href="/politica-de-cookies/"
      intro="Detalle técnico sobre las claves de almacenamiento local (localStorage) que utiliza CafeteraCompacta.com y las cookies de atribución de Amazon."
    >
      <h2>1. Titularidad y transparencia técnica</h2>
      <p>
        Este sitio web, propiedad de <strong>{LEGAL_OWNER}</strong> (domiciliado
        en <strong>{LEGAL_LOCATION}</strong> · correo:{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>), ha sido
        desarrollado con una arquitectura estática ultraligera que no instala
        cookies publicitarias invasivas de seguimiento cruzado en tu navegador.
      </p>

      <h2>2. Uso de almacenamiento local (localStorage)</h2>
      <p>
        Para recordar tu conversación con el Barista IA y tu preferencia de
        tienda Amazon (Estados Unidos <code>Amazon.com</code> o España{" "}
        <code>Amazon.es</code>), tu navegador guarda localmente las siguientes
        claves técnicas:
      </p>
      <ul>
        <li>
          <code>cc_amazon_region</code>: almacena si prefieres ver los precios y
          enlaces en Amazon Estados Unidos (<code>US</code>) o Amazon España (
          <code>ES</code>).
        </li>
        <li>
          <code>cc_visitor</code> y <code>cc_chat_session</code>: identificador
          anónimo aleatorio para mantener el hilo de tu conversación con el
          Barista IA mientras navegas entre diferentes guías.
        </li>
        <li>
          <code>cc_chat_messages</code>: guarda en tu dispositivo los últimos
          mensajes del chat (puedes borrarlos en cualquier momento pulsando el
          botón «Reiniciar» en la ventana del chat).
        </li>
      </ul>

      <h2>3. Cookies de terceros (Amazon Associates)</h2>
      <p>
        Cuando haces clic voluntariamente en un botón o enlace de oferta hacia{" "}
        <strong>Amazon.com</strong> o <strong>Amazon.es</strong>, Amazon instala
        su propia cookie de atribución de afiliado durante la ventana estándar
        del programa (habitualmente 24 horas) para reconocer que la visita
        procede de <strong>CafeteraCompacta.com</strong>, sin que ello modifique
        el precio del producto.
      </p>

      <h2>4. Cómo borrar o desactivar el almacenamiento local</h2>
      <p>
        Puedes eliminar los datos locales en cualquier instante desde las
        opciones de privacidad de tu navegador (Chrome, Safari, Firefox o Edge)
        o pulsando «Reiniciar» en el widget del Barista IA. Si tienes dudas,
        escribe a <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
