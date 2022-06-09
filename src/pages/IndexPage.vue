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
          Use this <a href="https://github.com/telosnetwork/evm-ui-template" target="_blank">template on Github</a> as a starting point for your app and save the time of writing all the boilerplate code.
          It uses <b>Quasar & Vue</b> and has an implementation <b>etherJS</b>.
          You can test it with the Login button and get inspiration using the examples in the side menu like our Wallet Page (query balances, send transfers) & NFT Gallery (query metadata).
        </p>
        <div class="q-gutter-md">

          <q-btn href="https://github.com/telosnetwork/evm-ui-template/generate"  color="primary" label="Use this template" icon="settings_suggest" />
          <q-btn href="https://github.com/telosnetwork/erc20-template/generate"  color="positive" label="Use our ERC20 template" icon="settings_suggest" />
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
