import AdminView from '@/views/admin/IndexView'

export default {
  // 设置年化率
  path: '/admin/set',
  name: 'admin',
  component: AdminView,
  props: true,
  meta: {
    requireAuth: false
  }
}
