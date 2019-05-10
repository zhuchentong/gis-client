
// 菜单对应的页面组件
import LayerManage from "./pages/layer-manage.vue"
import RoleManage from "./pages/role-manage.vue"
import UserManage from "./pages/user-manage.vue"
import LayerThreeDimensionalManage from "./pages/layer-three-dimensional-manage.vue"

export const MenuItems = [
  {
    label: '机构用户',
    name: 'deptUser',
    icon: 'manage-fenzhijigou',
    component: 'UserManage'
  },
  {
    label: '角色管理',
    name: 'roleManage',
    icon: 'manage-jiaoseguanli',
    component: 'RoleManage'
  },
  {
    label: '数据管理',
    name: 'layerManage',
    icon: 'manage-shujuguanli',
    component: 'LayerManage'
  },
  {
    label: '三维数据',
    name: 'layer-three-dimensional-manage',
    icon: 'manage-three-layer',
    component: 'LayerThreeDimensionalManage'
  }
]


/**
 * 详情用到的组件
 */
export const PageComponents = {
  UserManage,
  RoleManage,
  LayerManage,
  LayerThreeDimensionalManage
}