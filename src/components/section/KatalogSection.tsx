// components/sections/KatalogSection.tsx
import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/ProductCard";

const katalogItems = [
  {
    title: "Octopus Keychain",
    description:
      "Gantungan kunci lucu berbentuk karakter unik, cocok untuk hadiah dan koleksi pribadi.",
    images: [
      {
        src: "https://placehold.co/640x640.png?text=Placeholder+Octopus+1",
        alt: "Octopus Baby Blue",
        label: "~ Baby Blue ~",
      },
      {
        src: "https://placehold.co/640x640.png?text=Placeholder+Octopus+2",
        alt: "Octopus Baby Pink",
        label: "~ Baby Pink ~",
      },
      {
        src: "https://placehold.co/640x640.png?text=Placeholder+Octopus+3",
        alt: "Octopus Blue Yupi",
        label: "~ Blue Yupi ~",
      },
    ],
  },
  {
    title: "Couple Octopus Keychain",
    description:
      "Gantungan tas kreatif dari bahan rajut berkualitas tinggi, menambah gaya pada tas Anda.",
    images: [
      {
        src: "https://placehold.co/640x640.png?text=Placeholder+Couple+Octopus+1",
        alt: "Banana Couple Octopus",
        label: "~ Banana ~",
      },
      {
        src: "https://placehold.co/640x640.png?text=Placeholder+Couple+Octopus+2",
        alt: "Berry Couple Octopus",
        label: "~ Berry ~",
      },
      {
        src: "https://placehold.co/640x640.png?text=Placeholder+Couple+Octopus+3",
        alt: "Bubble Couple Octopus",
        label: "~ Bubble ~",
      },
    ],
  },
  {
    title: "Lip Holder Bagcharm",
    description:
      "Gantungan tas kreatif dari bahan rajut berkualitas tinggi, menambah gaya pada tas Anda.",
    images: [
      {
        src: "https://placehold.co/640x640.png?text=Placeholder+Lip+Holder+1",
        alt: "Lip Holder Baby Blue",
        label: "~ Baby Blue ~",
      },
      {
        src: "https://placehold.co/640x640.png?text=Placeholder+Lip+Holder+2",
        alt: "Lip Holder Baby Pink",
        label: "~ Baby Pink ~",
      },
      {
        src: "https://placehold.co/640x640.png?text=Placeholder+Lip+Holder+3",
        alt: "Lip Holder Coklat",
        label: "~ Coklat ~",
      },
    ],
  },
  {
    title: "Amplop Rajut",
    description:
      "Amplop unik serbaguna dari rajutan tangan, cocok untuk momen spesial.",
    images: [
      {
        src: "https://placehold.co/640x640.png?text=Placeholder+Amplop+1",
        alt: "Amplop Rajut 1",
        label: "~ Motif A ~",
      },
      {
        src: "https://placehold.co/640x640.png?text=Placeholder+Amplop+2",
        alt: "Amplop Rajut 2",
        label: "~ Motif B ~",
      },
      {
        src: "https://placehold.co/640x640.png?text=Placeholder+Amplop+3",
        alt: "Amplop Rajut 3",
        label: "~ Motif C ~",
      },
    ],
  },
  {
    title: "Mirror Cover Bagcharm",
    description:
      "Cover cermin rajut yang stylish untuk digantung di tas, praktis dan cantik.",
    images: [
      {
        src: "https://placehold.co/640x640.png?text=Placeholder+Mirror+Cover+1",
        alt: "Mirror Cover Baby Blue",
        label: "~ Baby Blue ~",
      },
      {
        src: "https://placehold.co/640x640.png?text=Placeholder+Mirror+Cover+2",
        alt: "Mirror Cover Baby Pink",
        label: "~ Baby Pink ~",
      },
      {
        src: "https://placehold.co/640x640.png?text=Placeholder+Mirror+Cover+3",
        alt: "Mirror Cover Dusty Pink",
        label: "~ Dusty Pink ~",
      },
    ],
  },
  {
    title: "Custom Crochet",
    description:
      "Pesan berbagai kreasi rajut sesuai keinginanmu, mulai dari buket hingga hiasan.",
    images: [
      {
        src: "https://placehold.co/640x640.png?text=Placeholder+Custom+Crochet+1",
        alt: "Crochet Rose",
        label: "~ Rose ~",
      },
      {
        src: "https://placehold.co/640x640.png?text=Placeholder+Custom+Crochet+2",
        alt: "Crochet Sunflower",
        label: "~ Sunflower ~",
      },
      {
        src: "https://placehold.co/640x640.png?text=Placeholder+Custom+Crochet+3",
        alt: "Crochet Daisy",
        label: "~ Daisy ~",
      },
    ],
  },
];

const KatalogSection: React.FC = () => {
  return (
    <section id="katalog" className="py-16 md:py-24 bg-bg-pink">
      <div className="container mx-auto px-4">
        <SectionTitle>Katalog Produk</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {katalogItems.map((item, index) => (
            <ProductCard
              key={index}
              title={item.title}
              description={item.description}
              images={item.images}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KatalogSection;
