<template>
<div class="wrapper">我是about页面

  <div id="mount-point">
    在这里
  </div>
</div>
</template>

<script>
import Profile from '../assets/extend.js'
export default {
  components: {
  },
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  created () {
    
     
  },
  mounted () {
    console.log(new Profile())
    new Profile({ propsData: {
      todoData: [
          { id: 0, text: '蔬菜' },
          { id: 1, text: '奶酪' },
          { id: 2, text: '随便其它什么人吃的东西' }
      ]
  }}).$mount('#mount-point')
  },
  watch: {},
  methods: {}
}
</script>
<style lang="less" scoped>
</style>