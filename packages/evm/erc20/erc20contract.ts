import { TransactionResponse, ethers } from 'ethers';

import { BaseContract } from '../common/baseContract';
import { ERC_20_ABI } from './erc20.abi';

export class Erc20Contract extends BaseContract {
  contractAddress: string;
  provider: ethers.AbstractProvider | ethers.AbstractSigner;
  constructor(
    address: string,
    provider: ethers.AbstractProvider | ethers.AbstractSigner,
    abi = ERC_20_ABI
  ) {
    super(address, abi, provider);
    this.contractAddress = address;
    this.provider = provider;
  }

  async balanceOf(account: string) {
    try {
      const balance: bigint = await this.contract.balanceOf(account);
      const decimals = await this.decimals();
      const parsedBalance = ethers.formatUnits(balance, decimals);

      return { balance, parsedBalance };
    } catch (error) {
      throw error;
    }
  }

  async allowance(owner: string, spender: string) {
    try {
      const allowance: bigint = await this.contract.allowance(owner, spender);
      const decimals = await this.decimals();
      const parsedAllowace = ethers.formatUnits(allowance, decimals);

      return { allowance, parsedAllowace };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async approve(spender: string, value: BigInt) {
    try {
      const tx: TransactionResponse = await this.contract.approve(
        spender,
        value
      );
      const result = await tx.wait(1);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async symbol() {
    try {
      const tx: string = await this.contract.symbol();
      return tx;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async decimals(): Promise<number> {
    try {
      const result: bigint = await this.contract.decimals();

      return Number(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async transfer(to: string, amount: BigInt) {
    if (this.provider instanceof ethers.AbstractProvider) {
      throw new Error('Only Signer can call transfer');
    }
    try {
      const result: TransactionResponse = await this.contract.transfer(
        to,
        amount
      );
      return await result.wait(1);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
