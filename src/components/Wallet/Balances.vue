<template>
    <Suspense>
        <TransferModal v-if="transfer" :token="transfer" :close="transferModalToggle" />
    </Suspense>
    <div id="balances">
        <h4 class="text-h4 text-bold"><q-icon name="money"/> Balances </h4>
        <div class="flex centered"  v-if="balanceStore.balances.length == 0"><q-spinner size="8em" /></div>
        <div class="row full-width" v-else>
            <div class="col">
                <div class="row text-uppercase">
                    <div class="col"><b>Token</b></div>
                    <div class="col"><b>Amount</b></div>
                    <div class="col"><b>Actions</b></div>
                </div>
                <div v-for="balance in balanceStore.balances" class="row">
                    <div class="col">
                        <div class="flex center">
                            <img class="token-logo" :src="'/tokens/' + balance.token.symbol + '.svg'" @error="imagePlaceholder" >
                            {{ balance.token.symbol }}
                        </div>
                    </div>
                    <div class="col">{{ Math.round(balance.amount * 10000) / 10000 }}</div>
                    <div class="col" :key="'send-' + network.chainId">
                        <q-icon :title="'Transfer ' + balance.token.symbol" clickable v-if="network.isExpectedNetwork() && balance.amount > 0" name="logout" @click="transferModalToggle(balance.token)" />
                        <div v-if="!network.isExpectedNetwork()"><q-icon name="warning" /> Change network to send</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AddBalanceToken />
</template>

<script>
    import TransferModal from "components/TransferModal.vue";
    import AddBalanceToken from "components/Wallet/AddBalanceToken.vue";
    import { useAccountStore } from 'stores/account';
    import { useBalanceStore } from 'stores/balance';
    import { useNetworkStore } from 'stores/network';

    const account = useAccountStore();
    const network = useNetworkStore();
    const balanceStore = useBalanceStore();

    export default {
        components: {
            TransferModal, AddBalanceToken
        },
        setup(){
            balanceStore.readBalances(account.address);
            setInterval(function () {
                balanceStore.readBalances(account.address);
            }, process.env.NETWORK_POOL_TIME_MS)
            account.$subscribe((mutation, state) => {
                if(mutation.events.key == "address" || mutation.events.key == "truncatedAddress"){
                    balanceStore.readBalances(account.address);
                }
            })
            return {
                account: account,
                balanceStore: balanceStore,
                network: network,
            }
        },
        data () {
            return {
                transfer: null,
            }
        },
        methods: {
            imagePlaceholder(event) {
                event.target.src = "/tokens/placeholder.png"
            },
            transferModalToggle(token){
                this.transfer = (this.transfer !== null) ? null : token;
            }
        }
    }
</script>