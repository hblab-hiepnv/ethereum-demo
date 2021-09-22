import React from "react";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";
import { Contract } from "@ethersproject/contracts";
import ERC20_ABI from "erc20usdt_abi.json";

export default function Transfer({ tokenAddress }) {
  const USDT_CONTRACT_ADDRESS = "0x14ec6ee23dd1589ea147deb6c41d5ae3d6544893";
  const { account, library } = useWeb3React();
  const [info, setInfo] = React.useState(null);

  if (!!library) {
    const contract = new Contract(
      USDT_CONTRACT_ADDRESS,
      ERC20_ABI,
      library?.getSigner()
    );

    console.log(
      contract
        ?.balanceOf(account)
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
      {/* <input type="text" onChange={(e) => setToAccount(e.target.value)} /> */}
      <button type="button" onClick={transfer}>
        Send
      </button>
    </React.Fragment>
  );
}
