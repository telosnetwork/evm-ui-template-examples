import { defineStore } from 'pinia';
import { web3 } from 'boot/web3';

export const useNetworkStore = defineStore('network', {
    state: () => ({
        chainId: web3.initial_network,
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
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{
                    chainId: "0x" + parseInt(process.env.NETWORK_EVM_CHAIN_ID).toString(16),
                    rpcUrls: [process.env.NETWORK_EVM_RPC],
                    chainName: process.env.NETWORK_EVM_CHAIN_NAME,
                    nativeCurrency: {
                        name: "TLOS",
                        symbol: "TLOS",
                        decimals: 18
                    },
                    blockExplorerUrls: [process.env.NETWORK_EVM_EXPLORER]
                }]
            });
        },
    }
})
