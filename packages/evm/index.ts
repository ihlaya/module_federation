import { ethers } from 'ethers';
import { erc20 } from './erc20';
import { multicall } from './multicall';
import { native } from './native';
import { utils } from './utils';

const evm = {
  erc20,
  utils,
  native,
  ethers,
  multicall,
};

export default evm;
export * from 'ethers';
export * from './erc20';
export * from './multicall';
export * from './native';
export * from './utils';
