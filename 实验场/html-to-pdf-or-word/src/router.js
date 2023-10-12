import Vue from 'vue'
import Router from 'vue-router'
import toPDF from './views/toPDF.vue'
import wordTemplate from './views/wordTemplate.vue'
import toWord from './views/toWord.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', //转pdf示例
      name: 'toPDF',
      component: toPDF
    },,
    {
      path: '/toWord',//转word示例
      name: 'toWord',
      component: toWord
    },
    {
      path: '/wordTemplate',//word模板示例
      name: 'wordTemplate',
      component: wordTemplate
    }
  ]
})
