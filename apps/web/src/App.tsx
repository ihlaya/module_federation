import { erc20, ethers, native } from 'evm';
import { useEffect, useState } from 'react';
import './App.css';

interface ContractDetails {
  symbol: string;
  decimals: number;
}

function App() {
  const [contractDetails, setContractDetails] = useState<ContractDetails>();
  const [nativeBalance, setNativeBalance] = useState<string>('0');
  //@ts-ignore
  const provider = new ethers.BrowserProvider(window.ethereum);
  const Bdlty = new erc20.contract(
    '0x43981ff140dF790BEfe60EE2e721b67aF4c114F4',
    provider
  );

  useEffect(() => {
    (async () => {
      const signer = await provider.getSigner();
      const symbol = await Bdlty.symbol();
      const decimals = await Bdlty.decimals();
      setContractDetails({ symbol, decimals: decimals });
      const balance = await native.getSignerBalance(signer);
      setNativeBalance(balance.parsedBalance);
    })();
  }, []);

  return (
    <div className="App">
      <h1>Taked first wallet in MM</h1>
      <div className="card">
        <p>Native balance = {nativeBalance}</p>
        {contractDetails && (
          <p>contractDetails = {JSON.stringify(contractDetails, null, 2)}</p>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
