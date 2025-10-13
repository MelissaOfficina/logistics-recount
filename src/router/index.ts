import { createWebHistory, createRouter } from 'vue-router'

import ShipmentsList from "@/pages/ShipmentsList.vue"

const routes = [
    { path: '/', redirect: '/shipments' },
    { path: '/shipments', name:'shipments', component: ShipmentsList, },
    { path: '/shipments/:id', name: 'shipment.detail', component: () => import("@/pages/ShipmentDetails.vue"), },
    { path: '/recount/:id', name: 'recount.detail', component: () => import("@/pages/Recount.vue"), },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})