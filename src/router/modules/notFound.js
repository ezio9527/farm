import HomeView from '@/views/home/IndexView'

export default {
  // 404
  path: '/:pathMatch(.*)*',
  name: 'home',
  component: HomeView,
  meta: {
    requireAuth: true
  }
}
