# HackBnB — Decentralized Accommodation on BNB Chain

> The first decentralized Airbnb built on BNB Smart Chain. Book stays with crypto, trustless escrow payments, onchain reviews, and AI-powered discovery.

Built for the **Good Vibes Only: OpenClaw Edition** Hackathon.

---

## Overview

HackBnB brings the sharing economy onchain. Hosts list properties, guests book with BNB, and smart contracts handle escrow payments — no intermediaries, no trust assumptions. An AI assistant helps guests discover the perfect stay.

### Key Features

- **Onchain Bookings** — Pay with BNB via smart contract escrow. Funds release to hosts automatically after checkout.
- **Trustless Reviews** — Reviews are stored onchain and tied to verified bookings. No fake reviews possible.
- **AI Travel Assistant** — Built-in chatbot helps guests find properties by preference, budget, and location.
- **AI-Generated Descriptions** — Hosts can generate optimized property descriptions with one click.
- **Low Fees** — 2.5% platform fee (vs 14-20% on Web2 platforms).
- **Cancellation Protection** — Smart contract handles refunds automatically. Guests can cancel before check-in.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Blockchain** | BNB Smart Chain (BSC Testnet) |
| **Smart Contracts** | Solidity 0.8.19, Hardhat |
| **Frontend** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS, Framer Motion |
| **Web3** | ethers.js v6, MetaMask |
| **AI** | Built-in AI assistant (extensible to LLM APIs) |

---

## Project Structure

```
hack-bnb/
├── contracts/
│   └── HackBnB.sol           # Main smart contract (escrow, bookings, reviews)
├── scripts/
│   └── deploy.ts              # Hardhat deployment script
├── test/                      # Contract tests
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Homepage (hero, featured, how-it-works)
│   │   ├── explore/page.tsx   # Property search & filtering
│   │   ├── host/page.tsx      # List property form with AI description
│   │   ├── trips/page.tsx     # User booking history
│   │   └── property/[id]/     # Property detail & booking
│   ├── components/
│   │   ├── Navbar.tsx         # Navigation with wallet connection
│   │   ├── Footer.tsx         # Site footer
│   │   ├── PropertyCard.tsx   # Property listing card
│   │   ├── CategoryBar.tsx    # Category filter chips
│   │   └── AIAssistant.tsx    # Floating AI chatbot
│   ├── context/
│   │   └── Web3Context.tsx    # Wallet & contract state management
│   └── lib/
│       ├── abi.ts             # Contract ABI
│       ├── contract.ts        # Chain config & contract address
│       ├── mockData.ts        # Demo property data
│       └── utils.ts           # Helpers (formatting, address truncation)
├── hardhat.config.ts
├── next.config.js
├── tailwind.config.ts
├── package.json               # Single unified package
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask browser extension
- BNB Testnet tokens ([faucet](https://www.bnbchain.org/en/testnet-faucet))

### Install & Run

```bash
# Clone
git clone https://github.com/chinesepowered/hack-bnb.git
cd hack-bnb

# Install all dependencies (Next.js + Hardhat)
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Smart Contract Deployment

```bash
# Copy env and add your private key
cp .env.example .env

# Compile contracts
npm run compile

# Deploy to BSC Testnet
npm run deploy:testnet

# Deploy to opBNB Testnet
npm run deploy:opbnb
```

After deploying, update `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env.local` with the deployed address.

---

## Smart Contract

The `HackBnB.sol` contract handles:

| Function | Description |
|----------|-------------|
| `listProperty()` | Host lists a new property with name, location, price |
| `bookProperty()` | Guest books with BNB (escrow held in contract) |
| `completeBooking()` | Host marks booking complete, funds released |
| `cancelBooking()` | Guest/host cancels, refund processed |
| `submitReview()` | Guest leaves onchain review (1-5 stars + comment) |

**Security:** ReentrancyGuard on all payment functions. 2.5% platform fee on bookings.

---

## Demo Walkthrough

1. **Connect Wallet** — Click "Connect Wallet" and connect MetaMask to BSC Testnet
2. **Explore** — Browse 8 demo properties across 7 countries, filter by category
3. **Book a Stay** — Select dates on a property page, review pricing, confirm onchain
4. **Host** — List your own property with AI-generated descriptions
5. **AI Assistant** — Click the chat bubble to ask for recommendations
6. **View Trips** — Check booking history and leave onchain reviews

---

## AI Integration

HackBnB uses AI in two ways:

1. **AI Travel Assistant** — A floating chatbot that helps guests discover properties based on preferences (beach, budget, city, luxury, etc.). Responds contextually with property recommendations and booking guidance.

2. **AI Description Generator** — Hosts can generate optimized property descriptions with one click when listing. The AI analyzes the property name and location to create compelling, detailed descriptions.

Both are designed to be extended with real LLM API calls (Claude, GPT, etc.) for production use.

---

## Hackathon Tracks

- **BNB Chain** — Smart contracts deployed on BSC Testnet
- **AI Integration** — AI-powered property discovery and content generation
- **DeFi / Consumer** — Decentralized accommodation marketplace

---

## License

MIT
