// components/sections/ContactSection.tsx
import SectionTitle from "@/components/SectionTitle";
import SocialCard from "@/components/SocialCard";
import { SocialLinks } from "@/lib/constants";
import WhatsApp from "@/components/icons/whatsapp-icon.png";
import Instagram from "@/components/icons/instagram-icon.png";
import Tiktok from "@/components/icons/tiktok-icon.png";
import Shopee from "@/components/icons/shopee-icon.png";

const socialMediaPlatforms = [
  {
    iconSrc: Instagram,
    platformName: "Instagram",
    username: "@rainygurl",
    link: SocialLinks.instagram,
  },
  {
    iconSrc: WhatsApp,
    platformName: "Whatsapp",
    username: "Chat Admin",
    link: SocialLinks.whatsapp,
  }, // Username changed for WhatsApp
  {
    iconSrc: Tiktok,
    platformName: "TikTok",
    username: "@rainygurl",
    link: SocialLinks.tiktok,
  },
  {
    iconSrc: Shopee,
    platformName: "Shopee",
    username: "rainygurl.id",
    link: SocialLinks.shopee,
  }, // Example Shopee username
];

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-bg-pink">
      <div className="container mx-auto px-4">
        <SectionTitle>Follow Our Social Media</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {socialMediaPlatforms.map((platform) => (
            <SocialCard
              key={platform.platformName}
              iconSrc={platform.iconSrc}
              platformName={platform.platformName}
              username={platform.username}
              link={platform.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
