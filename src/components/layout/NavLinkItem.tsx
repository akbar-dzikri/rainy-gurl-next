// components/layout/NavLinkItem.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkItemProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string; // Class for the text when active
  inactiveClassName?: string; // Class for the text when inactive
  underlineColor?: string; // Color of the underline
  onClick?: () => void;
}

const NavLinkItem: React.FC<NavLinkItemProps> = ({
  href,
  children,
  className,
  activeClassName = "text-pink-400",
  inactiveClassName = "text-bg-pink hover:text-pink-400",
  underlineColor = "bg-pink-400", // Default underline color
  onClick,
}) => {
  const pathname = usePathname();
  // More robust active check for hash links on the same page
  const isActive =
    pathname === href ||
    (href.startsWith("/#") &&
      pathname === "/" &&
      window.location.hash === href.substring(1));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative text-center text-base font-medium py-1 transition-colors duration-300 ease-out", // py-1 to give space for underline
        isActive ? activeClassName : inactiveClassName,
        className
      )}
    >
      {children}
      <span
        className={cn(
          "absolute bottom-0 left-0 h-[2px] transition-all duration-300 ease-out",
          underlineColor,
          isActive ? "w-full" : "w-0 group-hover:w-full" // Width transition
        )}
      />
    </Link>
  );
};

export default NavLinkItem;
