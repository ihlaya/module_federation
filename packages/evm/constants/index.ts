export enum ChainId {
  ETH = '1',
  GOERLI = '5',
}

export const multicall_addresses: { [chainId in ChainId]: string } = {
  [ChainId.ETH]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.GOERLI]: '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e',
};
