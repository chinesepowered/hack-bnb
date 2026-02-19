"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import {
  PlusCircle,
  Sparkles,
  Loader2,
  CheckCircle,
  ExternalLink,
  Home,
  DollarSign,
  MapPin,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { useWeb3 } from "@/context/Web3Context";
import { ACTIVE_CHAIN } from "@/lib/contract";

const AI_DESCRIPTIONS: Record<string, string> = {
  beach:
    "Experience the ultimate beachfront escape at this stunning coastal retreat. With direct ocean access, sun-drenched terraces, and the soothing sound of waves as your soundtrack, this property offers a seamless blend of luxury and natural beauty. Perfect for travelers seeking relaxation with breathtaking sea views.",
  mountain:
    "Nestled among majestic peaks, this mountain retreat offers a serene escape from the everyday. Featuring panoramic alpine views, cozy interiors, and easy access to hiking trails and outdoor adventures, it's the ideal basecamp for nature lovers and thrill-seekers alike.",
  city:
    "Located in the vibrant heart of the city, this modern space puts you steps away from world-class dining, cultural landmarks, and entertainment. Thoughtfully designed with contemporary furnishings and all the essentials for both leisure and work, it's your perfect urban home base.",
  villa:
    "This elegant villa combines spacious living with refined luxury. Surrounded by lush gardens and featuring a private pool, gourmet kitchen, and beautifully appointed rooms, it's designed for those who appreciate the finer things. Ideal for families or groups seeking an exclusive retreat.",
  default:
    "Welcome to this beautifully curated space designed for comfort and memorable experiences. Featuring modern amenities, thoughtful design, and a prime location, this property offers everything you need for an unforgettable stay. Whether you're here for business or pleasure, you'll feel right at home.",
};

function generateAIDescription(name: string, location: string): string {
  const lower = (name + " " + location).toLowerCase();
  if (lower.includes("beach") || lower.includes("ocean") || lower.includes("coast"))
    return AI_DESCRIPTIONS.beach;
  if (lower.includes("mountain") || lower.includes("alpine") || lower.includes("chalet"))
    return AI_DESCRIPTIONS.mountain;
  if (lower.includes("city") || lower.includes("apartment") || lower.includes("loft") || lower.includes("studio"))
    return AI_DESCRIPTIONS.city;
  if (lower.includes("villa") || lower.includes("estate") || lower.includes("mansion"))
    return AI_DESCRIPTIONS.villa;
  return AI_DESCRIPTIONS.default;
}

export default function HostPage() {
  const { account, contract, isCorrectChain, connect, switchChain } = useWeb3();

  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    imageURI: "",
    pricePerNight: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleAIGenerate = () => {
    if (!form.name && !form.location) {
      toast.error("Enter a name or location first for AI to generate a description");
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const desc = generateAIDescription(form.name, form.location);
      setForm((prev) => ({ ...prev, description: desc }));
      setIsGenerating(false);
      toast.success("AI description generated!");
    }, 1200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!account) {
      connect();
      return;
    }
    if (!isCorrectChain) {
      switchChain();
      return;
    }
    if (!contract) {
      toast.error("Contract not connected");
      return;
    }
    if (!form.name || !form.location || !form.description || !form.pricePerNight) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const priceWei = ethers.parseEther(form.pricePerNight);
      const tx = await contract.listProperty(
        form.name,
        form.location,
        form.description,
        form.imageURI || "default",
        priceWei
      );

      toast.loading("Listing property onchain...", { id: "listing" });
      const receipt = await tx.wait();
      setTxHash(receipt.hash);
      toast.success("Property listed onchain!", { id: "listing" });
    } catch (error: unknown) {
      const err = error as { reason?: string; message?: string };
      toast.error(err.reason || err.message || "Failed to list property", {
        id: "listing",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            List Your Property
          </h1>
          <p className="text-gray-500 mt-2">
            Become a host on HackBnB. Your listing is stored onchain on BNB
            Chain.
          </p>
        </div>

        {txHash ? (
          /* Success State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-10 text-center space-y-5"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold">Property Listed!</h2>
            <p className="text-gray-500">
              Your property has been successfully listed on the blockchain.
            </p>
            <a
              href={`${ACTIVE_CHAIN.explorer}/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-50 text-brand-700 font-medium hover:bg-brand-100 transition-colors"
            >
              View Transaction on BSCScan
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => {
                setTxHash(null);
                setForm({
                  name: "",
                  location: "",
                  description: "",
                  imageURI: "",
                  pricePerNight: "",
                });
              }}
              className="block mx-auto text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              List another property
            </button>
          </motion.div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="card p-8 space-y-6">
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Home className="w-4 h-4" />
                Property Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g., Beachfront Villa with Ocean View"
                className="input-field"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4" />
                Location *
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="e.g., Bali, Indonesia"
                className="input-field"
                required
              />
            </div>

            {/* Description with AI generate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FileText className="w-4 h-4" />
                  Description *
                </label>
                <button
                  type="button"
                  onClick={handleAIGenerate}
                  disabled={isGenerating}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 text-xs font-medium hover:bg-purple-100 transition-colors disabled:opacity-50"
                >
                  {isGenerating ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  {isGenerating ? "Generating..." : "AI Generate"}
                </button>
              </div>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe your property, its amenities, and what makes it special..."
                className="input-field min-h-[120px] resize-y"
                rows={4}
                required
              />
            </div>

            {/* Image URI */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <ImageIcon className="w-4 h-4" />
                Image URL
              </label>
              <input
                type="text"
                value={form.imageURI}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, imageURI: e.target.value }))
                }
                placeholder="https://images.unsplash.com/..."
                className="input-field"
              />
              <p className="text-xs text-gray-400 mt-1">
                Paste a URL to an image of your property
              </p>
            </div>

            {/* Price */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4" />
                Price per Night (BNB) *
              </label>
              <input
                type="number"
                step="0.001"
                min="0.001"
                value={form.pricePerNight}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    pricePerNight: e.target.value,
                  }))
                }
                placeholder="0.05"
                className="input-field"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                Platform fee: 2.5% deducted from each booking
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
            >
              {!account ? (
                "Connect Wallet to List"
              ) : !isCorrectChain ? (
                "Switch to BNB Testnet"
              ) : isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Listing on Blockchain...
                </>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5" />
                  List Property Onchain
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400">
              Listing requires a blockchain transaction on BNB Chain Testnet
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
