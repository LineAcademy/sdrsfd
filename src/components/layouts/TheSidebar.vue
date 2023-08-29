<template>
  <!-- Toggle sidebar button -->
  <button 
    class="fixed z-50 bottom-4 right-4 w-16 h-16 rounded-full bg-gray-900 lg:hidden"
    @click="toggleSidebar">
    <tw-icon 
      name="heroicons-solid:menu-alt-4" 
      class="btn-toggle w-6 h-6 text-white" 
      :class="{'opacity-0': showSidebar}" />
    <tw-icon 
      name="heroicons-solid:x" 
      class="btn-toggle w-6 h-6 text-white"
      :class="{'opacity-0': !showSidebar}" />
  </button>

  <!-- Sidebar Overlay -->
  <div 
    class="fixed inset-0 bg-black bg-opacity-25 z-30 lg:hidden" 
    :class="{'hidden': !showSidebar}" 
    @click="showSidebar = false" />
  <div 
    class="fixed z-40 left-0 top-0 right-24 lg:right-auto lg:w-64 h-screen border-r border-gray-200 overflow-y-auto bg-white" 
    :class="{'hidden': allowSidebarHide && !showSidebar}">
    <!-- Header -->
    <header class="text-center py-4 px-5 bg-gray-100">
      <img 
        src="@/assets/logo_sidebar.png" 
        alt="Logo" 
        class="mx-auto h-16">
        <p class="text-md font-medium text-gray-600 pt-2">Gym Management</p>
    </header>
    <!-- Menu -->
    <div class="mt-2">

      <menu-item
        v-for="admin_menu in admin_menus"
        :key="admin_menu.id"
        :icon="admin_menu.icon_class" 
        :text="admin_menu.title" 
        :route="{path: admin_menu.link}">
          <template v-if=" admin_menu.sub_menus?.length > 0" #sub-menu>
            <sub-menu-item 
              class="grid grid-cols-1"
              v-for="sub_menu in admin_menu.sub_menus"
              :key="sub_menu.id"
              :text="sub_menu.title" 
              :route="{path: sub_menu.link}"
            />
        </template>
      </menu-item>

    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useRoute } from 'vue-router'

import MenuHeader from './TheSidebarMenuHeader.vue'
import MenuItem from './TheSidebarMenuItem.vue'
import SubMenuHeader from './TheSidebarSubMenuHeader.vue'
import SubMenuItem from './TheSidebarSubMenuItem.vue'

export default {
  name: 'TheSidebar',
  components: {
    MenuHeader,
    MenuItem,
    SubMenuHeader,
    SubMenuItem,
  },
  emits: ['visibility-change'],
  setup(_, {emit}) {
    const showSidebar = ref(false)
    const toggleSidebar = () => showSidebar.value = !showSidebar.value
    watch(showSidebar, (val) => {
      emit('visibility-change', val)
    })

    const route = useRoute()
    watch(route, () => showSidebar.value = false)
    
    const widthBreakpoint = 1024 
    const { width: windowWidth } = useWindowSize()
    watch(windowWidth, (newWidth) => {
      if (newWidth < widthBreakpoint) showSidebar.value = false
    })

    const allowSidebarHide = computed(() => windowWidth.value < widthBreakpoint)

    const admin_menus = JSON.parse(localStorage.getItem("userInfo")).admin_menu

    return {
      showSidebar,
      toggleSidebar,
      allowSidebarHide,
      admin_menus
    }
  }
}
</script>

<style scoped>
.btn-toggle {
  @apply absolute left-1/2 top-1/2 transition duration-300 transform -translate-x-1/2 -translate-y-1/2;
}
</style>