"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, Home as HomeIcon } from "lucide-react";
import BrandLogo from "./BrandLogo";
import NavLinkItem from "./NavLinkItem";
import { NavLinks, NavLinkKey, PageRoutes } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import AuthDialog from "./AuthDialog";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isSalesPage = pathname === PageRoutes.penjualan;
  const navLinkKeys = Object.keys(NavLinks) as NavLinkKey[];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const commonIconClass =
    "text-bg-pink hover:text-pink-cerah transition-colors";

  const NavActionButtons: React.FC<{
    mobile?: boolean;
    onLinkClick?: () => void;
  }> = ({ mobile = false, onLinkClick }) => (
    <>
      <Button
        variant="ghost"
        size="icon"
        asChild
        className={cn(
          mobile
            ? "w-full justify-start px-2 py-3 text-base h-auto"
            : "h-10 w-10 scale-100 hover:bg-transparent hover:text-white transition-all hover:scale-125 duration-300 ease-in-out",
          commonIconClass
        )}
      >
        <Link
          href={isSalesPage ? "/" : PageRoutes.penjualan}
          aria-label={isSalesPage ? "Home" : "Shopping Cart"}
          onClick={onLinkClick}
        >
          {isSalesPage ? (
            <HomeIcon className="h-5 w-5" />
          ) : (
            <ShoppingCart className="h-5 w-5" />
          )}
          {mobile && (
            <span className="ml-3">
              {isSalesPage ? "Home" : "Shopping Cart"}
            </span>
          )}
        </Link>
      </Button>
      {!mobile && <AuthDialog />}
    </>
  );

  return (
    <nav className="sticky top-0 w-full bg-white border-b-2 border-pink-cerah z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <BrandLogo />
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinkKeys.map((key) => (
            <NavLinkItem key={key} href={NavLinks[key]}>
              {key}
            </NavLinkItem>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          <NavActionButtons />
        </div>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className={cn("h-10 w-10", commonIconClass)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[75vw] sm:w-[60vw] max-w-xs bg-white p-0 flex flex-col"
            >
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                  <BrandLogo showText={false} size="sm" />
                </div>
              </SheetHeader>
              <nav className="flex flex-col gap-0.5 flex-grow">
                {navLinkKeys.map((key) => (
                  <SheetClose asChild key={key}>
                    <NavLinkItem
                      href={NavLinks[key]}
                      className="text-left w-full py-3 px-3 text-base rounded-md hover:bg-gray-100"
                      activeClassName="text-pink-cerah bg-pink-50"
                      inactiveClassName="text-text-dark hover:text-pink-cerah"
                      underlineColor="bg-transparent"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {key}
                    </NavLinkItem>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button
                    variant="default"
                    className="w-full mt-auto py-3 text-base bg-bg-pink text-white hover:bg-pink-cerah my-3 mx-auto max-w-[90%]"
                    asChild
                  >
                    <Link
                      href={PageRoutes.formMember}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Join Member
                    </Link>
                  </Button>
                </SheetClose>
              </nav>
              <div className="p-3 border-t border-gray-200">
                <NavActionButtons
                  mobile
                  onLinkClick={() => setIsMobileMenuOpen(false)}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
