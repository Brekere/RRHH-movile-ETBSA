<template>
<div>
  <q-form @submit.prevent="AusenciaStore.agregarNuevaAusencia(token, formAusencia)">

    <div style="display: flex; align-items: center; justify-content: center; margin: 20px;">
        <div>
          <q-date v-model="fechas" range minimal @update:model-value="(value, reason, details)=>{detalle(value,reason,details)}"/>
        </div>
      </div>

    <div class="q-flex q-items-center q-justify-center q-pa-sm">
      <q-select
      @update:model-value="obtenerQuienCubre"
      v-model="quienCubre"
      label="Quien te va a cubrir"
      outlined
      :options="opcionesQuienCubre"
      option-value="id"
      option-label="nombre"
      />
    </div>

    <div class="q-flex q-items-center q-justify-center q-pa-sm">
        <q-list bordered separator>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label caption>Fecha de inicio</q-item-label>
              <q-item-label>{{ formAusencia.fecha_de_inicio }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="q-flex q-items-center q-justify-center q-pa-sm">
        <q-list bordered separator>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label caption>Fecha de termino</q-item-label>
              <q-item-label>{{ formAusencia.fecha_de_termino }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="q-flex q-items-center q-justify-center q-pa-sm">
        <q-list bordered separator>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label caption>Fecha de regreso</q-item-label>
              <q-item-label>{{ formAusencia.fecha_de_regreso }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="q-flex q-items-center q-justify-center q-pa-sm">
        <q-list bordered separator>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label caption>Dias disfrute</q-item-label>
              <q-item-label>{{ formAusencia.dias_disfrute }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

    <q-btn color="primary" type="submit" class="q-ma-md">Agregar Ausencia</q-btn>
  </q-form>
</div>
</template>

<script setup>
import { useEmpleadoStore } from '../stores/EmpleadoStore'
import { useAusenciaStore } from '../stores/AusenciaStore'
import { onMounted, ref } from 'vue'
import { date } from 'quasar'

const AusenciaStore = useAusenciaStore()
const EmpleadoStore = useEmpleadoStore()
const token = EmpleadoStore.obtenerToken()
const userID = EmpleadoStore.obtenerUserID()
const opcionesQuienCubre = ref(null)
const quienCubre = ref('')
const fechas = ref('')

const formAusencia = ref({
  fecha_de_inicio: '',
  fecha_de_termino: '',
  fecha_de_regreso: '',
  dias_disfrute: '',
  solicitante: '',
  quien_cubre: '',
  status_id: 1,
  motivo_id: 1,
  feriado_id: 1
})

const obtenerQuienCubre = (newValue) => {
  console.log(newValue.id)
  quienCubre.value = newValue
  formAusencia.value.quien_cubre = newValue.id
}

const detalle = (value, reason, details) => {
  formAusencia.value.fecha_de_inicio = fechas.value.from ? fechas.value.from : fechas.value
  formAusencia.value.fecha_de_termino = fechas.value.to ? fechas.value.to : fechas.value
  formAusencia.value.fecha_de_regreso = date.formatDate(date.addToDate(formAusencia.value.fecha_de_termino, { days: 1 }), 'YYYY/MM/DD')
  formAusencia.value.dias_disfrute = date.getDateDiff(formAusencia.value.fecha_de_termino, formAusencia.value.fecha_de_inicio, 'days') + 1
}

onMounted(async () => {
  const data = await EmpleadoStore.cargarEmpleados(token)
  const empleado = await EmpleadoStore.cargarEmpleado(userID, token)
  opcionesQuienCubre.value = data
  formAusencia.value.solicitante = empleado.id
})
</script>
