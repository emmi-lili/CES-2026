import HeroSection from "@/components/HeroSection";
import MeruSection from "@/components/MeruSection";
import QuickAccessSection from "@/components/QuickAccessSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <MeruSection />
      <QuickAccessSection />
    </main>
  );
}
