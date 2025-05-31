// components/sections/HighlightSection.tsx
"use client";
import { useState, useEffect } from "react";
import SectionTitle from "@/components/SectionTitle";
import HighlightCard from "@/components/HighlightCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageRoutes } from "@/lib/constants";

const highlightItems = [
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+OctopusI+1",
    alt: "Octopus Product 1",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Octopus+2",
    alt: "Octopus Product 2",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Octopus+3",
    alt: "Octopus Product 3",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Octopus+4",
    alt: "Octopus Product 4",
  },

  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Octopus+5",
    alt: "Octopus Product 5",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Octopus+6",
    alt: "Octopus Product 6",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Couple+Octopus+1",
    alt: "Couple Octopus Product 1",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Couple+Octopus+2",
    alt: "Couple Octopus Product 2",
  },

  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Couple+Octopus+3",
    alt: "Couple Octopus Product 3",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Couple+Octopus+4",
    alt: "Couple Octopus Product 4",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Couple+Octopus+5",
    alt: "Couple Octopus Product 5",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Couple+Octopus+6",
    alt: "Couple Octopus Product 6",
  },

  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Lip+Holder+1",
    alt: "Lipstick Holder 1",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Lip+Holder+2",
    alt: "Lipstick Holder 2",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Lip+Holder+3",
    alt: "Lipstick Holder 3",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Lip+Holder+4",
    alt: "Lipstick Holder 4",
  },

  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Lip+Holder+5",
    alt: "Lipstick Holder 5",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Lip+Holder+6",
    alt: "Lipstick Holder 6",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Lip+Holder+7",
    alt: "Lipstick Holder 7",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Lip+Holder+8",
    alt: "Lipstick Holder 8",
  },

  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Mirror+Cover+1",
    alt: "Mirror Cover 1",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Mirror+Cover+2",
    alt: "Mirror Cover 2",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Mirror+Cover+3",
    alt: "Mirror Cover 3",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Mirror+Cover+4",
    alt: "Mirror Cover 4",
  },

  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Amplop",
    alt: "Amplop Raya",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Daisy+Bag",
    alt: "Daisy Bag Charm",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Rose+Bouquet",
    alt: "Rose Bouquet",
  },
  {
    src: "https://placehold.co/640x640.png?text=Placeholder+Sunflower+Bouquet",
    alt: "Sunflower Bouquet",
  },
];

const HighlightSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the viewport is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section id="highlight" className="py-16 md:py-24 bg-bg-pink">
        <div className="container mx-auto px-4">
          <SectionTitle>Highlight Product</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="highlight"
      className="py-16 md:py-24 bg-bg-pink md:px-8"
      aria-label="Featured Products"
    >
      <div className="container mx-auto px-4">
        <SectionTitle>Highlight Product</SectionTitle>
        <Carousel
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: isMobile ? 2 : 4,
          }}
          className="w-full relative group/section"
        >
          <CarouselContent>
            {highlightItems.map((item, itemIndex) => (
              <CarouselItem
                key={itemIndex}
                className="basis-1/2 md:basis-1/4"
                aria-label={`Product group ${itemIndex + 1}`}
              >
                <HighlightCard
                  key={`${itemIndex}`}
                  imgSrc={item.src}
                  altText={item.alt}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious
              className="absolute left-4 md:left-[-40px] top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-bg-dark text-bg-dark hover:text-pink-cerah w-10 h-10 md:w-12 md:h-12 transition-all duration-300 opacity-0 group-hover/section:opacity-100 shadow-lg"
              aria-label="Previous product group"
            />
            <CarouselNext
              className="absolute right-4 md:right-[-40px] top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-bg-dark text-bg-dark hover:text-pink-cerah w-10 h-10 md:w-12 md:h-12 transition-all duration-300 opacity-0 group-hover/section:opacity-100 shadow-lg"
              aria-label="Next product group"
            />
          </div>
          <div className="md:hidden flex items-center justify-center gap-2 mt-6 text-pink-600 font-medium">
            <span>Slide</span>
            <div className="relative w-16 h-4 overflow-hidden">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-pink-400 transform -translate-y-1/2"></div>
              <div className="absolute right-0 top-1/2 w-3 h-3 border-t-2 border-r-2 border-pink-600 transform -translate-y-1/2 rotate-45"></div>
              <div className="absolute right-0 top-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent to-pink-600 transform -translate-y-1/2"></div>
            </div>
          </div>
        </Carousel>

        <div className="mt-10 md:mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            asChild
            className="bg-white hover:bg-putih-lembut text-bg-pink border-bg-dark hover:border-pink-cerah hover:text-pink-cerah font-semibold px-8 py-3 text-lg rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Link href={PageRoutes.penjualan}>Lihat Semua Produk</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HighlightSection;
