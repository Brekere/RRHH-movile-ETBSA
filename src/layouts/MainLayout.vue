<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-green-9 text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
    <q-btn
      flat
      dense
      to= "/"
    >
      <q-avatar>
        <img src="~assets/jonhDeere.jpg">
      </q-avatar>
    </q-btn>
    ETBSA
  </q-toolbar-title>

        <q-btn
          flat
          label="logout"
          icon="delete"
          @click = "auth.Logout()"
        />

      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/perfil" label="Perfil" />
        <q-route-tab to="/nueva" label="Solicitud" />
        <q-route-tab to="/ausencias" label="Consulta" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

</template>

<script setup>
import { useAuthStore } from '../stores/AuthStore'

const auth = useAuthStore()
</script>
