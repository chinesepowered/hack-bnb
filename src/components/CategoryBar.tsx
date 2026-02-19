"use client";

import {
  LayoutGrid,
  Waves,
  Mountain,
  Building2,
  Palmtree,
  TreePine,
  Sparkles,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ReactNode> = {
  grid: <LayoutGrid className="w-5 h-5" />,
  waves: <Waves className="w-5 h-5" />,
  mountain: <Mountain className="w-5 h-5" />,
  building: <Building2 className="w-5 h-5" />,
  palmtree: <Palmtree className="w-5 h-5" />,
  trees: <TreePine className="w-5 h-5" />,
  sparkles: <Sparkles className="w-5 h-5" />,
  crown: <Crown className="w-5 h-5" />,
};

const CATEGORIES = [
  { name: "All", icon: "grid" },
  { name: "Beachfront", icon: "waves" },
  { name: "Mountain", icon: "mountain" },
  { name: "City", icon: "building" },
  { name: "Tropical", icon: "palmtree" },
  { name: "Countryside", icon: "trees" },
  { name: "Unique", icon: "sparkles" },
  { name: "Luxury", icon: "crown" },
];

export default function CategoryBar({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (category: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onSelect(cat.name)}
          className={cn(
            "flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl min-w-[72px] transition-all duration-200 text-xs font-medium",
            selected === cat.name
              ? "bg-gray-900 text-white shadow-lg"
              : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          )}
        >
          {ICONS[cat.icon]}
          {cat.name}
        </button>
      ))}
    </div>
  );
}
