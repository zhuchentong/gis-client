import { LayerInfoService } from '@/services/layer-info.service'
import { RequestParams } from '@/core/http'
import { dispatch } from 'rxjs/internal/observable/range'
import { Entity } from 'cesium/Cesium'
import { FilterService } from '@/utils/filter.service'

let layerInfoService: LayerInfoService
// 图层组
export default {
  namespaced: true,
  state: {
    isTableShow: false,
    tableList: []
  },
  mutations: {
    updateTableVisibility(state, value) {
      state.isTableShow = value
    },
    removeLayerAttrTable(state, id) {
      const index = state.tableList.findIndex(x => x.id === id)
      if (index >= 0) {
        state.tableList.splice(index, 1)
      }
    },
    /**
     * 添加到图层属性表
     */
    addLayerAttrTable(state, { id, name, data }) {
      if (state.tableList.findIndex(x => x.id === id) > -1) {
        console.error(`已存在属性表:${id},Name:${name}`)
        return
      }
      if (!data.length) {
        return
      }
      const [attr] = data
      const columns = Object.entries(attr)
        .map(([key, value]) => ({
          key,
          label: FilterService.convertShpCode(key)
        }))
        .filter(x => x.key !== x.label || /[\u4e00-\u9fa5]/.test(x.key))

      state.tableList.push({
        id,
        name,
        columns,
        data
      })
    }
  },
  actions: {
    getLayerAttrData({ commit }, { layer, cql }) {
      if (!layerInfoService) {
        layerInfoService = new LayerInfoService()
      }

      layerInfoService
        .queryMapSpotByAttr(
          new RequestParams({
            layerSpace: layer.layerSpace,
            layerCode: layer.layerCode,
            cql
          })
        )
        .subscribe(data => {
          commit('addLayerAttrTable', {
            id: layer.id,
            name: layer.layerName,
            data: data.map(x => x.attr)
          })
        })
    },
  },
  getters: {
    /**
     * 获取图层table信息
     */
    getTable(state) {
      return (id) => state.tableList.find(x => x.id === id)
    }
  }
}
