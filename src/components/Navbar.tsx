"use client";

import Link from "next/link";
import { useState } from "react";
import { useWeb3 } from "@/context/Web3Context";
import { shortenAddress } from "@/lib/utils";
import { ACTIVE_CHAIN } from "@/lib/contract";
import {
  Home,
  Search,
  PlusCircle,
  Briefcase,
  Wallet,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function Navbar() {
  const { account, connect, disconnect, isConnecting, isCorrectChain, switchChain } = useWeb3();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [walletDropdown, setWalletDropdown] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              Hack<span className="text-brand-500">BnB</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/explore"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all font-medium text-sm"
            >
              <Search className="w-4 h-4" />
              Explore
            </Link>
            <Link
              href="/host"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all font-medium text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Host
            </Link>
            <Link
              href="/trips"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all font-medium text-sm"
            >
              <Briefcase className="w-4 h-4" />
              Trips
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* AI Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-xs font-medium text-purple-700">
                AI Powered
              </span>
            </div>

            {/* Wallet */}
            {account ? (
              <div className="relative">
                <button
                  onClick={() => setWalletDropdown(!walletDropdown)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all"
                >
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-medium">
                    {shortenAddress(account)}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {walletDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setWalletDropdown(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-white shadow-xl border border-gray-100 z-20 py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-400">Connected to</p>
                        <p className="text-sm font-medium truncate">
                          {account}
                        </p>
                        {!isCorrectChain && (
                          <button
                            onClick={switchChain}
                            className="mt-2 w-full text-xs text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition-colors"
                          >
                            Switch to {ACTIVE_CHAIN.name}
                          </button>
                        )}
                      </div>
                      <a
                        href={`${ACTIVE_CHAIN.explorer}/address/${account}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View on Explorer
                      </a>
                      <button
                        onClick={() => {
                          disconnect();
                          setWalletDropdown(false);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Disconnect
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={connect}
                disabled={isConnecting}
                className="btn-primary flex items-center gap-2 !px-4 !py-2 text-sm"
              >
                <Wallet className="w-4 h-4" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-4 space-y-1">
            <Link
              href="/explore"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all font-medium"
            >
              <Search className="w-5 h-5" />
              Explore Properties
            </Link>
            <Link
              href="/host"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all font-medium"
            >
              <PlusCircle className="w-5 h-5" />
              Become a Host
            </Link>
            <Link
              href="/trips"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all font-medium"
            >
              <Briefcase className="w-5 h-5" />
              My Trips
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
