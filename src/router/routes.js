import IndexPage from '../pages/indexPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import MainLayout from '../layouts/MainLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import PerfilPage from '../pages/PerfilPage.vue'
import AusenciaPage from '../pages/AusenciaPage.vue'
import NuevaAusenciaPage from '../pages/NuevaAusenciaPage.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: IndexPage },
      { path: 'perfil', component: PerfilPage },
      { path: 'ausencias', component: AusenciaPage },
      { path: 'nueva', component: NuevaAusenciaPage }
    ]
  },

  {
    path: '/auth/',
    component: AuthLayout,
    children: [
      { path: 'login', component: LoginPage }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
