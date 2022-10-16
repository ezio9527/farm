import HomeView from '@/views/home/IndexView'

export default {
  // 首页
  path: '/',
  name: 'home',
  component: HomeView,
  props: true,
  meta: {
    requireAuth: false
  }
}
