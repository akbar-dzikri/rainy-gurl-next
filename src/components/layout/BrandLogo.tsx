import Image from 'next/image';
import Link from 'next/link';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showText = true, className }) => {
  const logoSize = size === 'sm' ? 30 : size === 'md' ? 40 : 50;
  const textSize = size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl';

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image
        src="https://placehold.co/640x640.png?text=Rainy+Gurl"
        alt="Rainy Gurl Logo"
        width={logoSize}
        height={logoSize}
        className="rounded-full border-2 border-text-dark object-cover"
      />
      {showText && (
        <span className={`font-semibold text-bg-pink ${textSize} font-poppins group-hover:text-pink-cerah transition-colors duration-300`}>
          Rainy Gurl
        </span>
      )}
    </Link>
  );
};

export default BrandLogo;