import FeatureCardsSection from "@/components/FeatureCardsSection";
import HeroSection from "@/components/HeroSection";
import QuickAccessSection from "@/components/QuickAccessSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <QuickAccessSection />
      <FeatureCardsSection />
    </main>
  );
}
