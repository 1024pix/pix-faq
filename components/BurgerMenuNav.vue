<template>
  <div class="burger-menu-nav">
    <burger-menu-nav-items :items="items.navigationZone" />
    <burger-menu-nav-items :items="items.actionsZone" :is-action="true" />
    <language-switcher type="only-text" />
  </div>
</template>

<script>
export default {
  name: 'BurgerMenuNav',
  props: {
    items: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.burger-menu {
  .bm-menu {
    background: $white;

    @include device-is('large-screen') {
      display: none;
    }
  }

  .bm-item-list {
    height: 100%;

    & > * {
      padding: 0;
      flex-direction: column;
      height: 100%;
    }
  }

  .bm-burger-bars {
    background-color: $grey-45;
  }

  .bm-burger-button {
    top: 25px;

    @include device-is('large-screen') {
      display: none;
    }
  }

  .bm-cross {
    background: $grey-45;
    height: 24px !important;
  }
}
.hot-news + .navigation-slice-zone {
  .bm-burger-button {
    margin-top: 70px;
    @include device-is('large-screen') {
      display: none;
    }
  }
}
</style>
