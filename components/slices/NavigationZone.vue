<template>
  <nav class="navigation-zone">
    <ul>
      <li
        v-for="(menuItem, index) in navigationLinks"
        :key="`item-${index}`"
        class="navigation-zone-block"
      >
        <pix-link
          v-if="!menuItem.hasOwnProperty('subNavigationLinks')"
          :field="menuItem.link"
          class="navigation-zone__item"
        >
          {{ $prismic.asText(menuItem.name) }}
        </pix-link>
        <div v-else>
          <button
            :dropdown-index="`${index}`"
            class="dropdown-toggle navigation-zone__item links-group"
            :class="{
              'current-active-link': subIsActive(menuItem.subNavigationLinks),
            }"
            @click="toggleDropdown(`${index}`)"
            @click.stop.prevent
          >
            {{ menuItem.name }}
            <fa v-if="isOpenDropdown(`${index}`)" icon="angle-up" />
            <fa v-else icon="angle-down" />
          </button>
          <navigation-dropdown
            v-show="isOpenDropdown(`${index}`)"
            type="button"
            :options="menuItem.subNavigationLinks"
            :dropdown-index="`${index}`"
          >
          </navigation-dropdown>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavigationZone',
  props: {
    slice: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      openDropdownIndex: undefined,
    }
  },
  computed: {
    navigationLinks() {
      const navigation = new Navigation()
      this.slice.items.forEach((item) => {
        if (item.group.length > 0) {
          const groupName = item.group[0].text
          navigation.addSubNavigationLink(groupName, item)
        } else {
          navigation.addNavigationLink(item)
        }
      })
      return navigation.links
    },
  },
  mounted() {
    const page = document.getElementsByTagName('body')[0]
    page.addEventListener('click', this.toggleDropdown)
  },
  beforeDestroy() {
    const page = document.getElementsByTagName('body')[0]
    page.removeEventListener('click', this.toggleDropdown)
  },
  methods: {
    isOpenDropdown(dropdownIndex) {
      return this.openDropdownIndex === dropdownIndex
    },
    toggleDropdown(dropdownIndex) {
      if (this.isOpenDropdown(dropdownIndex)) {
        this.openDropdownIndex = undefined
      } else {
        this.openDropdownIndex = dropdownIndex
      }
    },
    subIsActive(subNavigationLinks) {
      const paths = subNavigationLinks.map((subNavigationLink) => {
        const splittedLink = subNavigationLink.link.url.split('/')
        const linkIndex = splittedLink.length - 1
        return splittedLink[linkIndex]
      })
      return paths.some((path) => {
        return this.$route.path.includes(path)
      })
    },
  },
}

class Navigation {
  constructor() {
    this.links = []
  }

  addNavigationLink(navigationLink) {
    this.links.push(navigationLink)
  }

  addSubNavigationLink(groupName, subNavigationLink) {
    const group = this._groupAlreadyInLinks(groupName)
    if (!group) {
      this._createNewGroup(groupName, [subNavigationLink])
    } else {
      group.subNavigationLinks.push(subNavigationLink)
    }
  }

  _groupAlreadyInLinks(groupName) {
    return this.links.find(
      (link) => link.name === groupName && link.subNavigationLinks
    )
  }

  _createNewGroup(groupName, subNavigationLinks) {
    this.links.push({
      name: groupName,
      subNavigationLinks,
    })
  }
}
</script>

<style scoped lang="scss">
@mixin active-link($theme: DarkGray) {
  border-bottom: 2px solid $blue;

  &:active,
  &:hover {
    color: $blue;
  }
}

.navigation-zone {
  display: none;

  ul {
    list-style: none;
    display: flex;
    padding: 0;
    li::before {
      content: none;
    }
    li {
      align-self: center;
      display: inline;
      padding: 0;
    }
  }

  .navigation-zone-block {
    height: 24px;

    &:last-child {
      border-left: 1px solid $grey-20;
    }
  }

  & > div {
    position: relative;
  }

  @include device-is('large-screen') {
    display: flex;
    align-items: center;
    height: 100%;

    button.dropdown-toggle {
      height: 30px;
      &.current-active-link {
        @include active-link;
      }
    }

    &__item {
      color: $grey-60;
      font-family: $font-roboto;
      font-size: 14px;
      font-weight: $font-medium;
      height: 22px;
      letter-spacing: 0.13px;
      line-height: 22px;
      padding: 0 8px 10px 8px;
      cursor: pointer;
      white-space: nowrap;

      &.current-active-link {
        @include active-link;
      }

      &.links-group {
        border: none;
        background-color: transparent;
      }
    }
  }
}
</style>
