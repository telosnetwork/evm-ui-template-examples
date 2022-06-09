import { defineStore } from 'pinia';
import { web3 } from 'boot/web3';
import { slimERC20 } from '../abi/slimERC20';
import { ethers } from "ethers";

export const useTransferStore = defineStore('transfer', {
    state: () => ({
        transfers: [],
    }),

    getters: {
        getTransfers: () => (state) => state.transfers,
    },

    actions: {
        getTransfersByAccount(account){
            let transfers = [];
            this.transfers.forEach(transfer => {
                if(transfer.from === account.address.toLowerCase() || transfer.to === account.address.toLowerCase()){
                    transfers.push(transfer);
                }
            })
            return transfers;
        },
        setDone(transfer){
            this.transfers.forEach(sTransfer => {
                if(sTransfer.hash === transfer.hash){
                    sTransfer.done = true;
                }
            })
        },
        clear(){
            this.transfers = [];
        },
        addTransfer(transfer){
            let found = false;
            this.transfers.forEach(sTransfer => {
                if(sTransfer.hash === transfer.hash){
                    found = true;
                }
            })
            if(found) return transfer;
            this.transfers.push(transfer);
            if(this.transfers.length > 100){
                this.transfers.shift();
            }
            return transfer;
        }
    }
})
