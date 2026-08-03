import HeroSection from './_components/HeroSection';
import ProductsSection from './_components/ProductsSection';
import ContactSection from './_components/ContactSection';
import Colophon from './_components/Colophon';
import IntroOverlay from './_components/IntroOverlay';

export default async function HomePage() {
  return (
    <div className="min-h-screen">
      <IntroOverlay />
      <HeroSection />
      <ProductsSection />
      <ContactSection />
      <Colophon />
    </div>
  )
}
