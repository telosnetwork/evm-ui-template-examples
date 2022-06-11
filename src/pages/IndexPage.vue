<template>
  <q-page class="container flex flex-center">
    <div class="flex flex-center">
      <img
              alt="Telos Logo"
              src="~assets/logo.png"
              style="width: 300px;"
      >
      <div  class="description">
        <p>
          This is an implementation of <a href="https://github.com/telosnetwork/evm-ui-template" target="_blank">our EVM UI template on Github</a>, a starting point for your app that saves you the time of writing all the boilerplate code.
          It uses <b>Quasar & Vue</b> as well as <b>etherJS</b>.
          You can test it using the Login button and navigating to the Wallet Page (query balances, send transfers) & NFT Gallery (query metadata).
        </p>
        <div class="q-gutter-md">
          <q-btn href="https://github.com/telosnetwork/evm-ui-template/generate"  color="primary" label="Use our UI Template" icon="settings_suggest" />
          <q-btn href="https://github.com/telosnetwork/erc20-template/generate"  color="primary" label="Use our ERC20 Template" icon="settings_suggest" />
          <q-btn href="https://www.telos.net" target="_blank" color="secondary" label="Visit telos.net" icon="visibility" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
  .description
    max-width: 800px
    margin-left: 50px
    font-weight: normal
</style>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
