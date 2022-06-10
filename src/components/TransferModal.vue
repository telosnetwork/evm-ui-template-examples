<template>
    <div class="modal-container">
        <div class="modal">
            <h3>{{ token.symbol }} Transfer </h3>
            <div>
                <q-input :rules="[ val => /^0x[a-fA-F0-9]{40}$/.test(val) || 'Receiver must be an ERC address' ]" label="Send to" v-model="receiver" />
                <q-input :rules="[ val => val > 0 || 'Amount must be a positive number', val => val <= balanceStore.getBalance(token) || 'Amount cannot be above max' ]" label="Amount" type="number" v-model.number="amount" />
                <small>MAX: <a clickable @click="this.amount=balanceStore.getBalance(token)">{{ balanceStore.getBalance(token) }}</a></small>
                <div class="mt40 q-gutter-sm">
                    <q-btn :disable="loading" size="16px" :color="loading == false ? 'positive' : 'black'" @click="transfer(token, close)">
                        <div class="flex q-gutter-sm">
                            <q-spinner-hourglass v-if="loading"></q-spinner-hourglass>
                            <q-icon v-if="!loading" name="logout" />
                            <div>Send now</div>
                        </div>
                    </q-btn>
                    <q-btn color="negative" @click="close" size="16px">Cancel</q-btn>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { web3 } from 'boot/web3';
    import { ethers } from 'ethers';
    import { useAccountStore } from 'stores/account';
    import { useTransferStore } from 'stores/transfer';
    import { useBalanceStore } from 'stores/balance';
    import { QSpinnerHourglass, date } from 'quasar';
    import { slimERC20 } from '../abi/slimERC20';

    const account = useAccountStore();
    const balanceStore = useBalanceStore();
    const transferStore = useTransferStore();

    export default {
        name: 'TransferModal',
        props: {
            token: {
                type: Object,
                required: true
            },
            close: {
                type: Function
            }
        },
        async setup(){
          return {
              balanceStore: balanceStore
          }
        },
        data(){
            return {
              loading: false,
              receiver: '',
              amount: 0
            }
        },
        methods: {
            async transfer(token, close){
                if(this.loading === false){
                    this.loading = true;
                    let tx = false;
                    if(token.symbol === process.env.NETWORK_BASE_CURRENCY_SYMBOL.toString()){
                        try {
                            tx = await web3.signer.getSigner().sendTransaction({
                                to: this.receiver,
                                value: ethers.utils.parseEther(this.amount.toString()),
                            });
                        } catch(e) {
                            this.$q.notify({ icon: 'warning', message: e.message, color: 'negative' });
                        }
                    } else {
                        const contract = new ethers.Contract(token.address, slimERC20, web3.signer.getSigner());
                        try {
                            tx = await contract.transfer(this.receiver, ethers.utils.parseEther(this.amount.toString()));
                        } catch(e) {
                            this.$q.notify({ icon: 'warning', message: e.message, color: 'negative' });
                        }
                    }
                    this.loading = false;
                    if(tx.hash){
                        let transfer = transferStore.addTransfer({from: account.address.toLowerCase(), hash: tx.hash, date: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'), to: this.receiver.toLowerCase(), amount: this.amount, token: token })
                        close();
                        this.$q.notify({ spinner: QSpinnerHourglass,  message: 'Transfering...', timeout: 1 })
                        let found = false;
                        let interval = setInterval(async() => {
                            let txReceipt = await web3.provider.getTransactionReceipt(tx.hash);
                            if(txReceipt && txReceipt.blockNumber && found == false){
                                if(token.symbol !== process.env.NETWORK_BASE_CURRENCY_SYMBOL.toString()) {
                                    balanceStore.readBalance(account.address, {symbol: process.env.NETWORK_BASE_CURRENCY_SYMBOL.toString() } );
                                }
                                balanceStore.readBalance(account.address, token);
                                clearInterval(interval);
                                transferStore.setDone(transfer);
                                found = true;
                                this.$q.notify({ icon: 'check', message: 'Your ' + this.amount +' '+ token.symbol +' transfer was successful !', color: 'positive' });
                            }
                        }, 250)
                    }
                }
            }
        }
    }
</script>