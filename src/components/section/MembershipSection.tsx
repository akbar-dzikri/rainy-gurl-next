// components/sections/MembershipSection.tsx
import SectionTitle from "@/components/SectionTitle";
import BenefitItem from "@/components/BenefitItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageRoutes } from "@/lib/constants";
import { Headset, PercentCircle, StarIcon } from "lucide-react";
import { GiftIcon } from "lucide-react";

const benefits = [
  { icon: StarIcon, text: "Akses Fitur Premium" },
  { icon: GiftIcon, text: "Update Konten Eksklusif" }, // Assuming same icon, update if different
  { icon: Headset, text: "Dukungan Prioritas" }, // Assuming same icon, update if different
  { icon: PercentCircle, text: "Diskon Khusus Membership" },
];

const MembershipSection: React.FC = () => {
  return (
    <section id="membership" className="py-16 md:py-24 bg-bg-pink text-center">
      <div className="container mx-auto px-4">
        <SectionTitle className="text-pink-gelap">
          Join Our Membership
        </SectionTitle>
        <p className="max-w-2xl mx-auto text-text-dark text-lg md:text-xl mb-10 md:mb-12">
          Bergabunglah dengan keanggotaan kami dan nikmati berbagai keuntungan
          eksklusif hanya untuk Anda!
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto mb-10 md:mb-12">
          {benefits.map((benefit, index) => (
            <BenefitItem key={index} Icon={benefit.icon} text={benefit.text} />
          ))}
        </div>
        <Button
          size="lg"
          asChild
          className="bg-pink-cerah hover:bg-pink-gelap text-white font-semibold px-10 py-3 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Link href={PageRoutes.formMember}>Daftar Sekarang</Link>
        </Button>
      </div>
    </section>
  );
};

export default MembershipSection;
