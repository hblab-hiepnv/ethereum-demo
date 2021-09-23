import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 97],
});

const walletConnector = new WalletConnectConnector({
  rpc: { 97: "https://data-seed-prebsc-1-s1.binance.org:8545/" },
  qrcode: true,
});

export default function Wallet() {
  const { chainId, account, activate, active } = useWeb3React();

  const handleWalletInjectorActivate = () => {
    activate(injectedConnector);
  };

  const handleWalletConnect = () => {
    activate(walletConnector);
  };

  return (
    <div>
      {active ? (
        <>
          <div>
            ✅ <b>Connected</b>
          </div>
          <div>ChainId: {chainId}</div>
          <div>Account: {account}</div>
        </>
      ) : (
        <>
          <div>You are not connected to any Wallet</div>
          <button type="button" onClick={handleWalletInjectorActivate}>
            Connect Wallet
          </button>
          <button
            type="button"
            onClick={handleWalletConnect}
            style={{ marginLeft: "8px" }}
          >
            Wallet Connect QR
          </button>
        </>
      )}
    </div>
  );
}
