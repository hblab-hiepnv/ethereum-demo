import React from "react";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";

const web3Methods =
  (library) =>
  (...args) => {
    const [method, ...params] = args;
    return library[method](...params);
  };

export default function NativeBalance() {
  const { library, account } = useWeb3React();
  const [toAccount, setToAccount] = React.useState(null);
  const [transferAmount, setTransferAmount] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const { data: balance } = useSWR(["getBalance", account, "latest"], {
    fetcher: web3Methods(library.eth),
  });

  const transfer = () => {
    const amount = library.utils.toWei(transferAmount);

    setIsLoading(true);
    library.eth
      .sendTransaction({
        to: toAccount,
        from: account,
        value: amount,
      })
      .on("receipt", ({ transactionHash }) => {
        setIsLoading(false);
        setTransferAmount('');
        console.log({ transactionHash });
      })
      .on("error", (err) => console.error(err));
  };

  return (
    <div>
      <div>
        Native coin balance:{" "}
        <b>
          {balance
            ? parseFloat(library.utils.fromWei(balance)).toPrecision(4)
            : ""}
        </b>
      </div>
      <div>Send coin</div>
      <input
        type="text"
        onChange={(e) => setToAccount(e.target.value)}
        placeholder="receiver address"
      />
      <input
        type="text"
        value={transferAmount}
        onChange={(e) => setTransferAmount(e.target.value)}
        placeholder="transfer amount: 0.1"
        style={{ marginLeft: "8px" }}
      />
      <button type="button" onClick={transfer} style={{ marginLeft: "8px" }}>
        {!isLoading ? "Send coins" : "Loading..."}
      </button>
    </div>
  );
}
