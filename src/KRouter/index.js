let Vue 
class KRouter{
    static install (_vue){
        Vue = _vue
        Vue.mixin({
            // 在vue构建之前。beforeCreate之前做什么事情
            beforeCreate() {
                // Vue.prototype.$kkbroute = 'hello 小老弟'
                // 启动整个路由
                // $options这是绑定在this之上的，跟vue源码相关
                if(this.$options.router){
                    this.$options.router.init()
                    Vue.prototype.$kkbroute = this.$options.router
                    // 吧整个route挂载在vue的原型上，在每个地方都能使用到
                }
            },
        })
    }
    constructor(option){
        console.log(option)  // option接收的是route路由
        // 使用vue的响应式机制 。进行路由切换的时候，做响应
        this.routeMap = {}
        this.$options = option
        console.log('this.$options', this.$options)
        this.app = new Vue({
            data: {
                current: '/'
            }
        })

    }
    //  this.$kkbroute.push('/about')的实现
    push (url) {
        window.location.hash = url
    }
    init () {
        // 启动整个路由
        // 由插件use负责启动就可以了

        // 监听hashchange事件
        this.bindEvents()
        // 处理路由表
        this.createRouteMap()
        console.log('this.routeMap', this.routeMap)
        // 初始化组件 view-route 和route-link
        this.initComponent(Vue)
        // 声明周期 ，路由守卫

    }
    getFrom (e) {
        console.log('hash变了-----', e)
        let from, to
        if(e.newURL){
            from = e.oldURL.split('#')[1]
            to = e.newURL.split('#')[1]
        } else {
            from = ''
            to = this.getHash()
        }
        return {from, to}
    }
    bindEvents () {
        window.addEventListener('hashchange', this.onHashChange.bind(this), false)
        window.addEventListener('load', this.onHashChange.bind(this), false)
    }
    onHashChange(e) {
        console.log('hash变了')
        // 路由跳转开始。之前或者之后做点什么？
        // 获取hash值，然后修改this.app.current
        // 在hash变化的时候，会触发hashEvent  e 的事件，可以获取新旧的url
        let hash = this.getHash()
        let router = this.routeMap[hash]
        let {from, to} = this.getFrom(e)
        if(router.beforeEnter) {
            // 
            console.log('hash变了', e)
            router.beforeEnter(from, to,)

        }
        
        return this.app.current = hash
    }
    getHash(){
        return window.location.hash.slice(1) || '/'
    }
    createRouteMap(){
        // 查找机制  将route数组放在routeMap对象里面。
        // 为什么放到对象里面？因为对象容易查找
        this.$options.routes.forEach(item => {
            this.routeMap[item.path] = item 
        });
    }
    initComponent(Vue){
        Vue.component('router-view', {
            // 只渲染正确的模板
            render: h => {
                const component = this.routeMap[this.app.current].component
                return h(component)
            }
        })
        // 做个路由切换。解析成a标签
        Vue.component('router-link', {
            props:{ // 会有个参数校验
                to: String
            },
            render(h) {
                // h = createElement
                return h('a', {
                    attrs:{
                        href: "#" + this.to
                    }
                }, [this.$slots.default])
                // }, [this.$slots.default, 'ss'])
            }
            /*
               具体解释：https://cn.vuejs.org/v2/guide/render-function.html
               h 三个参数 (h相当于createElement)
               1.是一个标签名
               2 对象：一个与模板中 属性 对应的数据对象
               3 子集虚拟节点

               【h作为createElement别名】
                h作为createElement别名，是vue生态系统中的一个通用惯例。实际上也是JSX所要求的。
            */
            // template: "<a :href='to'><slot></slot></a>"
        })
        /*
            路由怎么去做？
                beforeEnter今天路由之前的生命周期
                //  静态类是使用的方式不同
                // 静态类 class xx {
                    static hello () {}
                    hi(){}
                }
                let x = new xx()
                x.hi()

                // static
                xx.hello()

        
        */


    }
}
export default KRouter
/*


*/