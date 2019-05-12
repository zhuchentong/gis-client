import CheckPanel from './menu-panel/check-panel.vue'
import ComputePanel from './menu-panel/compute-panel.vue'
import LayerControlPanel from './menu-panel/layer-control-panel.vue'
import LayerListPanel from './menu-panel/layer-list-panel.vue'
import MeasurePanel from './menu-panel/measure-panel.vue'
import ProjectPanel from './menu-panel/project-panel.vue'
import SearchPanel from './menu-panel/search-panel.vue'
import SitePanel from './menu-panel/site-panel.vue'
import TaskPanel from './menu-panel/task-panel.vue'
import ViewerPanel from './menu-panel/viewer-panel.vue'

/**
 * 左侧菜单列表
 */
export const MenuList = [
  {
    key: 'layer-list-panel',
    label: '图层目录',
    icon: 'layer-list'
  },
  {
    key: 'layer-control-panel',
    label: '图层控制',
    icon: 'layer-control'
  },
  {
    key: 'measure-panel',
    label: '测量',
    icon: 'measure'
  },
  {
    key: 'search-panel',
    label: '检索',
    icon: 'search'
  },
  {
    key: 'check-panel',
    label: '检测',
    icon: 'check'
  },
  {
    key: 'viewer-panel',
    label: '视角',
    icon: 'viewer'
  },
  {
    key: 'compute-panel',
    label: '计算',
    icon: 'compute'
  },
  {
    compentName: 'site-panel',
    label: '隐患点',
    icon: 'site'
  },
  {
    key: 'project-panel',
    label: '项目',
    icon: 'project'
  },
  {
    key: 'task-panel',
    label: '外业',
    icon: 'task'
  }
]

/**
 * 需要用到的组件
 */
export const PanelComponents = {
  CheckPanel,
  ComputePanel,
  LayerControlPanel,
  LayerListPanel,
  MeasurePanel,
  ProjectPanel,
  SearchPanel,
  SitePanel,
  TaskPanel,
  ViewerPanel
}
