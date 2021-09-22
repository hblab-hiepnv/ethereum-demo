import React, { isValidElement } from "react";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { Contract } from "@ethersproject/contracts";
import { InjectedConnector } from "@web3-react/injected-connector";
import useSWR from "swr";
// import your favorite web3 convenience library here

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
      <Transfer />
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

function Transfer() {
  const ERC20ABI = require("./erc20usdt_abi.json");
  const contractAdd = "0x14ec6ee23dd1589ea147deb6c41d5ae3d6544893";
  const [toAccount, setToAccount] = React.useState(null);
  const { account: fromAccount, library } = useWeb3React();
  const [info, setInfo] = React.useState(null);

  if (!!library) {
    const contract = new Contract(contractAdd, ERC20ABI, library?.getSigner());
    console.log("signer", library?.getSigner());
    console.log(
      contract
        ?.balanceOf(fromAccount)
        .then((val) => console.log("Balance", formatEther(val)))
    );
  }

  const transfer = () => {
    library
      .contract()
      .at("0x9c858484b4d35F0161d55a6D0dcE40204D459ef7")
      .then((info) => {
        console.log(info);
        setInfo(info);
      })
      .catch((err) => console.error(err));
  };

  return (
    <React.Fragment>
      <div>Info: {JSON.stringify(info, null, 4)}</div>
      <input type="text" onChange={(e) => setToAccount(e.target.value)} />
      <button type="button" onClick={transfer}>
        Send
      </button>
    </React.Fragment>
  );
}

export default App;
