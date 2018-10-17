import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import personal from '../components/personal'
import articleDetails from '../components/articleDetails'
import publishArticle from '../components/publishArticle'
import controlArticle from '../components/controlArticle'
import controlUser from '../components/controlUser'
import controlComment from '../components/controlComment'

//muse-ui
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
Vue.use(MuseUI);

//赖加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

//Axios
import Axios from 'axios'
Vue.prototype.$ajax = Axios
Axios.defaults.withCredentials = true //重点！！!不然请求无法带cookies
// Axios.defaults.baseURL='http://106.14.145.207:8000/'
Axios.defaults.baseURL = 'http://localhost:8000/'
Vue.prototype.dataURL = (title, id) => {
  if (!id) {
    id = ""
  }
  return '?' + title + '=' + id
};

//头部
import hdNav from '../components/hdNav'
Vue.component('hdNav', hdNav)

//底部
import ftNav from '../components/ftNav'
Vue.component('ftNav', ftNav)

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },
    {
      path: '/articleDetails',
      name: 'articleDetails',
      component: articleDetails
    },
    {
      path: '/publishArticle',
      name: 'publishArticle',
      component: publishArticle
    },
    {
      path: '/personal/controlArticle',
      name: 'controlArticle',
      component: controlArticle
    },
    {
      path: '/personal/controlUser',
      name: 'controlUser',
      component: controlUser
    },
    {
      path: '/personal/controlComment',
      name: 'controlComment',
      component: controlComment
    }
  ]
})
