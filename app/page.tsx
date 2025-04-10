import HeroSection from './_components/HeroSection';
import ProductsSection from './_components/ProductsSection';
import ContactSection from './_components/ContactSection';

export default async function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProductsSection />
      <ContactSection />
    </div>
  )
}
