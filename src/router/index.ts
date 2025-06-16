import { createRouter, createWebHistory } from 'vue-router'
import IntroPage from '@/views/IntroPage.vue'
import LogPage from '@/views/LogPage.vue'
import PlanPage from '@/views/PlanPage.vue'
import SettingsPage from '@/views/SettingsPage.vue'


const routes = [
    { path: '/', component: IntroPage },
    { path: '/plan', component: PlanPage },
    { path: '/log', component: LogPage },
    { path: '/settings', component: SettingsPage },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
  
export default router