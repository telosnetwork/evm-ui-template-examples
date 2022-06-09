<template>
    <q-page class="full-width">
        <div class="container">
            <h2 class="text-h2 text-bold flex"> Wallet</h2>
            <LoginRequired v-if="!account.isAuthenticated" loginLabel="Login to see your wallet" />
            <div v-else>
                <Balances />
                <Transfers />
            </div>
        </div>
    </q-page>
</template>

<script>
    import { defineComponent } from 'vue'
    import { useAccountStore } from 'stores/account';
    import LoginRequired from "components/Login/LoginRequired.vue";
    import Balances from "components/Wallet/Balances.vue";
    import Transfers from "components/Wallet/Transfers.vue";

    const account = useAccountStore();

    export default defineComponent({
        name: 'Wallet',
        components: {
            LoginRequired,  Balances, Transfers
        },
        setup(){
            return {
                account: account,
            }
        },
    })
</script>
