import { createRouter, createWebHistory } from 'vue-router';
// import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachRegister from './pages/coaches/CoachRegister.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestReceived from './pages/requests/RequestReceived.vue';
import UserAuth from './pages/auth/UserAuth.vue'
import NotFound from './pages/NotFound.vue';
import store from './store/index.js'

const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');
const CoachRegister = () => import('./pages/coaches/CoachRegister.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');
const RequestReceived = () => import('./pages/requests/RequestReceived.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      props: true,
      component: CoachDetail,
      children: [{ path: 'contact', component: ContactCoach }],
    },
    { path: '/register', component: CoachRegister, meta: {requiresAuth: true} },
    { path: '/requests', component: RequestReceived, meta: {requiresAuth: true} },
    { path: '/auth', component: UserAuth, meta: {requiresUnauth: true}},
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach((to, _, next)=>{
  if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  }else if(to.meta.requiresUnauth && store.getters.isAuthenticated){
    next('/coaches');
  }else{
    next();
  }
})
export default router;
