<template>
    <div>
        <div v-if="!account.isAuthenticated">
            <q-btn
                    @click="showLogin = true"
                    color="positive"
                    text-color="white"
                    :label="label"
            />
        </div>
        <div v-if="account.isAuthenticated " class="flex centered">
            <q-spinner
                    v-if="account.loading === true"
                    color="white"
                    size="1em"
            />
            <div v-if="network.isExpectedNetwork()">
                <div @click="goToAccountPage" class="account-name q-px-md">
                    {{ account.truncatedAddress }}
                </div>
            </div>
            <q-btn v-else @click="network.switchNetwork" color="black" clickable>
                <div class="flex q-gutter-sm">
                <q-icon  size="1.5em" name="swap_horizontal_circle" />
                <div>Change network</div>
                </div>
            </q-btn>
            <q-btn
                    @click="onLogout"
                    class="loginButton"
                    color="negative"
                    text-color="white"
                    label="Logout"
            />
        </div>
        <q-dialog v-model="showLogin">
            <q-list>
                <q-item class="bg-white">
                    <q-item-section class="cursor-pointer" avatar @click="onLogin">
                        <img src="~assets/metamask.png" width="30" />
                    </q-item-section>
                    <q-item-section class="cursor-pointer" @click="onLogin">
                        Metamask
                    </q-item-section>
                    <q-item-section class="flex" avatar>
                        <q-spinner
                                v-if="account.loading === true"
                                color="black"
                                size="2em"
                        />
                        <q-btn
                                v-else
                                color="black"
                                icon="get_app"
                                @click="openUrl('https://www.metamask.io/download')"
                                target="_blank"
                                dense
                                flat
                                size="12px"
                        >
                            <q-tooltip>
                                Get app
                            </q-tooltip>
                        </q-btn>
                    </q-item-section>
                </q-item>
                <q-item
                        v-if="error"
                        :active="!!error"
                        active-class="bg-red-1 text-grey-8"
                >
                    <q-item-section>
                        {{ error }}
                    </q-item-section>
                </q-item>
            </q-list>
        </q-dialog>
    </div>
</template>

<script>
    import { useNetworkStore } from 'stores/network';
    import { useAccountStore } from 'stores/account';
    let network = useNetworkStore();
    const account = useAccountStore();
    export default {
        props: {
            label: {
                type: String,
                required: true
            }
        },
        setup () {
            return {
                account: account,
                network: network
            }
        },
        data(){
            return {
                showLogin: false, error: null
            }
        },
        computed: {

        },
        methods: {
            openUrl(url) {
                window.open(url);
            },
            async onLogout() {
                this.error = null;
                const error = await account.logout();
            },
            async onLogin() {
                this.error = null;
                const error = await account.login();
                if (!error) {
                    this.showLogin = false;
                } else {
                    this.error = error;
                }
            },
        },
        async mounted() {
            //await this.autoLogin(this.$route.query.returnUrl);
        }
    };
</script>

