<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          size="xl"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
            <a href="/"><img src="~assets/logo-white.png" class="logo" /></a>
        </q-toolbar-title>

        <div id="login-box"><login-button label="Login"></login-button></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >

      <q-list>
        <q-item-label
           header
        >
          Example pages
        </q-item-label>

        <PageLink
                v-for="page in examplePages"
                :key="page.title"
                v-bind="page"
        />
      </q-list>
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import PageLink from "components/PageLink.vue";
import LoginButton from "components/Login/LoginButton.vue";

const examplePagesList = [
  {
    title: 'EVM Wallet',
    caption: 'Consult & send your fungible tokens',
    icon: 'wallet',
    path: "/wallet"
  },
    {
        title: 'NFT Gallery',
        caption: 'Our favorite testnet NFTs',
        icon: 'image',
        path: "/nfts"
    },
]
const linksList = [
    {
        title: 'Telos Website',
        caption: 'Get to know Telos !',
        icon: 'star',
        link: 'https://telos.net'
    },
    {
        title: 'Telos Docs',
        caption: 'Developer documentation',
        icon: 'school',
        link: 'https://telos.net/docs'
    },
  {
    title: 'Telos Github',
    caption: 'github.com/telosnetwork',
    icon: 'code',
    link: 'https://github.com/telosnetwork'
  },
  {
    title: 'Developer Telegram',
    caption: 'Come chat with us',
    icon: 'chat',
    link: 'https://t.me/TelosEVMDevs'
  },
  {
    title: 'Twitter',
    caption: '@HelloTelos',
    icon: 'public',
    link: 'https://twitter.com/HelloTelos'
  },
    {
        title: 'Quasar Docs',
        caption: 'quasar.dev',
        icon: 'add',
        link: 'https://quasar.dev'
    },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink, PageLink, LoginButton
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      examplePages: examplePagesList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
