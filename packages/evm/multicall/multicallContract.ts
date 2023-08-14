import { Contract, ethers } from 'ethers';
import { ChainId, multicall_addresses } from '../constants';
import { MULTICALL_ABI } from './multicall.abi';

export class MulticallContract {
  provider: ethers.AbstractProvider;
  contract: Contract;

  constructor(
    chainId: ChainId,
    provider: ethers.AbstractProvider,
    abi = MULTICALL_ABI
  ) {
    this.provider = provider;
    const address = multicall_addresses[chainId];
    this.contract = new Contract(address, abi, provider);
  }

  async aggregate(
    calls: Array<[target: string, encodeFunction: string]>
  ): Promise<[number, string]> {
    try {
      return await this.contract.aggregate(calls);
    } catch (error) {
      console.log('multicall error : ', error);
      throw error;
    }
  }
}

// Input Example:
// [
//   '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', // token address
//   erc20Contract.interface.encodeFunctionData('balanceOf', [userAddress]),
// ],

// Output Example:
// const [_, returnData] = await multicall.aggregate(callData);

// Parse output to get the balance of each token:
// const result = returnData.reduce((response, aggregateItemResult, i) => {
//   const data = erc20Contract.interface.decodeFunctionResult(
//     'balanceOf',
//     aggregateItemResult
//   );
//   response[i] = +BigInt(data[0]).toString() / 10e6; // 6 decimals
//   return response;
// }, []);
