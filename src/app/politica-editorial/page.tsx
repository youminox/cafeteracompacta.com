import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import { SITE_URL, LEGAL_OWNER, LEGAL_LOCATION, LEGAL_EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política Editorial y Metodología Barista | Cafetera Compacta",
  description: `Metodología de pruebas y criterios técnicos de evaluación de cafeteras espresso compactas dirigida por ${LEGAL_OWNER} (${LEGAL_LOCATION}).`,
  alternates: { canonical: `${SITE_URL}/politica-editorial/` },
};

export default function PoliticaEditorialPage() {
  return (
    <SimplePage
      title="Política Editorial y Metodología de Evaluación"
      crumb="Política editorial"
      href="/politica-editorial/"
      intro="Cómo analizamos cada cafetera espresso compacta, molino, espumador y accesorio para garantizar compatibilidad exacta y resultados reales en taza."
    >
      <h2>1. Dirección editorial</h2>
      <p>
        Todo el contenido técnico publicado en{" "}
        <strong>CafeteraCompacta.com</strong> está supervisado por su titular y
        editor jefe, <strong>{LEGAL_OWNER}</strong>, domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong> (contacto directo:{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>).
      </p>

      <h2>2. Los 5 pilares técnicos de nuestras reseñas y comparativas</h2>
      <ol>
        <li>
          <strong>Huella real en encimera (Ancho × Fondo × Alto):</strong>{" "}
          verificamos cuántos centímetros y pulgadas ocupa cada cafetera y si
          cabe bajo los gabinetes estándar de cocina en Estados Unidos (45 cm /
          18 pulgadas de altura libre) permitiendo extraer el tanque de agua.
        </li>
        <li>
          <strong>Compatibilidad milimétrica del portafiltro:</strong>{" "}
          distinguimos con exactitud quirúrgica entre grupos de{" "}
          <strong>51 mm de 3 orejas</strong> (CASABREWS CM5418, De’Longhi Dedica
          EC685/EC885), <strong>51 mm de 2 orejas</strong> (De’Longhi Stilosa),{" "}
          <strong>54 mm / 53.3 mm</strong> (Breville Bambino / Bambino Plus) y{" "}
          <strong>58 mm comercial</strong> (Gaggia Classic Evo Pro, HiBREW H10A).
        </li>
        <li>
          <strong>Estabilidad térmica y presión real:</strong> evaluamos el
          tiempo de precalentamiento (ThermoJet de 3 segundos vs Thermoblock de
          35 segundos vs caldera simple), la presencia de control electrónico
          PID y la regulación de presión a 9 bares reales mediante válvula OPV.
        </li>
        <li>
          <strong>Potencia y tipo de vaporizador:</strong> probamos la diferencia
          entre lancetas comerciales de 1 o 2 orificios (como MyLatte Art en la
          Dedica Arte o el sistema MilQ automático en la Bambino Plus) frente a
          los tubos panarello tradicionales.
        </li>
        <li>
          <strong>Facilidad de uso para principiantes y curva de mejora:</strong>{" "}
          comprobamos qué tan bien funciona la máquina recién sacada de la caja
          con filtros presurizados y qué tanto mejora al añadir un molino de
          muelas (como el Baratza Encore ESP o Fellow Opus) y un portafiltro
          Bottomless.
        </li>
      </ol>

      <h2>3. Correcciones y contacto técnico</h2>
      <p>
        Revisamos periódicamente las especificaciones de los fabricantes y la
        disponibilidad en Amazon EE. UU. y España. Si detectas cualquier cambio
        de versión en un modelo o deseas sugerir una prueba, escríbenos a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
