import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface BenefitItemProps {
  Icon: LucideIcon;
  text: string;
  className?: string;
}

export const BenefitItem = ({ Icon, text, className }: BenefitItemProps) => {
  const cardClasses = cn(
    "group bg-putih-lembut border-2 border-bg-dark rounded-xl p-5",
    "shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out",
    "text-center hover:border-pink-cerah hover:shadow-pink-cerah",
    "hover:text-pink-cerah hover:border-pink-cerah/80",
    className
  );

  const iconContainerClasses = cn(
    "relative w-16 h-16 mb-3 flex items-center justify-center",
    "bg-bg-dark opacity-60 rounded-full text-white",
    "group-hover:bg-pink-cerah group-hover:text-white",
    "transition-all duration-300 ease-in-out"
  );

  const textClasses = cn(
    "font-semibold text-base text-bg-dark",
    "group-hover:text-pink-cerah transition-colors"
  );

  return (
    <Card className={cardClasses}>
      <CardContent className="flex flex-col items-center justify-center p-0">
        <div className={iconContainerClasses}>
          <Icon className="w-6 h-6" />
        </div>
        <p className={textClasses}>{text}</p>
      </CardContent>
    </Card>
  );
};

export default BenefitItem;
