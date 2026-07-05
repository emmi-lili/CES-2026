import FeatureCardsSection from "@/components/FeatureCardsSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import QuickAccessSection from "@/components/QuickAccessSection";
import SponsorsMarquee from "@/components/SponsorsMarquee";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <QuickAccessSection />
      <FeatureCardsSection />
      <SponsorsMarquee />
      <Footer />
    </main>
  );
}
