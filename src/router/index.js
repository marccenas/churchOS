import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { 
    path: '/', 
    redirect: '/login' 
  },
  { 
    path: '/login', 
    component: () => import('../views/Login.vue') 
  },
  { 
    path: '/dashboard', 
    component: () => import('../views/Dashboard.vue') 
  },
  { 
    path: '/inventory', 
    component: () => import('../views/Inventory.vue') 
  },
  { 
    path: '/members', 
    component: () => import('../views/Members.vue') 
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})