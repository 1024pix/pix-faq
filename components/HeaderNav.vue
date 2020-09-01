<template>
  <div class="nav">
    <client-only>
      <push-menu :width="'230'">
        <burger-menu-nav
          :top-items="topItems"
          :bottom-items="bottomItems"
          :middle-items="middleItems"
        />
      </push-menu>
    </client-only>
    <header>
      <div class="nav-principal tablet">
        <div class="container padding-container">
          <div class="switch">
            <nuxt-link to="/">
              <img
                :alt="$t('alt.header-nav.pix-homepage')"
                class="logo"
                src="/images/pix-logo.svg"
              />
            </nuxt-link>
            <img
              v-if="showFrenchGovLogo"
              :alt="$t('alt.header-nav.public-service')"
              src="/images/marianne-logo.svg"
            />
          </div>
        </div>
      </div>
    </header>
    <nav id="page-wrap" role="navigation" aria-label="$t('layout.main-nav')">
      <organization-nav :organization-nav-items="organizationNavItems" />
      <div class="nav-principal desktop">
        <div class="container padding-container">
          <nuxt-link to="/">
            <img
              :alt="$t('alt.header-nav.pix-homepage')"
              class="logo"
              src="/images/pix-logo.svg"
            />
          </nuxt-link>
          <img
            v-if="showFrenchGovLogo"
            :alt="$t('alt.header-nav.public-service')"
            src="/images/marianne-logo.svg"
          />
          <div class="desktop">
            <main-nav :main-nav-items="mainNavItems" />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MainNav from '@/components/MainNav'
import BurgerMenuNav from '@/components/BurgerMenuNav'
import OrganizationNav from '@/components/OrganizationNav'

export default {
  name: 'HeaderNav',
  components: {
    MainNav,
    BurgerMenuNav,
    OrganizationNav,
  },
  data() {
    const showFrenchGovLogo = this.$i18n.locale === 'fr-fr'
    return { showFrenchGovLogo }
  },
  computed: mapState([
    'organizationNavItems',
    'mainNavItems',
    'topItems',
    'bottomItems',
    'middleItems',
  ]),
}
</script>

<style scoped></style>
