import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/Login'

/*const Home = () => import('@/view/Home')
const Result = () => import('@/view/Result')*/

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Login',
        component: Login
    }]
})