import React, { useMemo } from 'react';
import { WalletProvider, useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import { WalletModalProvider, WalletModalButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';
import { DecryptPermission, WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base';

import '@demox-labs/aleo-wallet-adapter-reactui/styles.css';

const WalletButton = () => {
    const { connected, publicKey, disconnect } = useWallet();
    const handleDisconnect = () => {
        if (connected) {
            disconnect();
        }
    };

    if (connected && publicKey) {
        return (
            <button onClick={handleDisconnect}>
                {publicKey.toString()} (Disconnect)
            </button>
        );
    } else {
        return (
            <WalletModalButton>
                Connect Leo Wallet
            </WalletModalButton>
        );
    }
};

function App() {
  const wallets = useMemo(() => [
    new LeoWalletAdapter({
      appName: "Leo Demo App", 
    })
  ], []);

  return (
    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.Localnet} 
      autoConnect
    >
      <WalletModalProvider>
        <div className="App">
          <header className="App-header">
            <WalletButton />
          </header>
        </div>
      </WalletModalProvider>
    </WalletProvider>
  );
}

export default App;
