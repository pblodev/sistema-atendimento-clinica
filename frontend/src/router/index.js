import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AgendamentoView from '../views/AgendamentoView.vue'
import AdminView from '../views/AdminView.vue' // Importe aqui

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'login', component: LoginView },
    { path: '/agendar', name: 'agendar', component: AgendamentoView },
    { path: '/admin', name: 'admin', component: AdminView } // Adicione aqui
  ]
})

export default router