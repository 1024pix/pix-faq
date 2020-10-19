import {
  getMainNavigations,
  getMainFooters,
  getHotNews,
  getNavigation,
} from '~/store/helpers'

export default {
  async nuxtServerInit({ commit }, { app, req }) {
    commit('updateNavigation', await getNavigation(app.$prismic, app.i18n))
    commit(
      'updateMainNavigations',
      await getMainNavigations(app.$prismic, app.i18n)
    )
    commit('updateMainFooters', await getMainFooters(app.$prismic, app.i18n))
    commit('updateHotNews', await getHotNews(app.$prismic, app.i18n))
    commit('updateHost', req)
  },
  async updateNavigation({ commit }, { i18n, prismic }) {
    commit('updateNavigation', await getNavigation(prismic, i18n))
  },
  async updateMainNavigations({ commit }, { i18n, prismic }) {
    commit('updateMainNavigations', await getMainNavigations(prismic, i18n))
  },
  async updateMainFooters({ commit }, { i18n, prismic }) {
    commit('updateMainFooters', await getMainFooters(prismic, i18n))
  },
}
