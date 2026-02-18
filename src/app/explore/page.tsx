"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import CategoryBar from "@/components/CategoryBar";
import { MOCK_PROPERTIES } from "@/lib/mockData";

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price-low" | "price-high" | "rating">("default");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let props = [...MOCK_PROPERTIES];

    // Category filter
    if (selectedCategory !== "All") {
      props = props.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      props = props.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        props.sort((a, b) => parseFloat(a.pricePerNight) - parseFloat(b.pricePerNight));
        break;
      case "price-high":
        props.sort((a, b) => parseFloat(b.pricePerNight) - parseFloat(a.pricePerNight));
        break;
      case "rating":
        props.sort((a, b) => b.rating - a.rating);
        break;
    }

    return props;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, location, or description..."
            className="input-field pl-12 pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
            showFilters
              ? "border-brand-500 bg-brand-50 text-brand-700"
              : "border-gray-200 text-gray-600 hover:border-gray-300"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline text-sm font-medium">Filters</span>
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 p-5 rounded-xl bg-gray-50 border border-gray-100"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1.5">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 outline-none"
              >
                <option value="default">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Categories */}
      <CategoryBar
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Results count */}
      <div className="mt-6 mb-4">
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-900">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "property" : "properties"} found
          {selectedCategory !== "All" && (
            <span> in <span className="font-medium">{selectedCategory}</span></span>
          )}
        </p>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((property, i) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            No properties found
          </h3>
          <p className="text-gray-500 text-sm">
            Try adjusting your search or category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="btn-secondary mt-4 text-sm"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
