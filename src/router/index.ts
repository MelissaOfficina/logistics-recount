import { createWebHistory, createRouter } from 'vue-router'

import Shipments from "@/pages/shipments/index.vue"
import About from "@/pages/about/index.vue"

const routes = [
  { path: '/', redirect: '/shipments' },
  { path: '/shipments', component: Shipments, },
  { path: '/about', component: About, },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})