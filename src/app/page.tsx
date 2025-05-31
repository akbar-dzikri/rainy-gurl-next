import HeroSection from "@/components/section/HeroSection";
import AboutSection from "@/components/section/AboutSection";
import MembershipSection from "@/components/section/MembershipSection";
import HighlightSection from "@/components/section/HighlightSection";
import ContactSection from "@/components/section/ContactSection";
import KatalogSection from "@/components/section/KatalogSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <HighlightSection />
      <KatalogSection />
      <ContactSection />
      <MembershipSection />
    </>
  );
}
