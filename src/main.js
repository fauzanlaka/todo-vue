import Vue from 'vue'
//import App from './App.vue'
import Master from './components/layouts/Master.vue'
// import router from './router'
window.fire = new Vue();
import VueRouter from 'vue-router'
import routes from './routes'
import store from './store'
import VeeValidate from 'vee-validate';
import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
// import VueSweetalert2 from 'vue-sweetalert2'
// import 'sweetalert2/dist/sweetalert2.min.css'

// Vue.use(VueSweetalert2);

export const eventBus = new Vue();

Vue.config.productionTip = false;
Vue.use(VueRouter)
Vue.use(VeeValidate);
const toastrConfigs = {
  position: 'top right',
  showDuration: 2000,
  timeOut: 4000,
  progressBar: true
}
Vue.use(CxltToastr, toastrConfigs)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(!store.getters.logedIn){
      next({
        name: 'login',
      })
    } else {
      next()
    }
  }else if(to.matched.some(record => record.meta.requiresVisitor)) {
    if(store.getters.logedIn){
      next({
        name: 'todo',
      })
    }else{
        next()
    }
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(Master)
}).$mount('#app')
