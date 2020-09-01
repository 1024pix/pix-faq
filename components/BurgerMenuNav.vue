<template>
  <div>
    <div class="nav-top">
      <ul>
        <li v-for="item in topItems" :key="item.id" class="nav-top__link">
          <pix-link :field="item.primary.link">
            {{ $prismic.asText(item.primary.title) }}
          </pix-link>
        </li>
      </ul>
      <div class="nav-middle">
        <hr class="nav-middle__bar" />
        <p>Pix Pro</p>
        <ul>
          <li
            v-for="item in middleItems"
            :key="item.id"
            class="nav-middle__link"
          >
            <pix-link :field="item.primary.link">
              {{ $prismic.asText(item.primary.title) }}
            </pix-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="nav-bottom">
      <hr class="nav-bottom__bar" />
      <ul>
        <li v-for="item in bottomItems" :key="item.id" class="nav-bottom__link">
          <pix-link :field="item.primary.link">
            {{ $prismic.asText(item.primary.title) }}
            <span class="show-page-icon">&gt;</span>
          </pix-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BurgerMenuNav',
  props: {
    topItems: {
      type: Array,
      default: null,
    },
    middleItems: {
      type: Array,
      default: null,
    },
    bottomItems: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.bm-menu {
  background: linear-gradient(134.72deg, $blue-2 0%, $blue-1 100%);
  padding-top: 0;

  @include device-is('desktop') {
    display: none;
  }

  ul {
    padding-left: 0;
    list-style: none;

    & > li {
      padding-left: 0;

      &::before {
        display: none;
      }
    }
  }

  .nav-top {
    &__link {
      font-weight: 600;
      color: $white;
      text-align: left;
      margin-bottom: 12px;
    }

    a {
      text-decoration: none;
      display: block;
      transition: 0.3s;
      font-size: 1rem;
      line-height: 1.5rem;
      color: $white;
    }

    p {
      margin: 0;
    }
  }

  hr {
    height: 1px;
    opacity: 0.5;
    border: 1px solid $grey-7;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    border-radius: 0px;
    display: inline-block;
  }
  .nav-middle {
    font-family: $roboto;
    h3 {
      color: $white;
      font-size: 16px;
      font-weight: 700;
      margin-top: 17.5px;
    }
    hr {
      width: 16px;
    }
    ul {
      margin-left: 24px;
    }
    &__link {
      position: relative;
      margin-bottom: 14px;
      a {
        font-size: 14px;
      }
    }
    .nuxt-link-active {
      font-weight: 700;
    }
    .nuxt-link-active:before {
      position: absolute;
      left: -48px;
      content: ' ';
      height: 100%;
      width: 2px;
      background-color: $white;
    }
  }

  .nav-bottom {
    &__link {
      font-weight: 400;
      color: $white;
      text-align: left;
      margin-top: 10px;
    }

    .show-page-icon {
      font-size: 10px;
      margin-left: 5px;
    }

    &__bar {
      margin-bottom: 12px;
    }

    hr {
      width: 180px;
    }

    a {
      text-decoration: none;
      display: flex;
      align-items: baseline;
      transition: 0.3s;
      font-size: 12px;
      line-height: 17px;
      color: $white;
    }
  }

  .nav-top a:hover,
  .nav-bottom a:hover {
    text-decoration: underline;
  }

  .bm-item-list {
    height: 100%;
    margin-left: 0;
    padding: 0 25px;

    & > * {
      padding: 0;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
  }
}

.bm-burger-bars {
  background-color: $grey-1;
}

.bm-burger-button {
  @include device-is('desktop') {
    display: none;
  }
}
.nav .bm-burger-button {
  top: 23px;
  position: relative;
  margin-bottom: -36px;
}
.bm-cross {
  background: $grey-1;
  height: 24px !important;
}
</style>
