import FeatureCardsSection from "@/components/FeatureCardsSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import QuickAccessSection from "@/components/QuickAccessSection";
import Reveal from "@/components/Reveal";
import SponsorsMarquee from "@/components/SponsorsMarquee";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <Reveal>
        <QuickAccessSection />
      </Reveal>
      <Reveal>
        <FeatureCardsSection />
      </Reveal>
      <Reveal>
        <SponsorsMarquee />
      </Reveal>
      <Reveal>
        <Footer />
      </Reveal>
    </main>
  );
}
