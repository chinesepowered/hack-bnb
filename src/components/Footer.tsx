"use client";

import Link from "next/link";
import { Home, Github, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                Hack<span className="text-brand-500">BnB</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm max-w-sm">
              The first decentralized accommodation marketplace on BNB Chain.
              Book stays with crypto, earn onchain reviews, and experience
              trustless travel.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-medium">
                Built on BNB Chain
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium">
                AI-Powered
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">
              Platform
            </h3>
            <div className="space-y-2">
              <Link
                href="/explore"
                className="block text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Explore Properties
              </Link>
              <Link
                href="/host"
                className="block text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Become a Host
              </Link>
              <Link
                href="/trips"
                className="block text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                My Trips
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">
              Resources
            </h3>
            <div className="space-y-2">
              <a
                href="https://testnet.bscscan.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                BSC Explorer
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.bnbchain.org/en"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                BNB Chain
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://github.com/chinesepowered/hack-bnb"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                Source Code
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            Built for Good Vibes Only: OpenClaw Edition Hackathon
          </p>
          <p className="text-xs text-gray-400">
            Powered by BNB Chain &middot; Smart Contracts on BSC Testnet
          </p>
        </div>
      </div>
    </footer>
  );
}
