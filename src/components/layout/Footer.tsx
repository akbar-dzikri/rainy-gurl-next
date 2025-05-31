import Link from "next/link";
import { Instagram, MessageCircle, ShoppingCart } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { NavLinks, NavLinkKey, SocialLinks, PageRoutes } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  const navLinkKeys = Object.keys(NavLinks) as NavLinkKey[];

  const socialIcons = [
    {
      href: SocialLinks.instagram,
      icon: <Instagram className="h-5 w-5" />,
      label: "Instagram",
    },
    {
      href: SocialLinks.whatsapp,
      icon: <MessageCircle className="h-5 w-5" />,
      label: "WhatsApp",
    },
    {
      href: PageRoutes.penjualan,
      icon: <ShoppingCart className="h-5 w-5" />,
      label: "Shopping Cart",
    },
  ];

  return (
    <footer className="bg-white text-bg-dark py-4 border-t-2 border-pink-cerah mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-4">
          <BrandLogo size="sm" />

          <nav className="hidden md:flex flex-wrap justify-center gap-x-4 gap-y-2">
            {navLinkKeys.map((key) => (
              <Link
                key={key}
                href={NavLinks[key]}
                className="text-sm font-medium text-bg-pink hover:text-pink-cerah transition-colors"
              >
                {key}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socialIcons.map((social) => (
              <Button key={social.label} variant="ghost" size="icon" asChild>
                <Link
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 border-t border-gray-200 pt-4 mt-4">
          <p>© {new Date().getFullYear()} Rainy Gurl. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
