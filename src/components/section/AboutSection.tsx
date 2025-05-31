// components/sections/AboutSection.tsx
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-bg-pink">
      <div className="container mx-auto px-4">
        <SectionTitle>About Us</SectionTitle>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
          <div className="w-full md:w-2/5 flex-shrink-0">
            <div
              className="relative aspect-[1/1] rounded-xl overflow-hidden shadow-2xl border-4 border-white
                            transform transition-all duration-500 hover:scale-105 hover:shadow-pink-cerah/30"
            >
              <Image
                src="https://placehold.co/640x640.png?text=Image+1"
                alt="Rainy Souvenir Crafting Process"
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-500 group-hover:scale-110" // Slight zoom on image itself
              />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left mt-6 md:mt-0">
            <h3
              className="text-3xl lg:text-4xl font-semibold text-white mb-4 font-poppins"
              style={{
                textShadow: "1px 1px 2px #ff69b4, 2px 2px 5px #00000055",
              }}
            >
              Rainy Gurl
            </h3>
            <div className="space-y-4 text-text-dark font-medium text-base md:text-lg leading-relaxed">
              <p>
                Rainy Gurl adalah brand lokal yang menyediakan berbagai produk
                kerajinan tangan (handmade) dengan kualitas terbaik.
              </p>
              <p>
                Bisnis ini ingin menciptakan suasana ramah dan menyenangkan bagi
                konsumen dengan harapan dapat terus berkembang dan diberi rezeki
                deras seperti tetesan air hujan yang digambarkan pada logo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
