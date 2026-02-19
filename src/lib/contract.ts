import { HACKBNB_ABI } from "./abi";

export const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  "0x0000000000000000000000000000000000000000";

export const BSC_TESTNET = {
  chainId: 97,
  chainIdHex: "0x61",
  name: "BNB Smart Chain Testnet",
  rpcUrl: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
  explorer: "https://testnet.bscscan.com",
  currency: {
    name: "tBNB",
    symbol: "tBNB",
    decimals: 18,
  },
};

export const OPBNB_TESTNET = {
  chainId: 5611,
  chainIdHex: "0x15EB",
  name: "opBNB Testnet",
  rpcUrl: "https://opbnb-testnet-rpc.bnbchain.org",
  explorer: "https://opbnb-testnet.bscscan.com",
  currency: {
    name: "tBNB",
    symbol: "tBNB",
    decimals: 18,
  },
};

export const ACTIVE_CHAIN = BSC_TESTNET;

export { HACKBNB_ABI };
