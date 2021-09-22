import React from "react";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { InjectedConnector } from "@web3-react/injected-connector";
import useSWR from "swr";
import ERC20Token from "./components/ERC20Token";

const fetcher =
  (library) =>
  (...args) => {
    const [method, ...params] = args;
    console.log({ method, params });
    return library[method](...params);
  };

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 97],
});

function getLibrary(provider, _connector) {
  return new Web3Provider(provider); // this will vary according to whether you use e.g. ethers or web3.js
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Wallet />
      <Balance />
      <ERC20Token />
    </Web3ReactProvider>
  );
}

function Wallet() {
  const { chainId, account, activate, active } = useWeb3React();

  const onClick = () => {
    activate(injectedConnector);
  };

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      {active ? (
        <div>✅ </div>
      ) : (
        <button type="button" onClick={onClick}>
          Connect
        </button>
      )}
    </div>
  );
}

function Balance() {
  const { library, account } = useWeb3React();

  const { data: balance } = useSWR(["getBalance", account, "latest"], {
    fetcher: fetcher(library),
  });

  if (!balance) {
    return <div>...</div>;
  }
  return <div>Ξ {parseFloat(formatEther(balance)).toPrecision(4)}</div>;
}

export default App;
