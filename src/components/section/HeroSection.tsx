// components/sections/HeroSection.tsx
"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { ChevronDown } from "lucide-react";

const heroImages = [
  { src: "https://placehold.co/640x640.png?text=Hero+Image+1", alt: "Image 1" },
  { src: "https://placehold.co/640x640.png?text=Hero+Image+2", alt: "Image 2" },
  { src: "https://placehold.co/640x640.png?text=Hero+Image+3", alt: "Image 3" },
];

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center text-center">
      <Carousel
        opts={{ loop: true, align: "start" }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
          Fade(),
        ]}
        className="absolute inset-0 w-full h-full z-0"
      >
        <CarouselContent className="h-screen">
          {heroImages.map((img, index) => (
            <CarouselItem key={index} className="h-screen">
              <div className="relative w-full h-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  className="filter brightness-50 blur-sm"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 md:p-8">
        <div className="max-w-3xl">
          <h1
            className="font-cookie text-7xl sm:text-8xl lg:text-9xl font-bold text-white mb-4 md:mb-6 leading-tight"
            style={{
              textShadow:
                "2px 2px 6px rgba(0,0,0,0.7), 0 0 10px rgba(255,105,180,0.6)",
            }}
          >
            Welcome Rainyboo!
          </h1>
          <p
            className="font-garamond text-xl sm:text-2xl lg:text-3xl font-semibold text-putih-lembut mb-8 md:mb-12"
            style={{
              textShadow:
                "1px 1px 4px rgba(0,0,0,0.5), 0 0 8px rgba(255,105,180,0.4)",
            }}
          >
            Happy shopping for handmade products with love.
          </p>
        </div>

        <button
          onClick={() =>
            window.scrollTo({
              top: document.getElementById("about")?.offsetTop || 0,
              behavior: "smooth",
            })
          }
          aria-label="Scroll to About section"
          className="absolute bottom-[calc(12dvh)] animate-bounce cursor-pointer"
        >
          <ChevronDown className="h-10 w-10 text-white opacity-70 hover:opacity-100 transition-opacity" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-bg-pink to-transparent z-5"></div>
    </section>
  );
};

export default HeroSection;
