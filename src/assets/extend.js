import Vue from 'vue'
var Profile =  Vue.extend({
    render(h) {
        // h = createElement
        return h('span', {
            attrs:{
                href: "#",
                name: 'en'
            }
        }, ['开玩笑'])
        // }, [this.$slots.default, 'ss'])
    },
  data: function () {
    return {
        todoData: [
          { id: 0, text: '蔬菜' },
          { id: 1, text: '奶酪' },
          { id: 2, text: '随便其它什么人吃的东西' }
        ]
    }
  }
})
// var Profile = Vue.component('mujin',{ 
//     render(h) {
//         // h = createElement
//         return h('a', {
//             attrs:{
//                 href: "#" + this.to
//             }
//         }, ['木瑾'])
//         // }, [this.$slots.default, 'ss'])
//     }
// })
export default Profile
// new Profile().$mount('#mount-point')