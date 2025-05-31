import { useState } from "react";
import Image from "next/image";

interface HighlightCardProps {
  imgSrc: string;
  altText: string;
  className?: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  imgSrc,
  altText,
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={`relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg border-2 border-bg-dark bg-white group/item hover:shadow-xl transition-all duration-300 ${className}`}
      aria-label={altText}
    >
      <div className="relative w-full h-full">
        <Image
          src={imgSrc}
          alt={altText}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className={`object-cover transition-transform duration-500 group-hover/item:scale-110 ${
            isLoading ? "blur-sm" : "blur-0"
          }`}
          onLoadingComplete={() => setIsLoading(false)}
          priority={false}
          loading="lazy"
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/item
      :opacity-100 transition-opacity duration-300 flex items-end p-4"
      >
        <span className="text-white font-medium text-sm md:text-base line-clamp-2">
          {altText}
        </span>
      </div>
    </div>
  );
};

export default HighlightCard;
