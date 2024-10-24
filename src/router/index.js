import { createRouter, createWebHistory } from 'vue-router';
import ListPdf from '../components/ListPdf.vue';
import ViewPdf from '../components/ViewPdf.vue';

const routes = [
  { path: '/', name:'Home',  component: ListPdf },
    {path:'/view/:id', name:'ViewPdf', component:ViewPdf,  props: true,}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
