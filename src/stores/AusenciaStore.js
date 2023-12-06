import { api } from '../boot/axios'
import { defineStore } from 'pinia'

export const useAusenciaStore = defineStore('ausencia', {
  state: () => ({ authToken: null }),

  getters: {
    token: (state) => state.authToken
  },

  actions: {
    async cargarAusencias (token, solicitante) {
      try {
        const response = await api.get('/ausencias/' + solicitante, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        return response.data
      } catch (error) {
        console.error('Error al obtener datos de la API:', error)
      }
    },

    async agregarNuevaAusencia (token, nuevaAusencia) {
      try {
        console.log('Datos de nueva ausencia:', nuevaAusencia)
        const response = await api.post('/ausencia', nuevaAusencia, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        console.log('Respuesta de la API:', response.data)
        this.router.push({ path: '/ausencias', replace: true })
      } catch (error) {
        console.error('Error al agregar nueva ausencia:', error)
      }
    }
  }
})
