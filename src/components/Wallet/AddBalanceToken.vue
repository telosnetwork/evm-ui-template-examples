<template>
    <div id="addToken" class="flex full-width mt40">
        <b>ADD A TOKEN</b>
        <q-input :rules="[ val => /^0x[a-fA-F0-9]{40}$/.test(val) || 'Token must be an ERC20 address' ]" filled bottom-slots :error="(error !== false)" :error-message="error" v-model="token" label="Token" class=" full-width" dense="dense">
            <template v-slot:hint>
                Add a Telos EVM Testnet Network token's address
            </template>
            <template v-slot:append>
                <q-btn round dense flat icon="add" @click="addToken(token)" />
            </template>
            <template v-slot:error>
                {{ error }}
            </template>
        </q-input>
    </div>
</template>

<script>
    import { useBalanceStore } from 'stores/balance';

    const balanceStore = useBalanceStore();

    export default {
        data () {
            return {
                error: false,
                token: '',
            }
        },
        methods: {
            async addToken(token){
                this.error = await balanceStore.addToken(token, this.$q.cookies);
                if(this.error === false){
                    this.token = '';
                }
            },
        }
    }
</script>