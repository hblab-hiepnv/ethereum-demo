import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React from "react";
import { formatEther } from "@ethersproject/units";
import { InjectedConnector } from "@web3-react/injected-connector";
// import your favorite web3 convenience library here

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [97],
});

function getLibrary(provider, _connector) {
  return new Web3Provider(provider); // this will vary according to whether you use e.g. ethers or web3.js
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Balance />
    </Web3ReactProvider>
  );
}

function Balance() {
  const account = "0x9c858484b4d35F0161d55a6D0dcE40204D459ef7";
  const { chainId, activate, active, library } = useWeb3React();
  const [balance, setBalance] = React.useState();

  const [accountId, setAccountId] = React.useState(null);

  React.useEffect(() => {
    if (!!accountId && !!library) {
      library
        .getBalance(accountId)
        .then((balance) => {
          setBalance(balance);
        })
        .catch(() => {
          setBalance(null);
        });

      return () => {
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]);

  const onClick = () => {
    activate(injectedConnector);
  };


  return (
    <div>
      <input type="text" onChange={(e) => setAccountId(e.target.value)}/>
      <div>ChainId: {chainId}</div>
      <span>Balance</span>
      <span role="img" aria-label="gold">
        💰
      </span>
      <span>
        {balance === null
          ? "Error"
          : balance
          ? `Ξ ${parseFloat(formatEther(balance)).toPrecision(4)}`
          : ""}
      </span>
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

export default App;
