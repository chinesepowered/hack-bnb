"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X, MessageCircle, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_PROPERTIES } from "@/lib/mockData";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const AI_RESPONSES: Record<string, string> = {
  default:
    "I'm your AI travel assistant for HackBnB! I can help you find the perfect stay on BNB Chain. Try asking me about beach properties, luxury stays, or budget-friendly options!",
  beach:
    "For beach lovers, I'd recommend our **Luxury Beachfront Villa in Bali** at just 0.05 BNB/night! It features a private pool, direct beach access, and panoramic ocean views. The **Santorini Cave House** is another incredible option with infinity pool and sunset views at 0.07 BNB/night. Both are rated 4.9+ stars!",
  luxury:
    "Looking for luxury? The **Dubai Marina Penthouse** is our most premium listing at 0.15 BNB/night, featuring a rooftop jacuzzi and private elevator. The **Tuscan Wine Estate** offers a different kind of luxury - a 16th-century farmhouse with wine cellar and cooking classes at 0.09 BNB/night.",
  budget:
    "Great budget options! The **Modern Tokyo Apartment** in Shibuya is just 0.03 BNB/night with amazing city access. The **Treehouse Retreat in Costa Rica** at 0.04 BNB/night is an incredible eco-luxury experience at an affordable price.",
  city:
    "For city explorers, check out the **Modern Tokyo Apartment** in Shibuya (0.03 BNB/night) or the **SoHo Designer Loft** in NYC (0.06 BNB/night). Both offer great walkability and local culture!",
  unique:
    "Want something truly unique? The **Santorini Cave House** is carved into a caldera cliff with infinity pool (0.07 BNB/night). Or try the **Treehouse Retreat** in Costa Rica's cloud forest canopy (0.04 BNB/night). Both are unforgettable!",
  how: "HackBnB works on BNB Chain! Simply connect your MetaMask wallet, browse properties, and book with BNB. Your booking is secured by a smart contract - no middlemen, no trust issues. The 2.5% platform fee is the lowest in the industry. All reviews are stored onchain for full transparency!",
  bnb: "HackBnB is built on BNB Smart Chain (BSC Testnet) for fast, low-cost transactions. Bookings are handled by our smart contract with escrow payments - hosts get paid instantly minus a 2.5% fee. You can verify every transaction on BSCScan!",
  help: "I can help you with:\n\n- **Finding properties** - Tell me your preferences (beach, city, mountain, etc.)\n- **Budget planning** - I'll find stays within your BNB budget\n- **How it works** - Learn about onchain bookings\n- **Property details** - Ask about specific listings\n\nWhat would you like to know?",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("beach") || lower.includes("ocean") || lower.includes("sea"))
    return AI_RESPONSES.beach;
  if (lower.includes("luxury") || lower.includes("premium") || lower.includes("expensive"))
    return AI_RESPONSES.luxury;
  if (lower.includes("budget") || lower.includes("cheap") || lower.includes("affordable"))
    return AI_RESPONSES.budget;
  if (lower.includes("city") || lower.includes("urban") || lower.includes("apartment"))
    return AI_RESPONSES.city;
  if (lower.includes("unique") || lower.includes("special") || lower.includes("different"))
    return AI_RESPONSES.unique;
  if (lower.includes("how") || lower.includes("work") || lower.includes("book"))
    return AI_RESPONSES.how;
  if (lower.includes("bnb") || lower.includes("chain") || lower.includes("blockchain") || lower.includes("smart contract"))
    return AI_RESPONSES.bnb;
  if (lower.includes("help") || lower.includes("what can"))
    return AI_RESPONSES.help;

  // Smart response based on property matching
  const matchedProp = MOCK_PROPERTIES.find(
    (p) =>
      lower.includes(p.location.toLowerCase().split(",")[0]) ||
      lower.includes(p.name.toLowerCase().split(" ").slice(-1)[0])
  );
  if (matchedProp) {
    return `Great choice! **${matchedProp.name}** in ${matchedProp.location} is rated ${matchedProp.rating} stars with ${matchedProp.reviewCount} reviews. At ${matchedProp.pricePerNight} BNB/night, it offers: ${matchedProp.amenities.slice(0, 4).join(", ")}. Would you like to book it?`;
  }

  return AI_RESPONSES.default;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm your AI travel assistant. I can help you find the perfect stay on BNB Chain. What are you looking for?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = getAIResponse(userMessage);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105",
          isOpen
            ? "bg-gray-900 text-white"
            : "bg-gradient-to-br from-brand-400 to-brand-600 text-white animate-pulse-glow"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">
                  AI Travel Assistant
                </h3>
                <p className="text-white/70 text-xs">
                  Powered by AI on BNB Chain
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[350px] min-h-[250px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-2.5",
                  msg.role === "user" ? "flex-row-reverse" : ""
                )}
              >
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0",
                    msg.role === "assistant"
                      ? "bg-brand-100 text-brand-600"
                      : "bg-gray-100 text-gray-600"
                  )}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2.5 max-w-[80%] text-sm leading-relaxed",
                    msg.role === "assistant"
                      ? "bg-gray-50 text-gray-800"
                      : "bg-brand-500 text-white"
                  )}
                >
                  {msg.content.split("**").map((part, j) =>
                    j % 2 === 1 ? (
                      <strong key={j}>{part}</strong>
                    ) : (
                      <span key={j}>{part}</span>
                    )
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-gray-50 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 pb-2 flex gap-2 flex-wrap">
            {["Beach stays", "Budget picks", "How it works"].map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                  setTimeout(() => {
                    setMessages((prev) => [
                      ...prev,
                      { role: "user", content: q },
                    ]);
                    setIsTyping(true);
                    setTimeout(() => {
                      setMessages((prev) => [
                        ...prev,
                        { role: "assistant", content: getAIResponse(q) },
                      ]);
                      setIsTyping(false);
                    }, 800);
                  }, 100);
                  setInput("");
                }}
                className="text-xs px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about properties..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-brand-500 text-white hover:bg-brand-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
