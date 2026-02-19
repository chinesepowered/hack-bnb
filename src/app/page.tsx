"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  Shield,
  Zap,
  Globe,
  Star,
  ArrowRight,
  Sparkles,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import CategoryBar from "@/components/CategoryBar";
import { MOCK_PROPERTIES } from "@/lib/mockData";

const STATS = [
  { label: "Properties", value: "8+" },
  { label: "Countries", value: "7" },
  { label: "Avg Rating", value: "4.9" },
  { label: "Platform Fee", value: "2.5%" },
];

const FEATURES = [
  {
    icon: Shield,
    title: "Trustless Escrow",
    description:
      "Smart contracts handle payments. Funds are released to hosts automatically — no middlemen.",
  },
  {
    icon: Zap,
    title: "Instant Settlement",
    description:
      "Payments settle in seconds on BNB Chain. Low gas fees mean more value for guests and hosts.",
  },
  {
    icon: Globe,
    title: "Global & Borderless",
    description:
      "Book anywhere in the world with BNB. No currency conversion, no bank restrictions.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Discovery",
    description:
      "Our AI assistant helps you find the perfect stay based on your preferences and budget.",
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    icon: Wallet,
    title: "Connect Wallet",
    description: "Connect your MetaMask to BNB Chain Testnet",
  },
  {
    step: 2,
    icon: Search,
    title: "Find Your Stay",
    description: "Browse properties or ask our AI assistant",
  },
  {
    step: 3,
    icon: CheckCircle2,
    title: "Book Onchain",
    description: "Pay with BNB — secured by smart contracts",
  },
  {
    step: 4,
    icon: Star,
    title: "Review & Earn",
    description: "Leave onchain reviews after your stay",
  },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered =
    selectedCategory === "All"
      ? MOCK_PROPERTIES
      : MOCK_PROPERTIES.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-brand-200 mb-6">
              <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-sm font-medium text-brand-700">
                Live on BNB Chain Testnet
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
              Stay Anywhere,
              <br />
              <span className="gradient-text">Pay with Crypto</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              The first decentralized accommodation marketplace on BNB Chain.
              Book with BNB, trustless escrow, onchain reviews, and AI-powered
              discovery.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore" className="btn-primary text-lg flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Explore Properties
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/host" className="btn-secondary text-lg flex items-center justify-center gap-2">
                Become a Host
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-8 sm:gap-16 mt-16"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Stays
              </h2>
              <p className="text-gray-500 mt-2">
                Handpicked properties available for onchain booking
              </p>
            </div>
            <Link
              href="/explore"
              className="hidden sm:flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <CategoryBar
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {filtered.slice(0, 8).map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No properties in this category yet.
              </p>
            </div>
          )}

          <div className="sm:hidden mt-8 text-center">
            <Link href="/explore" className="btn-secondary inline-flex items-center gap-2">
              View All Properties
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-500 mt-2">
              Book your dream stay in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mx-auto mb-4 border border-gray-100">
                  <item.icon className="w-7 h-7 text-brand-500" />
                </div>
                <div className="text-xs font-bold text-brand-500 mb-2">
                  STEP {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">
              Why HackBnB?
            </h2>
            <p className="text-gray-500 mt-2">
              Decentralized accommodation, reimagined
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card p-8 flex gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-8 py-16 sm:px-16 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnoiIGZpbGw9IiNmMGI5MGIiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Experience Decentralized Travel?
              </h2>
              <p className="text-gray-300 max-w-xl mx-auto mb-8">
                Connect your wallet and start exploring properties around the
                world. All bookings are secured by smart contracts on BNB Chain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/explore" className="btn-primary text-lg">
                  Start Exploring
                </Link>
                <Link
                  href="/host"
                  className="px-6 py-3 rounded-xl border-2 border-white/20 text-white hover:bg-white/10 transition-colors font-semibold text-lg"
                >
                  List Your Property
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
