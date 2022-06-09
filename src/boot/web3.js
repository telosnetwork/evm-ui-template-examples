import { ethers } from "ethers";

let web3 = {
    provider: new ethers.providers.JsonRpcProvider(process.env.NETWORK_EVM_RPC),
    signer: new ethers.providers.Web3Provider(window.ethereum, "any"),
    initial_network: 0
};

import { useNetworkStore } from 'stores/network';
import { useAccountStore } from 'stores/account';

export default async ({  app, router, store }) => {
    let network = await web3.signer.getNetwork();
    web3.initial_network = parseInt(network.chainId);
    web3.signer.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
            const networkStore = useNetworkStore();
            networkStore.setNetwork(parseInt(newNetwork.chainId));
        }
    });
    window.ethereum.on('accountsChanged', (accounts) => {
        let account = useAccountStore();
        account.setAddress(accounts[0]);
    });
    app.config.globalProperties.$web3 = web3;
};

export { web3 };