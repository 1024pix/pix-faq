import getHostFromRequest from '~/services/get-host-from-request'

export default {
  updateHost(state, req) {
    const host = getHostFromRequest(req)
    state.host = host.split(':')[0]
    if (
      state.host === this.$config.orgDomain &&
      this.$i18n.locale === 'fr-fr'
    ) {
      this.$i18n.setLocale('fr')
    }
  },
  updateNavigation(state, navigations) {
    function navItems(response, type) {
      return response.data.body.filter((body) => body.primary.type === type)
    }

    if (process.env.isPixPro) {
      state.organizationNavItems = navItems(
        navigations,
        'pix-pro-organizations-nav'
      )
    }
  },
  updateMainNavigations(state, navigations) {
    state.mainNavigations = [...navigations]
  },
  updateMainFooters(state, footers) {
    state.mainFooters = [...footers]
  },
  updateHotNews(state, hotNews) {
    state.hotNews = hotNews && hotNews.data ? hotNews.data.description : null
  },
}
