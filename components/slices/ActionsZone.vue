<template>
  <nav class="actions-zone">
    <language-switcher type="with-dropdown" />
    <ul>
      <li v-for="(menuItem, index) in slice.items" :key="`item-${index}`">
        <pix-link
          :field="menuItem.link"
          class="actions-zone__item"
          :class="{
            'button button--with-border-focus': menuItem.style === 'button',
            link: menuItem.style === 'link',
          }"
        >
          {{ $prismic.asText(menuItem.name) }}
        </pix-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'ActionsZone',
  props: {
    slice: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped lang="scss">
.actions-zone {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 5px;

  ul {
    list-style: none;
    display: flex;
    li::before {
      content: none;
    }
    li {
      align-self: center;
      display: inline;
    }
  }

  & > div:not(:last-child) {
    margin-right: 16px;
  }

  &__item {
    font-size: 0.875rem;
    color: $grey-60;
    font-family: $font-roboto;
    font-weight: $font-medium;
    letter-spacing: 0.008rem;
    line-height: 1.375rem;

    &.link:hover {
      color: $blue;
    }

    &.button {
      display: none;
    }
  }

  @include device-is('large-screen') {
    &__item {
      &.button {
        display: flex;
        color: $white;
        height: 36px;
      }
    }
  }
}
</style>
