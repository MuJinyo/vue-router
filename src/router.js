import kkbRouter from './KRouter'
import Vue from 'vue'
Vue.use(kkbRouter) //实际上是执行kkbRouter这个模块的install方法。并且吧vue传递进去
export default new kkbRouter({
    routes: [
        {
            path: '/',
            component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
            beforeEnter: (to, from) => {
                console.log('beforeEnter---', to, from)
            }
        },
        {
            path: '/about',
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
    ]
})