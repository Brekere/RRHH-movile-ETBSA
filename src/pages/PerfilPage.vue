<template>
    <div class="q-flex q-items-center q-justify-center q-pa-sm">
        <div v-if="empleadoData">
            <q-card class="q-flex q-items-center q-justify-center q-pa-sm">
                <q-item>
                    <q-item-section avatar>
                        <q-avatar>
                            <img src="~assets/user.png">
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>{{ empleadoData.nombre }} {{ empleadoData.apellido_paterno }} {{ empleadoData.apellido_materno }}</q-item-label>
                        <q-item-label caption>{{ empleadoData.sucursal_id.nombre }}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-item-label caption><strong>CURP: </strong>{{ empleadoData.curp }}</q-item-label>
                        <q-item-label caption><strong>RFC: </strong>{{ empleadoData.rfc }}</q-item-label>
                        <q-item-label caption><strong>IMSS: </strong>{{ empleadoData.imss }}</q-item-label>
                        <q-item-label caption><strong>Domicilio: </strong>{{ empleadoData.domicilio }}</q-item-label>
                        <q-item-label caption><strong>Telefono: </strong>{{ empleadoData.telefono }}</q-item-label>
                        <q-item-label caption><strong>Fecha de ingreso: </strong>{{ empleado.formatfecha(empleadoData.fecha_de_ingreso) }}</q-item-label>
                        <q-item-label caption><strong>Email: </strong>{{ empleadoData.user_id.email }}</q-item-label>
                        <q-item-label caption><strong>Linea: </strong>{{ empleadoData.linea_id.nombre }}</q-item-label>
                        <q-item-label caption><strong>Departamento: </strong>{{ empleadoData.departamento_id.nombre }}</q-item-label>
                        <q-item-label caption><strong>Puesto: </strong>{{ empleadoData.cargo_id.nombre }}</q-item-label>
                    </q-item-section>
                </q-item>

            </q-card>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useEmpleadoStore } from '../stores/EmpleadoStore'
import { useRouter } from 'vue-router'

const empleado = useEmpleadoStore()
const router = useRouter()
const empleadoData = ref(null)

onMounted(async () => {
  const userID = empleado.obtenerUserID()
  const token = empleado.obtenerToken()

  if (token) {
    try {
      const data = await empleado.cargarEmpleado(userID, token)
      empleadoData.value = data
    } catch (error) {
      console.error('Error al cargar empleado:', error)
    }
  } else {
    router.push({ path: 'auth/login', replace: true })
  }
})
</script>
