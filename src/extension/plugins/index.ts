import filterPlugin from './filter.plugin'
import helperPlugin from './helper.plugin'
import commonPlugin from './common.plugin'
import dictPlugin from './dict.plugin'
import windowPlugin from './window.plugin'

export default ({ store }) => ({
  filterPlugin,
  helperPlugin,
  commonPlugin,
  dictPlugin,
  windowPlugin
})
