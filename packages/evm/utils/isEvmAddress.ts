import { ethers } from 'ethers';

export const isEvmAddress = (address?: string) => {
  if (
    !address ||
    !ethers.isAddress(address) ||
    address === ethers.ZeroAddress
  ) {
    return false;
  }
  return true;
};
