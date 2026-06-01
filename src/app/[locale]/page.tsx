import Hero from '@/components/home/Hero'
import AboutSection from '@/components/home/AboutSection'
import ReferencesSection from '@/components/home/ReferencesSection'
import CTABanner from '@/components/home/CTABanner'
import ProductsPreview from '@/components/home/ProductsPreview'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProductsPreview />
      <ReferencesSection />
      <CTABanner />
    </>
  )
}
