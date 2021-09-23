import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import Root from "components/Root";

function getLibrary(provider, _connector) {
  return new Web3(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Root />
    </Web3ReactProvider>
  );
}

export default App;
