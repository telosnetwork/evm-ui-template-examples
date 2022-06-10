import { ethers } from "ethers";

/** web3
 * @type {{provider: *, signer: *, network: integer }}
 * provider: RPC Provider to query data (no or fast caching)
 * signer: Signer Provider to sign transactions and query data (usually have some caching)
 * network: Current chainId
 */
let web3 = {
    provider: new ethers.providers.JsonRpcProvider(process.env.NETWORK_EVM_RPC),
    signer: new ethers.providers.Web3Provider(window.ethereum, "any"),
    network: 0
};

import { useNetworkStore } from 'stores/network';
import { useAccountStore } from 'stores/account';

export default async ({  app, router, store }) => {
    // STORE INITIAL NETWORK
    let network = await web3.signer.getNetwork();
    web3.network = parseInt(network.chainId);

    // NETWORK LISTENER
    web3.signer.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
            const networkStore = useNetworkStore();
            const chainId = parseInt(newNetwork.chainId);
            networkStore.setNetwork(chainId);
            web3.network = chainId;
        }
    });

    // ACCOUNT LISTENER
    window.ethereum.on('accountsChanged', (accounts) => {
        let account = useAccountStore();
        account.setAddress(accounts[0]);
    });

    // SET WEB3 AS GLOBAL
    app.config.globalProperties.$web3 = web3;
};

export { web3 };