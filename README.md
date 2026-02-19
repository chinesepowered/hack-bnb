# 🏠 HackBnB

### Stay Anywhere. Pay with Crypto. Trust the Chain.

HackBnB is the first **decentralized accommodation marketplace** built on BNB Chain — think Airbnb, but onchain. Guests pay with BNB, smart contracts handle escrow, reviews live on the blockchain, and an AI assistant helps you find your perfect stay.

No middlemen. No chargebacks. No fake reviews. Just trustless travel. ✨

---

## 🎯 The Problem

Traditional booking platforms take **14–20% in fees**, control your money with opaque escrow, let fake reviews run rampant, and lock out billions of unbanked travelers. Hosts wait days or weeks for payouts. Guests have no real transparency into where their money goes.

## 💡 The Solution

HackBnB replaces all of that with smart contracts:

- 🔐 **Trustless Escrow** — Funds flow through a Solidity contract. Hosts get paid instantly on checkout. No middleman holds your money.
- 💸 **2.5% Fee** — Compare that to Airbnb's 14-20%. More value stays with hosts and guests.
- ⭐ **Onchain Reviews** — Every review is tied to a verified booking on the blockchain. No fakes. No manipulation.
- 🤖 **AI-Powered Discovery** — A built-in AI travel assistant recommends properties based on your preferences, budget, and travel style.
- 🌍 **Borderless** — Anyone with a wallet can book. No bank accounts, no credit checks, no currency conversion headaches.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| ⛓️ Blockchain | BNB Smart Chain (BSC Testnet) |
| 📜 Smart Contracts | Solidity 0.8.20 + Hardhat |
| 🖥️ Frontend | Next.js 16, React 19, TypeScript |
| 🎨 Styling | Tailwind CSS + Framer Motion |
| 🔗 Web3 | ethers.js v6 + MetaMask |
| 🤖 AI | Built-in assistant (extensible to any LLM) |

---

## ✨ Features

### 🏡 For Guests
- Browse properties across **7 countries** with rich detail pages
- Filter by category: 🏖️ Beachfront, 🏔️ Mountain, 🏙️ City, 🌴 Tropical, 🏡 Countryside, ✨ Unique, 👑 Luxury
- Book with BNB — smart contract escrow protects your payment
- Leave verified onchain reviews after your stay
- Ask the **AI assistant** for personalized recommendations

### 🏠 For Hosts
- List properties in a single transaction
- **AI-generated descriptions** — one click to create compelling listing copy
- Get paid instantly (minus 2.5% fee) when guests check out
- Track bookings and reviews onchain

### 🤖 AI Integration
- **Travel Assistant** — floating chatbot that recommends properties by preference, budget, and vibe
- **Description Generator** — hosts can auto-generate optimized property descriptions
- Designed to plug into any LLM API (Claude, GPT, etc.) for production

---

## 📂 Project Structure

```
hack-bnb/
├── contracts/
│   └── HackBnB.sol              # Smart contract (escrow, bookings, reviews)
├── scripts/
│   └── deploy.ts                 # Deployment + seed data
├── src/
│   ├── app/
│   │   ├── page.tsx              # 🏠 Homepage (hero, featured, how-it-works)
│   │   ├── explore/page.tsx      # 🔍 Search & filter properties
│   │   ├── host/page.tsx         # ➕ List a property (with AI descriptions)
│   │   ├── trips/page.tsx        # 🧳 Booking history
│   │   └── property/[id]/page.tsx# 📋 Property detail + booking widget
│   ├── components/
│   │   ├── Navbar.tsx            # Navigation + wallet connection
│   │   ├── Footer.tsx            # Site footer
│   │   ├── PropertyCard.tsx      # Property listing card
│   │   ├── CategoryBar.tsx       # Category filter chips
│   │   └── AIAssistant.tsx       # 🤖 Floating AI chatbot
│   ├── context/
│   │   └── Web3Context.tsx       # Wallet + contract state
│   └── lib/
│       ├── abi.ts                # Contract ABI
│       ├── contract.ts           # Chain config
│       ├── mockData.ts           # Demo properties (8 listings)
│       └── utils.ts              # Helpers
├── hardhat.config.ts
├── next.config.js
├── tailwind.config.ts
└── package.json                  # Single unified package
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MetaMask browser extension
- tBNB tokens from the [BNB Testnet Faucet](https://www.bnbchain.org/en/testnet-faucet)

### Run Locally

```bash
git clone https://github.com/chinesepowered/hack-bnb.git
cd hack-bnb
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and connect your wallet.

### Deploy the Smart Contract

```bash
cp .env.example .env
# Add your deployer private key to .env

npm run compile
npm run deploy:testnet       # BSC Testnet
# npm run deploy:opbnb       # or opBNB Testnet
```

Update `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env.local` with the deployed address.

---

## 📜 Smart Contract

`HackBnB.sol` — a single, clean contract that handles everything:

| Function | What it does |
|----------|-------------|
| `listProperty()` | Host creates a listing (name, location, price, image) |
| `bookProperty()` | Guest pays with BNB — funds held in contract escrow |
| `completeBooking()` | Marks booking complete, releases funds to host |
| `cancelBooking()` | Cancels booking, handles refund logic |
| `submitReview()` | Guest leaves an onchain review (1-5 stars + comment) |
| `getAllProperties()` | Returns all listed properties |
| `getPropertyReviews()` | Returns all reviews for a property |

**Security:** ReentrancyGuard-safe payment flows. Platform fee capped at 10% max (currently 2.5%). Owner-only admin functions.

---

## 🎬 Demo Walkthrough

1. 🦊 **Connect Wallet** — Hit "Connect Wallet" and switch to BSC Testnet
2. 🔍 **Explore** — Browse 8 demo properties across Bali, Tokyo, Zermatt, NYC, Santorini, Costa Rica, Tuscany, and Dubai
3. 📅 **Book** — Pick dates, review the price breakdown, and confirm your booking onchain
4. ➕ **Host** — List your own property and let AI write the description for you
5. 💬 **AI Chat** — Click the floating chat bubble to get personalized recommendations
6. 🧳 **Trips** — View your booking history with transaction links

---

## 🏗️ Architecture

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Next.js    │───▶│  ethers.js   │───▶│  HackBnB.sol │
│   Frontend   │    │   + MetaMask │    │  (BSC Testnet)│
└──────┬───────┘    └──────────────┘    └──────────────┘
       │
       ▼
┌──────────────┐
│ AI Assistant │
│ (Chat + Desc │
│  Generator)  │
└──────────────┘
```

The frontend talks to the smart contract via ethers.js through MetaMask. The AI assistant runs client-side with keyword matching (designed to be swapped with a real LLM API endpoint). All booking and review data lives onchain.

---

## 🤝 Why BNB Chain?

- ⚡ **Fast finality** — ~3 second block times mean bookings confirm instantly
- 💰 **Low gas** — transactions cost fractions of a cent
- 🌐 **Massive ecosystem** — largest EVM-compatible chain by daily active users
- 🔒 **Battle-tested** — production-grade security for real-world applications

---

## 📄 License

MIT
