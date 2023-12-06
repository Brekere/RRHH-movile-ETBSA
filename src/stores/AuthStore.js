import { api } from '../boot/axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ authUser: null, authToken: null }),

  getters: {
    user: (state) => state.authUser,
    token: (state) => state.authToken
  },

  actions: {
    async Login ({ email, password }) {
      try {
        const request = await api.post('/user/login', { email, password })
        const userID = request.data.data.empleado.id
        const userToken = request.data.token
        localStorage.setItem('token', userToken)
        localStorage.setItem('userID', userID)
        this.router.push({ path: '/', replace: true })
      } catch (error) {
        console.error('Error en el login:', error)
      }
    },

    Logout () {
      localStorage.clear()
      this.router.push({ path: '/auth/login', replace: true })
    }
  }
})
