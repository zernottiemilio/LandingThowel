import { Hero } from "@/components/home/Hero";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { CalidadSection } from "@/components/home/CalidadSection";
import { CatalogHeader } from "@/components/home/CatalogHeader";
import { CatalogCarousel } from "@/components/home/CatalogCarousel";

export function HomePage() {
  return (
    <>
      <Hero />
      <ProductShowcase />
      <CalidadSection />
      <CatalogHeader />
      <CatalogCarousel />
    </>
  );
}
