import { Contract, Interface, InterfaceAbi, ethers } from 'ethers';
import { getContract } from '../utils/getContract';

export class BaseContract {
  contractAddress: string;
  contract: Contract;
  constructor(
    address: string,
    ABI: Interface | InterfaceAbi,
    provider: ethers.Provider | ethers.Signer
  ) {
    this.contractAddress = address;
    this.contract = getContract(address, ABI, provider);
  }
}
