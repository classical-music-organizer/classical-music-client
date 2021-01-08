import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Composer from '@/views/Composer'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/composer/:id',
    name: 'composer',
    component: Composer // TODO: reroute to composerSlug for readability?
  },
  {
    path: '/composer/:id/:slug',
    name: 'composerSlug',
    component: Composer
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
