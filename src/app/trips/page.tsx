"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
  Wallet,
  Star,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { useWeb3 } from "@/context/Web3Context";
import { MOCK_PROPERTIES } from "@/lib/mockData";

// Demo trips (shown when wallet is connected)
const DEMO_TRIPS = [
  {
    id: 1,
    property: MOCK_PROPERTIES[0],
    checkIn: "2025-03-15",
    checkOut: "2025-03-20",
    totalPrice: "0.25",
    status: "completed" as const,
    txHash: "0x1234...demo",
  },
  {
    id: 2,
    property: MOCK_PROPERTIES[4],
    checkIn: "2025-04-10",
    checkOut: "2025-04-14",
    totalPrice: "0.28",
    status: "confirmed" as const,
    txHash: "0x5678...demo",
  },
  {
    id: 3,
    property: MOCK_PROPERTIES[2],
    checkIn: "2025-02-01",
    checkOut: "2025-02-05",
    totalPrice: "0.32",
    status: "completed" as const,
    txHash: "0x9abc...demo",
  },
];

const STATUS_CONFIG = {
  confirmed: {
    label: "Confirmed",
    icon: Clock,
    color: "text-blue-600 bg-blue-50 border-blue-100",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle,
    color: "text-green-600 bg-green-50 border-green-100",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-red-600 bg-red-50 border-red-100",
  },
};

export default function TripsPage() {
  const { account, connect } = useWeb3();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  if (!account) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">My Trips</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Connect your wallet to view your bookings and past trips on HackBnB.
          </p>
          <button onClick={connect} className="btn-primary inline-flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </button>
        </motion.div>
      </div>
    );
  }

  const upcoming = DEMO_TRIPS.filter((t) => t.status === "confirmed");
  const past = DEMO_TRIPS.filter((t) => t.status === "completed");
  const trips = activeTab === "upcoming" ? upcoming : past;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h1>
        <p className="text-gray-500 mb-8">
          Your onchain booking history on HackBnB
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-100 pb-px">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all -mb-px ${
              activeTab === "upcoming"
                ? "text-brand-600 border-b-2 border-brand-500 bg-brand-50/50"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Upcoming ({upcoming.length})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all -mb-px ${
              activeTab === "past"
                ? "text-brand-600 border-b-2 border-brand-500 bg-brand-50/50"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Past ({past.length})
          </button>
        </div>

        {/* Trip Cards */}
        <div className="space-y-4">
          {trips.map((trip, i) => {
            const statusConf = STATUS_CONFIG[trip.status];
            const StatusIcon = statusConf.icon;

            return (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative w-full sm:w-48 h-40 sm:h-auto flex-shrink-0">
                    <Image
                      src={trip.property.image}
                      alt={trip.property.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link
                          href={`/property/${trip.property.id}`}
                          className="text-lg font-semibold text-gray-900 hover:text-brand-600 transition-colors"
                        >
                          {trip.property.name}
                        </Link>
                        <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
                          <MapPin className="w-3.5 h-3.5" />
                          {trip.property.location}
                        </div>
                      </div>
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${statusConf.color}`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusConf.label}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {trip.checkIn} to {trip.checkOut}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="text-sm">
                        <span className="text-gray-400">Total: </span>
                        <span className="font-semibold text-gray-900">
                          {trip.totalPrice} BNB
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {trip.status === "completed" && (
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 text-xs font-medium hover:bg-brand-100 transition-colors">
                            <Star className="w-3.5 h-3.5" />
                            Leave Review
                          </button>
                        )}
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 text-xs font-medium hover:bg-gray-100 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                          View Tx
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {trips.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">
              {activeTab === "upcoming" ? "🗓" : "🏖"}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {activeTab === "upcoming"
                ? "No upcoming trips"
                : "No past trips yet"}
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              {activeTab === "upcoming"
                ? "Start planning your next adventure!"
                : "Book your first stay to get started."}
            </p>
            <Link href="/explore" className="btn-primary inline-block">
              Explore Properties
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
