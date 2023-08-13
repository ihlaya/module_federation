import { ethers } from 'ethers';

export const getSignerBalance = async (signer: ethers.AbstractSigner) => {
  if (!signer.provider) throw new Error('Signer provider is not set');
  const balance = await signer.provider.getBalance(signer.getAddress());
  const parsedBalance = ethers.formatEther(balance);
  return { balance, parsedBalance };
};
