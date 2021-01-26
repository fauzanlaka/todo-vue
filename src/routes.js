import App from './App.vue'
import LandingPage from './components/marketing/LandingPage.vue'
import About from './components/marketing/About.vue'
import Register from './components/auth/Register.vue'
import Login from './components/auth/Login.vue'
import Logout from './components/auth/Logout.vue'

const routes = [
    { 
      path: '/', 
      name: 'home',
      component: LandingPage 
    },
    { 
        path: '/app', 
        name: 'app',
        component: App,
        meta: { requiresAuth: true }
    },
    { 
        path: '/todo', 
        name: 'todo',
        component: App,
        meta: { requiresAuth: true }
    },
    { 
        path: '/about', 
        name: 'about',
        component: About 
    },
    { 
        path: '/login', 
        name: 'login',
        component: Login,
        props: true,
        meta: { requiresVisitor: true }
    },
    { 
        path: '/register', 
        name: 'register',
        component: Register,
        meta: { requiresVisitor: true }

    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout
    }
];

export default routes