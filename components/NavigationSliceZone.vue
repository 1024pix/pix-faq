<template>
  <header class="navigation-slice-zone">
    <client-only>
      <slide-menu width="320" class="burger-menu">
        <burger-menu-nav :items="burgerMenuLinks" />
      </slide-menu>
    </client-only>
    <div class="navigation-slice-zone__content">
      <div class="navigation-slice-zone-content__left-side">
        <section
          v-for="(slice, index) in leftNavigation"
          :key="`navigation-slice-left-${index}`"
        >
          <template v-if="slice.slice_type === 'logos_zone'">
            <slices-logos-zone :slice="slice" />
          </template>
          <template v-if="slice.slice_type === 'navigation_zone'">
            <slices-navigation-zone :slice="slice" />
          </template>
        </section>
      </div>
      <section
        v-for="(slice, index) in rightNavigation"
        :key="`navigation-slice-right-${index}`"
        class="navigation-slice-zone-content__right-side"
      >
        <template v-if="slice.slice_type === 'actions_zone'">
          <slice-actions-zone :slice="slice" />
        </template>
      </section>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import { groupBy } from 'lodash'
export default {
  name: 'NavigationSliceZone',
  computed: {
    isPixPro() {
      return process.env.isPixPro
    },
    ...mapState(['mainNavigations']),

    usedMainNavigation() {
      const groupBySite = groupBy(this.mainNavigations, 'data.navigation_for')
      if (this.isPixPro && groupBySite['pix-pro']) {
        return groupBySite['pix-pro'][0]
      }
      return groupBySite['pix-site'][0]
    },

    leftNavigation() {
      const headerBlocks = this.usedMainNavigation.data.body
      return headerBlocks.filter(
        (block) =>
          block.slice_type === 'logos_zone' ||
          block.slice_type === 'navigation_zone'
      )
    },

    rightNavigation() {
      const headerBlocks = this.usedMainNavigation.data.body
      return headerBlocks.filter((block) => block.slice_type === 'actions_zone')
    },

    burgerMenuLinks() {
      const navigationZone = this.usedMainNavigation.data.body.find(
        (slice) => slice.slice_type === 'navigation_zone'
      )
      const actionsZone = this.usedMainNavigation.data.body.find(
        (slice) => slice.slice_type === 'actions_zone'
      )
      return {
        navigationZone: navigationZone.items,
        actionsZone: actionsZone.items,
      }
    },
  },
}
</script>

<style lang="scss">
.navigation-slice-zone {
  box-shadow: -1px 9px 29px -16px rgba(199, 191, 199, 0.9);

  .burger-menu {
    display: block;
  }

  .navigation-slice-zone__content {
    display: flex;
    justify-content: space-between;
    margin-left: 100px;
    height: 80px;
  }

  @include device-is('large-screen') {
    .burger-menu {
      display: none;
    }

    .navigation-slice-zone__content {
      justify-content: space-between;
      margin: 0 4vw;
    }

    .navigation-slice-zone-content {
      &__left-side {
        display: flex;
      }
    }
  }
}
</style>
