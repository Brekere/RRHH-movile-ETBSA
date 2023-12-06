import { api } from '../boot/axios'
import { defineStore } from 'pinia'

export const useEmpleadoStore = defineStore('empleado', {
  state: () => ({ authToken: null }),

  getters: {
    token: (state) => state.authToken
  },

  actions: {
    obtenerToken () {
      const token = localStorage.getItem('token')
      return token
    },

    obtenerUserID () {
      const userID = localStorage.getItem('userID')
      return userID
    },

    formatfecha (fecha) {
      // Crear un objeto de fecha
      const dateObject = new Date(fecha)

      // Obtener los componentes de la fecha
      const year = dateObject.getFullYear()
      const month = String(dateObject.getMonth() + 1).padStart(2, '0')
      const day = String(dateObject.getDate()).padStart(2, '0')

      // Formatear la fecha como "aaaa/mm/dd"
      const formattedFecha = `${day}-${month}-${year}`

      return formattedFecha
    },

    async cargarEmpleado (userID, token) {
      try {
        const response = await api.get('/empleado/' + userID, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        return response.data // Devolver los datos en lugar de asignar a empleado.value
      } catch (error) {
        console.error('Error al obtener datos de la API:', error)
        throw error // Lanzar el error para que se maneje en el componente
      }
    },

    async cargarEmpleados (token) {
      try {
        const response = await api.get('/empleado/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        return response.data // Devolver los datos en lugar de asignar a empleado.value
      } catch (error) {
        console.error('Error al obtener datos de la API:', error)
        throw error // Lanzar el error para que se maneje en el componente
      }
    }
  }
})
