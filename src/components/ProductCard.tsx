import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface ProductImage {
  src: string;
  alt: string;
  label: string;
}

interface ProductCardProps {
  title: string;
  description: string;
  images: ProductImage[];
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  images,
  className,
}) => {
  return (
    <Card
      className={`w-full max-w-md bg-putih-lembut border-2 border-bg-dark shadow-lg hover:shadow-xl  duration-300 rounded-xl overflow-hidden hover:scale-105 hover:border-pink-cerah hover:border-2 hover:shadow-pink-cerah  transition-all ease-in-out ${className}`}
    >
      <CardHeader className="pb-3 pt-5 px-5">
        <CardTitle className="text-xl font-semibold text-pink-gelap text-center">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-text-dark text-center pt-1 min-h-[3em]">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            {images.map((img, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-bg-dark/50">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p className="mt-1.5 text-xs italic text-bg-dark text-center">
                  {img.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
