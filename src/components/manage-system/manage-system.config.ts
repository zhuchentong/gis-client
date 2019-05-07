
// 菜单对应的页面组件
import LayerManage from "./pages/layer-manage.vue"
import RoleManage from "./pages/role-manage.vue"
import UserManage from "./pages/user-manage.vue"

export const MenuItems = [
  {
    label: '机构用户',
    name: 'deptUser',
    icon: 'dept',
    component: 'UserManage'
  },
  {
    label: '角色管理',
    name: 'roleManage',
    icon: 'user',
    component: 'RoleManage'
  },
  {
    label: '数据管理',
    name: 'layerManage',
    icon: 'layer',
    component: 'LayerManage'
  }
]


/**
 * 详情用到的组件
 */
export const PageComponents = {
  UserManage,
  RoleManage,
  LayerManage
}