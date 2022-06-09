<template>
    <div class="flex center" id="login-required">
        <q-icon name="warning" size="10em" color="warning" />
        <div>
            <p class="text-h6">Sorry... Looks like you are not logged in !</p>
            <p>Please use the <b>LOGIN</b> button below to login. <br /> If you do not have an address yet, use the <b>CREATE YOUR ADDRESS</b> button to create your first address on Telos EVM.</p>
            <div class="flex center q-gutter-md"><LoginButton  :label="loginLabel" /><div class="text-h6">OR</div><q-btn target="_blank" href="https://www.telos.net/developers/getting-started-on-testnet?utm_source=dapp#account" size="14px" color="primary" icon="add" label="CREATE YOUR ADDRESS" /></div>
        </div>
    </div>
</template>

<script>
    import LoginButton from "components/Login/LoginButton.vue";

    export default {
        components: {
            LoginButton
        },
        props: {
            loginLabel: {
                type: String,
                required: true
            }
        },
    }
</script>