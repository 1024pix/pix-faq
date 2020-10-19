import actions from './actions'
import mutations from './mutations'

const state = () => ({
  hotNews: null,
  host: null,
  mainNavigations: [],
  mainFooters: [],
})

export default {
  state,
  actions,
  mutations,
}
