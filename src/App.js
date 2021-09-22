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
  const { chainId, activate, active, library, account } = useWeb3React();
  const [balance, setBalance] = React.useState();
  const [to, setTo] = React.useState(undefined);
  const [options, setOptions] = React.useState('1');
  const [accountId , setAccountId] = React.useState(undefined);
  const [balanceWithAccountId, setBalanceWithAccountId] = React.useState();


  React.useEffect(() => {
    if (!!account && !!library) {
      library
        .getBalance(account)
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

  const connectMetaMask = () => {
    activate(injectedConnector);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTo(value);
  };

  const smartTransaction = () => {
    const request = {
      method: "eth_sendTransaction",
      params: [
        {
          from: account,
          to: to,
          value: "0x29a2241af62c0000",
          gasPrice: "0x09184e72a000",
          gas: "0x2710",
        },
      ],
    };
    library.provider.send(request, (inf) => {
      console.log("inf", inf);
    });
  };

  const changeOption = (e) => {
    const value = e.target.value;
    setOptions(value);
  };

  const handleChangeAccountId = (e) => {
    const value = e.target.value;
    setAccountId(value);
  }

  const getBalanceWithAccountId = () => {
    library
      .getBalance(accountId)
      .then((balance) => {
        setBalanceWithAccountId(balance);
      })
      .catch(() => {
        setBalanceWithAccountId(null);
      });

    return () => {
      setBalanceWithAccountId(undefined);
    };
  }

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account Id: {account}</div>
      <span>My Balance</span>
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
      <hr/>
      {active ? (
        <React.Fragment>
          <div>
            <input
              type="radio"
              id="infoTransaction"
              name="infoTransaction"
              value={1}
              onChange={changeOption}
              checked={options === "1"}
            />
            <label for="infoTransaction">Info Transaction</label>
            <input
              type="radio"
              id="sendSmartContract"
              name="sendSmartContract"
              value={2}
              onChange={changeOption}
              checked={options === "2"}
            />
            <label for="sendSmartContract">Send ERC-20</label>
          </div>
          {options === "2" ? (
            <>
              The destination address: <input onChange={handleChange} />
              <button
                type="button"
                onClick={smartTransaction}
                style={{ marginLeft: 10 }}
              >
                Send
              </button>
            </>
          ) : (
            <>
              AccoountId: <input onChange={handleChangeAccountId} />
              <button
                type="button"
                onClick={getBalanceWithAccountId}
                style={{ marginLeft: 10 }}
              >
                Send
              </button>
              <br />
              {balanceWithAccountId === null
                ? "Error"
                : balanceWithAccountId
                ? `Balance 💰Ξ : ${parseFloat(
                    formatEther(balanceWithAccountId)
                  ).toPrecision(4)}`
                : ""}
            </>
          )}
        </React.Fragment>
      ) : (
        <button type="button" onClick={connectMetaMask}>
          Connect
        </button>
      )}
    </div>
  );
}

export default App;
