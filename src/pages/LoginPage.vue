<template>
  <q-card class="q-ma-lg">
    <q-form class="q-gutter-sm q-pa-lg" @submit.prevent="auth.Login(form)">
      <div>
        <q-input v-model="form.email" label="Email" type = "email"/>
      </div>
      <div>
        <q-input v-model="form.password" label="Password" type="password"/>
      </div>
      <div>
        <q-btn class="q-mt-lg" label="login" type="submit" :loading = loading />
      </div>
    </q-form>
  </q-card>
</template>

<script setup>
import { useAuthStore } from '../stores/AuthStore'
import { ref } from 'vue'

const auth = useAuthStore()
const form = ref({
  email: '',
  password: ''
})
const loading = ref(false)

</script>
