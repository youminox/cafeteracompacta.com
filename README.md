# cafeteracompacta.com — Portal Especializado en Cafeteras Espresso Compactas, Molinos y Accesorios Barista

Portal editorial en español enfocado en análisis técnico de laboratorio, comparativas cara a cara y guías de compra para **cafeteras espresso compactas** en **Amazon Estados Unidos (`amazon.com`)** y **Amazon España (`amazon.es`)**.

---

## Arquitectura y Contenido (620 Páginas Estáticas SSG)

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4.
- **Páginas Generadas:** **620 páginas estáticas** compiladas en build-time:
  - **100 Artículos Transaccionales** distribuidos en 3 silos comerciales:
    1. `analisis-cafeteras` (40 reseñas a fondo de modelos: *CASABREWS CM5418, Breville Bambino BES450, Breville Bambino Plus BES500, De'Longhi Dedica Arte EC885M, De'Longhi Dedica Maestro Plus EC950M, Gaggia Classic Evo Pro, HiBREW H10A/H10B, Ninja Luxe Café ES601*, molinos y accesorios).
    2. `comparativas` (30 duelos directos VS: *CASABREWS CM5418 vs De'Longhi Dedica Arte, Breville Bambino vs De'Longhi Dedica Arte, Breville Bambino vs Bambino Plus, Baratza Encore ESP vs Fellow Opus*, etc.).
    3. `mejores-cafeteras-y-accesorios` (30 rankings y guías de compra Amazon por presupuesto, ancho de encimera y compatibilidad).
  - **500 Artículos SEO Informacionales** distribuidos en 9 silos temáticos sin canibalización:
    4. `molinos-de-cafe` (65 artículos)
    5. `espumadores-y-latte-art` (55 artículos)
    6. `accesorios-y-portafiltros-51mm-54mm-58mm` (65 artículos)
    7. `basculas-y-dosificacion` (45 artículos)
    8. `extraccion-y-recetas-espresso` (65 artículos)
    9. `limpieza-descalcificacion-y-mantenimiento` (60 artículos)
    10. `agua-temperatura-y-presion` (50 artículos)
    11. `cafe-en-grano-y-tueste` (50 artículos)
    12. `espacios-pequenos-y-rincon-del-cafe` (45 artículos)
  - **12 Páginas Pilar (Hubs de Categoría)** + **Home Interactiva (15 secciones visuales)** + **7 Páginas Legales y Editoriales**.

---

## Monetización con Amazon Afiliados

- **Amazon Estados Unidos (`amazon.com` - Tienda principal predeterminada):** Tracking ID `cafeteracompacta-20`
- **Amazon España (`amazon.es` - Selector dual automático):** Tracking ID `cafeteracompacta-21`
- **Componente `AmazonAffiliateBox.tsx`:** Presente en todas las páginas con variantes `verdict`, `vs`, `inline`, `showcase` y `sidebar`, además de selector en vivo de tienda (`🇺🇸 Amazon.com (US)` / `🇪🇸 Amazon.es (ES)`).

---

## Imágenes SEO Ultraligeras (`< 100 KB`)

- Generadas mediante la API de OpenAI (`gpt-image-1`, calidad `medium`) a través de Supabase (`charlielingan` / `ehwjvuhbimqakvzqbvvg`).
- Optimizadas en formato **WebP** en 3 resoluciones (`1200×675`, `800×450`, `400×225`) con peso entre **20 KB y 39 KB** por imagen (`< 100 KB`) en `public/img/ambiente/`.

---

## Chat Online "Barista IA" & Panel Admin en `charlielingan.com`

- **Widget:** `src/components/CafeteraChatWidget.tsx` conectado a la Edge Function `cafetera-chat` en el proyecto Supabase `charlielingan` (`ehwjvuhbimqakvzqbvvg`).
- **Modelo IA Predeterminado:** `gpt-4o-mini` (configurable en tiempo real desde el apartado **`cafeteracompacta.com`** en el panel administrador de `charlielingan.com`, con soporte para intervención humana en vivo, tracking de clics de afiliados Amazon y buscador de los 612 artículos).

---

## Información Legal y Titularidad

- **Titular:** CARLOS LINGAN BORJA
- **Domicilio:** Lima, Perú
- **Contacto:** `info@charlielingan.com`
