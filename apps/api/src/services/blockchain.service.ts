import { ethers } from "ethers";

export interface AnchorResult {
  txHash: string;
  network: string;
  credentialHash: string;
  status: "pending" | "confirmed" | "failed";
}

/**
 * Computes canonical credential hash for blockchain anchoring
 */
export function computeCredentialHash(canonicalData: Record<string, unknown>): string {
  const jsonString = JSON.stringify(canonicalData, Object.keys(canonicalData).sort());
  return ethers.keccak256(ethers.toUtf8Bytes(jsonString));
}

/**
 * Submits credential hash to EVM testnet
 */
export async function anchorCredentialOnChain(credentialHash: string): Promise<AnchorResult> {
  const rpcUrl = process.env.CHAIN_RPC_URL;
  const privateKey = process.env.CHAIN_PRIVATE_KEY;
  const network = process.env.CHAIN_NETWORK || "amoy";

  if (!rpcUrl || !privateKey) {
    // If not configured in dev, return mock pending result for testnet queue
    return {
      txHash: `0xmock_${credentialHash.slice(2, 10)}`,
      network,
      credentialHash,
      status: "pending",
    };
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  const tx = await wallet.sendTransaction({
    to: wallet.address,
    value: 0n,
    data: credentialHash,
  });

  return {
    txHash: tx.hash,
    network,
    credentialHash,
    status: "pending",
  };
}
