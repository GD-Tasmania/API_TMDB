<template>
  <q-layout view="hHh LpR fFf" class="text-white"> <!-- 🔹 Usa 'lFf' en lugar de 'lLf' -->
    <q-header elevated class="q-py-md bg-primary">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" class="q-ml-md" />
        <q-toolbar-title class="text-h4 text-weight letter-spacing-wide font-serif q-ml-md">API TMDB</q-toolbar-title>
          <q-item class="col-1 q-mr-md" clickable to="/" style="width: 80px;">
            <q-img
              src="/image/logoApi.webp"
              :ratio="1"
              style="width: 100%; border-radius: 8px;"
            />
          </q-item>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="180"
      :breakpoint="375"
      bordered
      class="bg-black"
    >
      <q-list>
        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-item clickable :active="menuItem.label === pageSelect" v-ripple :to="menuItem.to" class="navbar-drawer">
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </template>
      </q-list>
    </q-drawer>

    <q-page-container class="fondo-textura">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(false)
const pageSelect = ref('Inbox')
const menuList = [
  {
    icon: 'inbox',
    label: 'Inicio',
    separator: true,
    to: '/',
  },
  {
    icon: 'movie',
    label: 'Peliculas',
    separator: false,
    to: '/peliculas',
  },
  {
    icon: 'tv',
    label: 'Series',
    separator: false,
    to: '/series',
  },
  {
    icon: 'theaters',
    label: 'Cartelera',
    separator: false,
    to: '/cartelera',
  },
  {
    icon: 'event',
    label: 'Proximos estrenos',
    separator: false,
    to: '/estrenos',
  },
]
</script>

<style scoped lang="scss">

::v-deep(.navbar-drawer) {
  border: double 3px $primary;
  margin-top: 5px;
}
::v-deep(.fondo-textura){
  background: url("/image/fondoApi.webp") no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
}

</style>