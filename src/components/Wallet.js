import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 97],
});

export default function Wallet() {
  const { chainId, account, activate, active } = useWeb3React();

  const handleConnectWallet = () => {
    activate(injectedConnector);
  };

  return (
    <div>
      {active ? (
        <>
          <div>✅ <b>Connected</b></div>
          <div>ChainId: {chainId}</div>
          <div>Account: {account}</div>
        </>
      ) : (
        <>
          <div>You are not connect to any Wallet</div>
          <button type="button" onClick={handleConnectWallet}>
            Connect Wallet
          </button>
        </>
      )}
    </div>
  );
}
