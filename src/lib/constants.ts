// lib/constants.ts
export const NavLinks = {
  Home: "/",
  About: "/about",
  Katalog: "/katalog",
  Product: "/highlight",
  Kontak: "/contact",
  Membership: "/membership",
};

export type NavLinkKey = keyof typeof NavLinks;

export const SocialLinks = {
  instagram: "https://instagram.com/rainygurlll_/",
  whatsapp: "https://wa.me/0812345678", // Still placeholder
  tiktok: "https://tiktok.com/@rainygurlll_",
  shopee: "https://shopee.co.id/rainygurlll.official",
};

export const PageRoutes = {
  penjualan: "/penjualan",
  formMember: "/form-member",
};
