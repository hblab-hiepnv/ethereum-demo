/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import ERC20_ABI from "../erc20usdt_abi.json";

const USDT_CONTRACT_ADD = "0x14ec6ee23dd1589ea147deb6c41d5ae3d6544893";

export default function ERC20Token() {
  const { account, library } = useWeb3React();

  const [tokenBalance, setTokenBalance] = React.useState(null);
  const [toAccount, setToAccount] = React.useState(null);
  const [contract, setContract] = React.useState(null);
  const [decimals, setDecimals] = React.useState(null);
  const [transferAmount, setTransferAmount] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(async () => {
    const contractIns = new library.eth.Contract(ERC20_ABI, USDT_CONTRACT_ADD);
    setContract(contractIns);
  }, [account]);

  useEffect(() => {
    if (contract) {
      contract.methods
        .decimals()
        .call()
        .then((decimals) => setDecimals(decimals))
        .catch((err) => console.error(err));

      contract.methods
        .balanceOf(account)
        .call()
        .then((tokenBalance) =>
          setTokenBalance(
            parseFloat(library.utils.fromWei(tokenBalance)).toPrecision(4)
          )
        )
        .catch((err) => console.error(err));
    }
  }, [contract]);

  const transfer = () => {
    setIsLoading(true);
    contract.methods
      .transfer(toAccount, `${transferAmount * Math.pow(10, decimals)}`)
      .send({ from: account })
      .on("receipt", ({ transactionHash }) => {
        setIsLoading(false);
        setTransferAmount('');
        console.log({ transactionHash });
      })
      .on("error", (err) => console.error(err));
  };

  return (
    <React.Fragment>
      <div>
        Tokens balance: <b>{tokenBalance} USDT</b>
      </div>
      <div>Send tokens:</div>
      <input
        type="text"
        onChange={(e) => setToAccount(e.target.value)}
        placeholder="receiver address"
      />
      <input
        type="text"
        value={transferAmount}
        onChange={(e) => setTransferAmount(e.target.value)}
        placeholder="transfer amount: 10"
        style={{ marginLeft: "8px" }}
      />
      <button type="button" onClick={transfer} style={{ marginLeft: "8px" }}>
        {!isLoading ? "Send tokens" : "Loading..."}
      </button>
    </React.Fragment>
  );
}
