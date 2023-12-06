<template>
    <div>
      <div v-for="(ausencia, index) in ausenciaDetalle" :key="ausencia.id">
        <div class="q-flex q-items-center q-justify-center q-pa-sm">
          <q-card :class="getCardClass(ausencia.status_id.id)" flat bordered>
            <q-card-section>
              <div class="text-overline text-brow-9">Ausencia numero: {{ausencia.id}}</div>
              <div class="text-h6">Fecha de Inicio: {{ empleado.formatfecha(ausencia.fecha_de_inicio) }}</div>
              <div class="text-h6">Fecha de Regreso: {{ empleado.formatfecha(ausencia.fecha_de_regreso) }}</div>
            </q-card-section>
            <q-card-actions>
              <q-btn
                color="brow"
                round
                flat
                dense
                :icon="expanded[index] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                @click="toggleExpanded(index)"
              />
            </q-card-actions>
            <q-slide-transition>
              <div v-show="expanded[index]">
                <q-separator />

                <q-card-section class="text-subtitle2">
                  Creacion: {{ empleado.formatfecha(ausencia.created_at) }}
                </q-card-section>

                <q-card-section class="text-subtitle2">
                  Solicita: {{ ausencia.solicitante.nombre }}
                </q-card-section>

                <q-card-section class="text-subtitle2">
                  Cubre: {{ ausencia.quien_cubre.nombre }}
                </q-card-section>

                <q-card-section class="text-subtitle2">
                  Dias a tomar: {{ ausencia.dias_disfrute }}
                </q-card-section>

                <q-card-section class="text-subtitle2">
                  Status: {{ ausencia.status_id.nombre }}
                </q-card-section>

              </div>
            </q-slide-transition>
          </q-card>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { useAusenciaStore } from 'src/stores/AusenciaStore'
import { useEmpleadoStore } from '../stores/EmpleadoStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const empleado = useEmpleadoStore()
const ausencia = useAusenciaStore()
const router = useRouter()
const ausenciaDetalle = ref(null)
const expanded = ref([])

const toggleExpanded = (index) => {
  expanded.value[index] = !expanded.value[index]
}

const getCardClass = (statusId) => {
  switch (statusId) {
    case 1:
      return 'bg-yellow-5'
    case 2:
      return 'bg-blue-5'
    default:
      return 'bg-red-5'
  }
}

onMounted(async () => {
  const userID = empleado.obtenerUserID()
  const token = empleado.obtenerToken()

  if (token) {
    try {
      const data = await ausencia.cargarAusencias(token, userID)
      ausenciaDetalle.value = data
      console.log(ausenciaDetalle.value)
    } catch (error) {
      console.error('Error al cargar empleado:', error)
    }
  } else {
    router.push({ path: 'auth/login', replace: true })
  }
})

</script>
