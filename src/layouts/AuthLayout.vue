<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-green-9 text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="~assets/jonhDeere.jpg">
          </q-avatar>
          ETBSA
        </q-toolbar-title>

        <q-btn
          flat
          label="login"
          icon="people"
          to="/auth/login"
        />

      </q-toolbar>

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

</template>
