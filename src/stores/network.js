import { defineStore } from 'pinia';
import { web3 } from 'boot/web3';

export const useNetworkStore = defineStore('network', {
    state: () => ({
        chainId: web3.network,
        loading: false,
    }),

    getters: {
        getChainId(state) { state.chainId },
    },

    actions: {
        setNetwork(network){
            this.chainId = network;
        },
        isExpectedNetwork() { return this.chainId === parseInt(process.env.NETWORK_EVM_CHAIN_ID)},
        async switchNetwork(){
            this.loading = true;
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{
                    chainId: "0x" + parseInt(process.env.NETWORK_EVM_CHAIN_ID).toString(16),
                    rpcUrls: [process.env.NETWORK_EVM_RPC],
                    chainName: process.env.NETWORK_EVM_CHAIN_NAME,
                    nativeCurrency: {
                        name: process.env.NETWORK_BASE_CURRENCY_NAME,
                        symbol: process.env.NETWORK_BASE_CURRENCY_SYMBOL,
                        decimals: parseInt(process.env.NETWORK_BASE_CURRENCY_DECIMALS)
                    },
                    blockExplorerUrls: [process.env.NETWORK_EVM_EXPLORER]
                }]
            });
            this.loading = false;
        },
    }
})
