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
  const [transerAmount, setTransferAmount] = React.useState(0);

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
    contract.methods
      .transfer(toAccount, `${transerAmount * Math.pow(10, decimals)}`)
      .send({ from: account })
      .then((val) => {
        setToAccount("");
      })
      .catch((err) => {
        console.error(err);
        setToAccount("");
      });
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
        onChange={(e) => setTransferAmount(e.target.value)}
        placeholder="transfer tokens value: 10"
        style={{ marginLeft: "8px" }}
      />
      <button type="button" onClick={transfer} style={{ marginLeft: "8px" }}>
        Send tokens
      </button>
    </React.Fragment>
  );
}
