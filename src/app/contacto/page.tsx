import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import OpenChatButton from "@/components/OpenChatButton";
import { SITE_URL, LEGAL_OWNER, LEGAL_LOCATION, LEGAL_EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacto Oficial | Cafetera Compacta",
  description: `Contacta con ${LEGAL_OWNER} (${LEGAL_LOCATION}) en ${LEGAL_EMAIL} o consulta en vivo a nuestro Barista IA.`,
  alternates: { canonical: `${SITE_URL}/contacto/` },
};

export default function ContactoPage() {
  return (
    <SimplePage
      title="Contacto Oficial"
      crumb="Contacto"
      href="/contacto/"
      intro="¿Tienes alguna consulta sobre una cafetera espresso compacta, compatibilidad de accesorios o asuntos legales? Estamos a tu disposición."
    >
      <h2>Datos de contacto directo del titular</h2>
      <ul>
        <li>
          <strong>Titular responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico oficial:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <h2>Asesoría inmediata 24/7 con nuestro Barista IA</h2>
      <p>
        Si tu consulta es sobre qué cafetera comprar en Amazon Estados Unidos o
        España, cómo ajustar la molienda de tu Baratza Encore ESP, qué
        portafiltro Bottomless de 51 mm o 54 mm elegir o cómo descalcificar tu
        máquina, nuestro <strong>Barista IA</strong> responde en segundos con
        enlaces directos a las guías y productos compatibles:
      </p>
      <div className="my-6">
        <OpenChatButton
          label="Abrir Barista IA en Vivo"
          prompt="Hola, tengo una duda sobre qué cafetera espresso compacta y accesorios comprar en Amazon."
          className="btn btn-buy shine"
        />
      </div>
    </SimplePage>
  );
}
