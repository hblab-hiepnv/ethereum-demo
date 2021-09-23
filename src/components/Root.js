import { useWeb3React } from "@web3-react/core";
import ERC20Token from "../components/ERC20Token";
import NativeBalance from "../components/NativeBalance";
import Wallet from "../components/Wallet";

export default function Root() {
  const { library, deactivate, connector } = useWeb3React();

  const handleDisconnect = () => {
    deactivate(connector);
  };

  return (
    <div style={{ width: "500px", margin: "30px auto" }}>
      <Wallet />
      {!!library && (
        <>
          <hr />
          <NativeBalance />
          <hr />
          <ERC20Token />
          <hr />
          <button type="button" onClick={handleDisconnect}>
            Disconnect
          </button>
        </>
      )}
    </div>
  );
}
