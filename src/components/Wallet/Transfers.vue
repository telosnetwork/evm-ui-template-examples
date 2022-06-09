<template>
    <div id="transfer-history" v-if="transferStore.transfers.length !== 0">
        <h4 class="text-h4 text-bold"><q-icon name="history"/> Last transfers</h4>
        <div id="transfers">
            <div class="row full-width">
                <div class="col">
                    <div class="row text-uppercase">
                        <div class="col"></div>
                        <div class="col-2"><b>Date</b></div>
                        <div class="col-3"><b>From</b></div>
                        <div class="col-3"><b>To</b></div>
                        <div class="col"><b>Token</b></div>
                        <div class="col-2"><b>Amount</b></div>
                        <div class="col"><b>Actions</b></div>
                    </div>
                    <div v-for="transfer in transferStore.transfers" class="row">
                        <div class="col" v-if="transfer.to !== account.address.toLowerCase()">
                            <q-icon title="Transfer out" name="arrow_circle_left" color="positive" size="20px" v-if="transfer.done" />
                            <q-spinner-hourglass title="Transfering" size="20px" color="negative" v-else />
                        </div>
                        <div class="col" v-else>
                            <q-icon title="Transfer in" name="arrow_circle_right" color="info" size="20px" v-if="transfer.done" />
                            <q-spinner-hourglass title="Transfering" size="20px" color="negative" v-else />
                        </div>
                        <div class="col-2">
                            {{ transfer.date }}
                        </div>
                        <div class="col-3">{{ transfer.from.slice(0, 12) + '...' }}</div>
                        <div class="col-3">{{ transfer.to.slice(0, 12) + '...' }}</div>
                        <div class="col">{{ transfer.token.symbol }}</div>
                        <div class="col-2">{{ transfer.amount }}</div>
                        <div class="col" :key="'send-' + network.chainId">
                            <a target="_blank" :href="explorer + '/tx/' + transfer.hash"><q-icon title="See transfer on explorer" clickable name="visibility"  /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { useTransferStore } from 'stores/transfer';
    import { useAccountStore } from 'stores/account';
    import { useNetworkStore } from 'stores/network';
    const network = useNetworkStore();

    const account = useAccountStore();
    const transferStore = useTransferStore();

    export default {
        setup(){
            transferStore.getTransfersByAccount(account);
            return {
                network: network,
                transferStore: transferStore,
                account: account,
                explorer: process.env.NETWORK_EVM_EXPLORER,
            }
        }
    }
</script>