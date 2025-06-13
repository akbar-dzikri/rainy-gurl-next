"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  X,
  Menu,
  Home,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import {
  MockProducts,
  ProductCategories,
  ProductFilters,
  ProductBadges,
} from "@/lib/constants";

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

interface FilterState {
  search: string;
  category: string;
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
}

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    priceRange: [0, 1000000],
    sizes: [],
    colors: [],
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [customPriceMin, setCustomPriceMin] = useState("");
  const [customPriceMax, setCustomPriceMax] = useState("");

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters.search]);

  // Sort products: hottest > sale > others
  const sortedProducts = useMemo(() => {
    return [...MockProducts].sort((a, b) => {
      if (
        a.badge === ProductBadges.hottest &&
        b.badge !== ProductBadges.hottest
      )
        return -1;
      if (
        b.badge === ProductBadges.hottest &&
        a.badge !== ProductBadges.hottest
      )
        return 1;
      if (
        a.badge === ProductBadges.sale &&
        b.badge !== ProductBadges.sale &&
        b.badge !== ProductBadges.hottest
      )
        return -1;
      if (
        b.badge === ProductBadges.sale &&
        a.badge !== ProductBadges.sale &&
        a.badge !== ProductBadges.hottest
      )
        return 1;
      return 0;
    });
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return sortedProducts.filter((product) => {
      // Search filter
      if (
        debouncedSearch &&
        !product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Price range filter
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Size filter
      if (
        filters.sizes.length > 0 &&
        !filters.sizes.some((size) => product.sizes.includes(size))
      ) {
        return false;
      }

      // Color filter
      if (
        filters.colors.length > 0 &&
        !filters.colors.some((color) => product.colors.includes(color))
      ) {
        return false;
      }

      return true;
    });
  }, [sortedProducts, debouncedSearch, filters]);

  // Get displayed products
  const displayedProducts = filteredProducts.slice(0, displayedItems);
  const hasMore = displayedItems < filteredProducts.length;

  // Load more function
  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setDisplayedItems((prev) => prev + ITEMS_PER_PAGE);
        setIsLoading(false);
      }, 500);
    }
  }, [hasMore, isLoading]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  // Reset displayed items when filters change
  useEffect(() => {
    setDisplayedItems(ITEMS_PER_PAGE);
  }, [filters, debouncedSearch]);

  // Filter handlers
  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: "sizes" | "colors", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const clearFilter = (key: keyof FilterState) => {
    if (key === "search") updateFilter(key, "");
    else if (key === "category") updateFilter(key, "");
    else if (key === "priceRange") updateFilter(key, [0, 1000000]);
    else if (key === "sizes" || key === "colors") updateFilter(key, []);
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      category: "",
      priceRange: [0, 1000000],
      sizes: [],
      colors: [],
    });
    setCustomPriceMin("");
    setCustomPriceMax("");
  };

  // Custom price range handler
  const applyCustomPriceRange = () => {
    const min = customPriceMin ? parseInt(customPriceMin) : 0;
    const max = customPriceMax ? parseInt(customPriceMax) : 1000000;
    updateFilter("priceRange", [min, max]);
  };

  // Get active filters for badges
  const getActiveFilters = () => {
    const active = [];
    if (filters.search)
      active.push({ key: "search", label: `Search: ${filters.search}` });
    if (filters.category)
      active.push({ key: "category", label: `Category: ${filters.category}` });
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000) {
      active.push({
        key: "priceRange",
        label: `Price: Rp${filters.priceRange[0].toLocaleString()} - Rp${filters.priceRange[1].toLocaleString()}`,
      });
    }
    if (filters.sizes.length > 0)
      active.push({
        key: "sizes",
        label: `Sizes: ${filters.sizes.join(", ")}`,
      });
    if (filters.colors.length > 0)
      active.push({
        key: "colors",
        label: `Colors: ${filters.colors.join(", ")}`,
      });
    return active;
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("filter-sidebar");
      const toggleButton = document.getElementById("sidebar-toggle");
      if (
        sidebarOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        !toggleButton?.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link
            href="/"
            className="hover:text-pink-600 transition-colors flex items-center"
          >
            <Home className="h-4 w-4 mr-1" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">Products</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">
            Discover our latest collection of fashion items
          </p>
        </div>

        {/* Top Bar - Search and Controls */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Mobile Filter Toggle */}
            <Button
              id="sidebar-toggle"
              variant="outline"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden flex items-center gap-2"
            >
              <Menu className="h-4 w-4" />
              Filters
            </Button>

            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="pl-10"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="flex items-center gap-2"
              >
                <Grid className="h-4 w-4" />
                <span className="hidden sm:inline">Grid</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="flex items-center gap-2"
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-6 relative">
          {/* Sidebar Overlay for Mobile */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" />
          )}

          {/* Filters Sidebar */}
          <div
            id="filter-sidebar"
            className={`
              fixed lg:static top-0 left-0 h-full lg:h-auto w-80 lg:w-72 bg-white z-50 lg:z-auto
              transform transition-transform duration-300 ease-in-out lg:transform-none
              ${
                sidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full lg:translate-x-0"
              }
              overflow-y-auto lg:overflow-visible
            `}
          >
            <div className="p-6 lg:p-0">
              {/* Mobile Header */}
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Card className="lg:shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900 hidden lg:block">
                      Filters
                    </h3>
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                      Clear All
                    </Button>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Category</h4>
                    <div className="space-y-2">
                      <Button
                        variant={filters.category === "" ? "default" : "ghost"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => updateFilter("category", "")}
                      >
                        All Categories
                      </Button>
                      {Object.keys(ProductCategories).map((category) => (
                        <Button
                          key={category}
                          variant={
                            filters.category === category ? "default" : "ghost"
                          }
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => updateFilter("category", category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">
                      Price Range
                    </h4>
                    <div className="space-y-3">
                      {/* Custom Price Range */}
                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">
                          Custom Range (IDR)
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={customPriceMin}
                            onChange={(e) => setCustomPriceMin(e.target.value)}
                            className="text-sm"
                          />
                          <Input
                            type="number"
                            placeholder="Max"
                            value={customPriceMax}
                            onChange={(e) => setCustomPriceMax(e.target.value)}
                            className="text-sm"
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={applyCustomPriceRange}
                          className="w-full"
                        >
                          Apply Range
                        </Button>
                      </div>

                      {/* Quick Price Ranges */}
                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">
                          Quick Select
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            [0, 100000, "Under 100k"],
                            [100000, 300000, "100k - 300k"],
                            [300000, 500000, "300k - 500k"],
                            [500000, 1000000, "500k - 1M"],
                            [1000000, 5000000, "Above 1M"],
                          ].map(([min, max, label]) => (
                            <Button
                              key={`${min}-${max}`}
                              variant={
                                filters.priceRange[0] === min &&
                                filters.priceRange[1] === max
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              className="text-xs justify-start"
                              onClick={() =>
                                updateFilter("priceRange", [min, max])
                              }
                            >
                              {label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Size Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Sizes</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(ProductFilters.size).filter(([key]) => key !== 'all').map(([key, size]) => (
                        <Button
                          key={key}
                          variant={
                            filters.sizes.includes(key) ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => toggleArrayFilter("sizes", key)}
                          className="min-w-[2.5rem]"
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Color Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Colors</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(ProductFilters.color).filter(([key]) => key !== 'all').map(([key, color]) => (
                        <Button
                          key={key}
                          variant={
                            filters.colors.includes(key)
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => toggleArrayFilter("colors", key)}
                          className="text-xs"
                        >
                          {color}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Active Filters */}
            {getActiveFilters().length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Active Filters:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getActiveFilters().map((filter) => (
                    <Badge
                      key={filter.key}
                      variant="secondary"
                      className="cursor-pointer hover:bg-gray-300 transition-colors"
                      onClick={() =>
                        clearFilter(filter.key as keyof FilterState)
                      }
                    >
                      {filter.label}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Results Info */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  Showing{" "}
                  <span className="font-medium">
                    {displayedProducts.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredProducts.length}</span>{" "}
                  products
                </p>
                <div className="text-sm text-gray-500">
                  {filteredProducts.length > 0 && (
                    <span>
                      Page {Math.ceil(displayedItems / ITEMS_PER_PAGE)} of{" "}
                      {Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {displayedProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    We couldn&apos;t find any products matching your criteria. Try
                    adjusting your filters.
                  </p>
                  <Button onClick={clearAllFilters} variant="outline">
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Loading */}
            {isLoading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
                <p className="mt-2 text-gray-600">Loading more products...</p>
              </div>
            )}

            {/* End of results */}
            {!hasMore && filteredProducts.length > ITEMS_PER_PAGE && (
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center mt-6">
                <p className="text-gray-500">
                  🎉 You&apos;ve reached the end of our products!
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Found {filteredProducts.length} products total
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
