"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { ProductBadges } from "@/lib/constants";
import { useState } from "react";

interface ProductImage {
  src: string;
  alt: string;
  label: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  badge?: string;
  discount?: number;
  sizes: string[];
  colors: string[];
  description: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
  className?: string;
  // Legacy props for backward compatibility
  title?: string;
  description?: string;
  images?: ProductImage[];
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = "grid",
  className,
  // Legacy props
  title,
  description,
  images,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Produk ditambahkan ke keranjang:", product.name);
      // TODO: Implementasi logika tambah ke keranjang
    } catch (error) {
      console.error("Error menambahkan ke keranjang:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log(
      isWishlisted ? "Dihapus dari wishlist:" : "Ditambahkan ke wishlist:",
      product.name
    );
    // TODO: Implementasi logika wishlist
  };

  const handleViewDetail = () => {
    console.log("Melihat detail produk:", product.name);
    // TODO: Implementasi navigasi ke halaman detail produk
    // router.push(`/products/${product.id}`);
  };
  // Handle legacy usage
  if (title && description && images) {
    return (
      <Card
        className={`w-full max-w-md bg-putih-lembut border-2 border-bg-dark shadow-lg hover:shadow-xl duration-300 rounded-xl overflow-hidden hover:scale-105 hover:border-pink-cerah hover:border-2 hover:shadow-pink-cerah transition-all ease-in-out ${className}`}
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
  }

  // New product card implementation
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getBadgeContent = () => {
    if (product.badge === ProductBadges.hottest) {
      return (
        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white font-semibold">
          🔥 HOTTEST
        </Badge>
      );
    }
    if (product.badge === ProductBadges.sale && product.discount) {
      return (
        <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600 text-white font-semibold">
          -{product.discount}%
        </Badge>
      );
    }
    return null;
  };

  if (viewMode === "list") {
    return (
      <Card
        className={`w-full hover:shadow-lg transition-shadow duration-300 ${className}`}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative w-full sm:w-48 h-48 sm:h-auto">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
            />
            {getBadgeContent()}
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-pink-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <span>Stok: {product.stock}</span>
                  <span>Ukuran: {product.sizes.join(", ")}</span>
                  <span>Warna: {product.colors.length} pilihan</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 sm:w-auto w-full">
                <Button
                  className="bg-pink-600 hover:bg-pink-700 text-white disabled:opacity-50"
                  onClick={handleAddToCart}
                  disabled={isLoading || product.stock === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {isLoading
                    ? "Menambahkan..."
                    : product.stock === 0
                    ? "Stok Habis"
                    : "Tambah ke Keranjang"}
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
                    onClick={handleViewDetail}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Detail
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleToggleWishlist}
                    className={
                      isWishlisted
                        ? "text-red-500 border-red-500 hover:bg-red-50"
                        : ""
                    }
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Grid view
  return (
    <Card
      className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {getBadgeContent()}

        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-3">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white hover:bg-gray-50 shadow-lg border border-gray-200 text-gray-700 hover:text-gray-900"
              onClick={handleViewDetail}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className={`shadow-lg border ${
                isWishlisted
                  ? "bg-red-50 hover:bg-red-100 border-red-200 text-red-600 hover:text-red-700"
                  : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700 hover:text-gray-900"
              }`}
              onClick={handleToggleWishlist}
            >
              <Heart
                className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-pink-600">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="text-xs text-gray-500 mb-4">
          <div className="flex justify-between">
            <span>Stok: {product.stock}</span>
            <span>{product.colors.length} warna</span>
          </div>
        </div>

        {/* Add to cart button */}
        <Button
          className="w-full bg-pink-600 hover:bg-pink-700 text-white disabled:opacity-50"
          onClick={handleAddToCart}
          disabled={isLoading || product.stock === 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isLoading
            ? "Menambahkan..."
            : product.stock === 0
            ? "Stok Habis"
            : "Tambah ke Keranjang"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
