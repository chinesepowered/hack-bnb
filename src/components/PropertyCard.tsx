"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Star, MapPin, Heart } from "lucide-react";
import { PropertyData } from "@/lib/mockData";

export default function PropertyCard({ property }: { property: PropertyData }) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/property/${property.id}`} className="group">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3">
        {imgError ? (
          <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
            <span className="text-4xl">🏠</span>
          </div>
        ) : (
          <Image
            src={property.image}
            alt={property.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onError={() => setImgError(true)}
          />
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Like button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              liked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Category badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 shadow-sm">
          {property.category}
        </div>

        {/* Superhost badge */}
        {property.host.isSuperhost && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-800 shadow-sm">
            Superhost
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 truncate pr-2">
            {property.name}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-4 h-4 fill-brand-500 text-brand-500" />
            <span className="text-sm font-medium">{property.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-500">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-sm truncate">{property.location}</span>
        </div>

        <div className="flex items-center gap-1 pt-1">
          <span className="font-semibold text-gray-900">
            {property.pricePerNight} BNB
          </span>
          <span className="text-sm text-gray-500">/ night</span>
        </div>
      </div>
    </Link>
  );
}
