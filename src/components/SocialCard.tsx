// components/ui/SocialCard.tsx
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface SocialCardProps {
  iconSrc: StaticImageData;
  platformName: string;
  username: string;
  link: string;
  className?: string;
}

const SocialCard: React.FC<SocialCardProps> = ({
  iconSrc,
  platformName,
  username,
  link,
  className,
}) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`block group ${className}`}
    >
      <Card className="bg-white border-2 border-bg-dark rounded-xl p-6 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 h-full flex flex-col items-center justify-center text-center group-hover:border-pink-cerah group-hover:border-2">
        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
          <Image
            src={iconSrc}
            alt={`${platformName} Icon`}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <p className="font-semibold text-lg text-pink-gelap">{platformName}</p>
        <p className="text-sm text-bg-dark group-hover:text-pink-cerah transition-colors">
          {username}
        </p>
      </Card>
    </Link>
  );
};

export default SocialCard;
