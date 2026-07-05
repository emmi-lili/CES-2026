import NavBar from "@/components/NavBar";
import SpeakersSection from "@/components/SpeakersSection";
import SponsorsSection from "@/components/SponsorsSection";

export default function SpeakersPage() {
  return (
    <main className="min-h-screen bg-black">
      <NavBar />
      <SpeakersSection />
      <SponsorsSection />
    </main>
  );
}
