"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import {
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  Heart,
  Share2,
  Shield,
  ChevronLeft,
  Calendar,
  ExternalLink,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useWeb3 } from "@/context/Web3Context";
import { MOCK_PROPERTIES, MOCK_REVIEWS } from "@/lib/mockData";
import { shortenAddress, formatDate, timeAgo, cn } from "@/lib/utils";
import { ACTIVE_CHAIN } from "@/lib/contract";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { account, contract, isCorrectChain, connect, switchChain } = useWeb3();

  const id = Number(params.id);
  const property = MOCK_PROPERTIES.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [liked, setLiked] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🏠</div>
        <h1 className="text-2xl font-bold mb-2">Property Not Found</h1>
        <p className="text-gray-500 mb-4">
          This property doesn&apos;t exist or has been removed.
        </p>
        <Link href="/explore" className="btn-primary">
          Browse Properties
        </Link>
      </div>
    );
  }

  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const totalPrice = nights * parseFloat(property.pricePerNight);
  const platformFee = totalPrice * 0.025;
  const grandTotal = totalPrice + platformFee;

  const handleBook = async () => {
    if (!account) {
      connect();
      return;
    }
    if (!isCorrectChain) {
      switchChain();
      return;
    }
    if (!checkIn || !checkOut || nights <= 0) {
      toast.error("Please select valid dates");
      return;
    }
    if (!contract) {
      toast.error("Contract not connected");
      return;
    }

    setIsBooking(true);
    try {
      const checkInTimestamp = Math.floor(new Date(checkIn).getTime() / 1000);
      const checkOutTimestamp = Math.floor(new Date(checkOut).getTime() / 1000);
      const value = ethers.parseEther(grandTotal.toFixed(18));

      const tx = await contract.bookProperty(
        property.id,
        checkInTimestamp,
        checkOutTimestamp,
        { value }
      );

      toast.loading("Confirming transaction...", { id: "booking" });
      const receipt = await tx.wait();
      setTxHash(receipt.hash);

      toast.success("Booking confirmed onchain!", { id: "booking" });
    } catch (error: unknown) {
      const err = error as { reason?: string; message?: string };
      toast.error(err.reason || err.message || "Booking failed", {
        id: "booking",
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Title Row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {property.name}
          </h1>
          <div className="flex items-center gap-3 mt-2 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-brand-500 text-brand-500" />
              <span className="font-semibold">{property.rating}</span>
              <span className="text-gray-400">
                ({property.reviewCount} reviews)
              </span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              {property.location}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all text-sm",
              liked
                ? "border-red-200 bg-red-50 text-red-600"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            )}
          >
            <Heart
              className={cn("w-4 h-4", liked && "fill-red-500 text-red-500")}
            />
            Save
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300 transition-all text-sm">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-8 rounded-2xl overflow-hidden">
        <div className="relative aspect-[4/3]">
          <Image
            src={property.images[selectedImage]}
            alt={property.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {property.images.slice(1, 5).map((img, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] cursor-pointer group"
              onClick={() => setSelectedImage(i + 1)}
            >
              <Image
                src={img}
                alt={`${property.name} ${i + 2}`}
                fill
                className="object-cover group-hover:brightness-90 transition-all"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Host Info */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-semibold">
                Hosted by {property.host.name}
              </h2>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                <span>
                  {property.maxGuests} guests · {property.bedrooms} bedrooms ·{" "}
                  {property.bathrooms} baths
                </span>
              </div>
            </div>
            <div className="relative">
              <Image
                src={property.host.avatar}
                alt={property.host.name}
                width={56}
                height={56}
                className="rounded-full object-cover"
              />
              {property.host.isSuperhost && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center border-2 border-white">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
              <Users className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium">
                  {property.maxGuests} Guests
                </p>
                <p className="text-xs text-gray-400">Maximum</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
              <Bed className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium">
                  {property.bedrooms} Bedrooms
                </p>
                <p className="text-xs text-gray-400">Available</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
              <Bath className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium">
                  {property.bathrooms} Bathrooms
                </p>
                <p className="text-xs text-gray-400">Private</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About this place</h3>
            <p className="text-gray-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* AI Generated badge */}
          <div className="flex items-center gap-2 p-4 rounded-xl bg-purple-50 border border-purple-100">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <p className="text-sm text-purple-700">
              <span className="font-medium">AI-Enhanced Listing</span> —
              Description optimized by AI for clarity and completeness
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-semibold mb-4">What this place offers</h3>
            <div className="grid grid-cols-2 gap-3">
              {property.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-3 py-3 text-sm text-gray-700"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 fill-brand-500 text-brand-500" />
              <span className="text-lg font-semibold">
                {property.rating} · {property.reviewCount} reviews
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_REVIEWS.map((review, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{review.name}</p>
                      <p className="text-xs text-gray-400">
                        {timeAgo(review.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-3.5 h-3.5 fill-brand-500 text-brand-500"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Booking Widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6 space-y-5"
            >
              {txHash ? (
                /* Booking Success State */
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Booking Confirmed!
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Your stay has been booked onchain
                    </p>
                  </div>
                  <a
                    href={`${ACTIVE_CHAIN.explorer}/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-50 text-brand-700 font-medium text-sm hover:bg-brand-100 transition-colors"
                  >
                    View on BSCScan
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <Link
                    href="/trips"
                    className="block w-full py-3 rounded-xl bg-gray-900 text-white font-medium text-sm text-center hover:bg-gray-800 transition-colors"
                  >
                    View My Trips
                  </Link>
                </div>
              ) : (
                /* Booking Form */
                <>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">
                      {property.pricePerNight} BNB
                    </span>
                    <span className="text-gray-500">/ night</span>
                  </div>

                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-2 divide-x divide-gray-200">
                      <div className="p-3">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                          Check-in
                        </label>
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full text-sm mt-1 outline-none"
                        />
                      </div>
                      <div className="p-3">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                          Check-out
                        </label>
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          min={checkIn || new Date().toISOString().split("T")[0]}
                          className="w-full text-sm mt-1 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {nights > 0 && (
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {property.pricePerNight} BNB x {nights} night
                          {nights !== 1 && "s"}
                        </span>
                        <span>{totalPrice.toFixed(4)} BNB</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Platform fee (2.5%)
                        </span>
                        <span>{platformFee.toFixed(4)} BNB</span>
                      </div>
                      <div className="flex justify-between font-semibold pt-3 border-t border-gray-100">
                        <span>Total</span>
                        <span>{grandTotal.toFixed(4)} BNB</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleBook}
                    disabled={isBooking}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {!account ? (
                      <>Connect Wallet to Book</>
                    ) : !isCorrectChain ? (
                      <>Switch to BNB Testnet</>
                    ) : isBooking ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        {nights > 0
                          ? `Book for ${grandTotal.toFixed(4)} BNB`
                          : "Select dates to book"}
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    <Shield className="w-3.5 h-3.5" />
                    Secured by smart contract on BNB Chain
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
