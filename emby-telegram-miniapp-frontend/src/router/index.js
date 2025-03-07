import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Profile from '@/views/Profile.vue';
import SimilarLayout from '@/views/SimilarLayout.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/profile', component: Profile },
  { path: '/similar', component: SimilarLayout },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
