import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmazonAffiliateBox from "@/components/AmazonAffiliateBox";
import { getContextualAmazonProducts } from "@/lib/amazon";

export default function NotFound() {
  const amz = getContextualAmazonProducts(
    "404",
    "mejores-cafeteras-y-accesorios",
    "Cafetera Espresso Compacta"
  );
  return (
    <>
      <Header />
      <main className="pt-[88px] pb-16">
        <div className="wrap max-w-3xl text-center py-12">
          <span className="eyebrow">Página no encontrada · 404</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold">
            Parece que esta extracción se quedó sin café
          </h1>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Explora nuestras 600 guías técnicas sobre cafeteras espresso
            compactas, molinos y accesorios o consulta nuestro ranking
            actualizado en Amazon Estados Unidos y España.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-buy shine">
              Volver al inicio
            </Link>
            <Link
              href="/mejores-cafeteras-y-accesorios/mejores-cafeteras-espresso-compactas-amazon/"
              className="btn btn-ghost"
            >
              Ver Top 9 en Amazon →
            </Link>
          </div>
        </div>
        <div className="wrap">
          <AmazonAffiliateBox
            variant="showcase"
            sectionTitle={amz.sectionTitle}
            sectionSubtitle={amz.sectionSubtitle}
            products={amz.products}
            source="404"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
