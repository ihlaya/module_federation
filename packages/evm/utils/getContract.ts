import { Contract, Interface, InterfaceAbi, ethers } from 'ethers';
import { isEvmAddress } from './isEvmAddress';

export function getContract(
  address: string,
  ABI: Interface | InterfaceAbi,
  provider: ethers.Signer | ethers.Provider
): Contract {
  if (!isEvmAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'. `);
  }

  return new ethers.Contract(address, ABI, provider);
}
