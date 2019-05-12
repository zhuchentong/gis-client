import CheckPanel from "./menu-panel/check-panel.vue"
import ComputePanel from "./menu-panel/compute-panel.vue"
import LayerControlPanel from "./menu-panel/layer-control-panel.vue"
import LayerListPanel from "./menu-panel/layer-list-panel.vue"
import MeasurePanel from "./menu-panel/measure-panel.vue"
import ProjectPanel from "./menu-panel/project-panel.vue"
import SearchPanel from "./menu-panel/search-panel.vue"
import SitePanel from "./menu-panel/site-panel.vue"
import TaskPanel from "./menu-panel/task-panel.vue"
import ViewerPanel from "./menu-panel/viewer-panel.vue"

/**
 * 左侧菜单列表
 */
export const MenuList = [
  {
    key: 'layer-list',
    compentName: "layer-list-panel",
    label: '图层目录',
    icon: 'layer-list'
  },
  {
    key: 'layer-control',
    compentName: "layer-control-panel",
    label: '图层控制',
    icon: 'layer-control'
  },
  {
    key: 'measure',
    compentName: "measure-panel",
    label: '测量',
    icon: 'measure'
  },
  {
    key: 'search',
    compentName: "search-panel",
    label: '检索',
    icon: 'search'
  },
  {
    key: 'check',
    compentName: "check-panel",
    label: '检测',
    icon: 'check'
  },
  {
    key: 'viewer',
    compentName: "viewer-panel",
    label: '视角',
    icon: 'viewer',
  },
  {
    key: 'compute',
    compentName: "compute-panel",
    label: '计算',
    icon: 'compute'
  },
  {
    key: 'site',
    compentName: "site-panel",
    label: '隐患点',
    icon: 'site'
  },
  {
    key: 'project',
    compentName: "project-panel",
    label: '项目',
    icon: 'project'
  },
  {
    key: 'task',
    compentName: "task-panel",
    label: '外业',
    icon: 'task'
  },
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