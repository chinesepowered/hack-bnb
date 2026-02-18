"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { HACKBNB_ABI, CONTRACT_ADDRESS, ACTIVE_CHAIN } from "@/lib/contract";

interface Web3State {
  account: string | null;
  chainId: number | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  contract: ethers.Contract | null;
  isConnecting: boolean;
  isCorrectChain: boolean;
}

interface Web3ContextType extends Web3State {
  connect: () => Promise<void>;
  disconnect: () => void;
  switchChain: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Web3State>({
    account: null,
    chainId: null,
    provider: null,
    signer: null,
    contract: null,
    isConnecting: false,
    isCorrectChain: false,
  });

  const getEthereum = () => {
    if (typeof window !== "undefined") {
      return (window as unknown as { ethereum?: ethers.Eip1193Provider }).ethereum;
    }
    return undefined;
  };

  const switchChain = useCallback(async () => {
    const ethereum = getEthereum();
    if (!ethereum) return;

    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ACTIVE_CHAIN.chainIdHex }],
      });
    } catch (switchError: unknown) {
      const err = switchError as { code?: number };
      if (err.code === 4902) {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: ACTIVE_CHAIN.chainIdHex,
              chainName: ACTIVE_CHAIN.name,
              nativeCurrency: ACTIVE_CHAIN.currency,
              rpcUrls: [ACTIVE_CHAIN.rpcUrl],
              blockExplorerUrls: [ACTIVE_CHAIN.explorer],
            },
          ],
        });
      }
    }
  }, []);

  const setupProvider = useCallback(
    async (ethereum: ethers.Eip1193Provider) => {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);
      const isCorrectChain = chainId === ACTIVE_CHAIN.chainId;

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        HACKBNB_ABI,
        signer
      );

      setState({
        account,
        chainId,
        provider,
        signer,
        contract,
        isConnecting: false,
        isCorrectChain,
      });
    },
    []
  );

  const connect = useCallback(async () => {
    const ethereum = getEthereum();
    if (!ethereum) {
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    setState((prev) => ({ ...prev, isConnecting: true }));

    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      await setupProvider(ethereum);
    } catch {
      setState((prev) => ({ ...prev, isConnecting: false }));
    }
  }, [setupProvider]);

  const disconnect = useCallback(() => {
    setState({
      account: null,
      chainId: null,
      provider: null,
      signer: null,
      contract: null,
      isConnecting: false,
      isCorrectChain: false,
    });
  }, []);

  // Auto-connect if previously connected
  useEffect(() => {
    const ethereum = getEthereum();
    if (!ethereum) return;

    ethereum
      .request({ method: "eth_accounts" })
      .then((accounts: unknown) => {
        const accs = accounts as string[];
        if (accs.length > 0) {
          setupProvider(ethereum);
        }
      })
      .catch(() => {});

    // Listen for account/chain changes
    const handleAccountsChanged = (accounts: unknown) => {
      const accs = accounts as string[];
      if (accs.length === 0) {
        disconnect();
      } else {
        setupProvider(ethereum);
      }
    };

    const handleChainChanged = () => {
      setupProvider(ethereum);
    };

    const eth = ethereum as unknown as {
      on: (event: string, handler: (arg: unknown) => void) => void;
      removeListener: (event: string, handler: (arg: unknown) => void) => void;
    };

    eth.on("accountsChanged", handleAccountsChanged);
    eth.on("chainChanged", handleChainChanged);

    return () => {
      eth.removeListener("accountsChanged", handleAccountsChanged);
      eth.removeListener("chainChanged", handleChainChanged);
    };
  }, [setupProvider, disconnect]);

  return (
    <Web3Context.Provider
      value={{ ...state, connect, disconnect, switchChain }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) throw new Error("useWeb3 must be used within Web3Provider");
  return context;
}
