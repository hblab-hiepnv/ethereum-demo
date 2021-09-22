import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";
import { Contract } from "@ethersproject/contracts";
import ERC20_ABI from "../erc20usdt_abi.json";

export default function ERC20Token() {
  const USDT_CONTRACT_ADDRESS = "0x14ec6ee23dd1589ea147deb6c41d5ae3d6544893";
  const { account, library, active } = useWeb3React();
  const [tokenBalance, setTokenBalance] = React.useState(null);
  const [toAccount, setToAccount] = React.useState(null);
  const [contract, setContract] = React.useState(null);

  useEffect(() => {
    console.log({ account, contract });
    if (!!account) {
      const contractIns = new Contract(
        USDT_CONTRACT_ADDRESS,
        ERC20_ABI,
        library.getSigner()
      );
      setContract(contractIns);
    }
  }, [account]);

  useEffect(() => {
    if (!!contract) {
      contract
        .balanceOf(account)
        .then((tokenBalance) => setTokenBalance(formatEther(tokenBalance)));
    }
  }, [contract]);

  const transfer = () => {
    !!contract &&
      contract
        .transfer(toAccount, `${10 * Math.pow(10, 18)}`)
        .then((info) => {
          console.log(info);
        })
        .catch((err) => console.error(err));
  };

  return (
    <React.Fragment>
      <div>Token balance: {tokenBalance}</div>
      <input type="text" onChange={(e) => setToAccount(e.target.value)} />
      <button type="button" onClick={transfer}>
        Send
      </button>
    </React.Fragment>
  );
}
