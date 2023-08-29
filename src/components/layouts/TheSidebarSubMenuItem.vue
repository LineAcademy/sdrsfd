<template>
  <router-link 
    class="sub-menu px-5 py-1.5 text-sm text-gray-500 font-medium cursor-pointer hover:text-gray-700"
    :class="activeSubMenu ? 'color-primary' : 'text-gray-500'"
    :to="route">
    {{ text }}
  </router-link>
</template>

<script>
export default {
  name: 'TheSidebarSubMenuItem',
  props: {
    text: {
      type: String,
      required: true
    },
    route: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      activeSubMenu: false
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(val) {
        if (val.name == this.route?.name || val.path == this.route?.path) {
          this.$parent.setActiveMenu(true)
          this.activeSubMenu = true
        } else {
          this.activeSubMenu = false
        }
      }
    }
  },
  methods: {
    onClick() {
      if (this.route) this.$router.push(this.route)
      else console.log('No action found!')
    }
  }
}
</script>