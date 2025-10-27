import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', redirect: '/shipments' },
  { path: '/shipments', name:'shipments', component: () => import("@/pages/ShipmentsList.vue"), },
  { path: '/shipments/:id', name: 'shipment.detail', component: () => import("@/pages/ShipmentDetails.vue"), },
  { path: '/recount/:id', name: 'recount.detail', component: () => import("@/pages/Recount.vue"), },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import("@/pages/NotFound.vue") },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})