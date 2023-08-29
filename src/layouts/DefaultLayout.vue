<template>
  <!-- Sidebar -->
  <sidebar @visibility-change="onSidebarVisibilityChanged" />
  <!-- Content Container -->
  <div
    class="min-h-screen bg-color-light-gray"
    :class="{ 'overflow-hidden max-h-screen fixed': visibleResponsiveSidebar }">
    <navbar />
    <!-- Content -->
    <div class="lg:ml-64 pt-14 px-5">
      <div v-if="display_loader" wire:loading class="bg-black fixed top-0 bottom-0 -mx-5 w-full h-screen z-50 overflow-hidden opacity-50 flex flex-col items-center justify-center">
        <svg class="lg:-ml-64 animate-spin h-12 w-12 rounded-full bg-transparent border-2 border-transparent border-opacity-50 loader" viewBox="0 0 24 24"></svg>
      </div>
      <div class="container mx-auto mt-5">
        <transition name="slide-fade">
          <router-view />
        </transition>
      </div>
      <audio id="beepAudio4" src="/mp3/notification.mp3" preload="auto" loop></audio>
    </div>
    <the-footer class="lg:ml-64"/>

  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Sidebar from '@/components/layouts/TheSidebar.vue'
import Navbar from '@/components/layouts/TheNavbar.vue'
import TheFooter from '@/components/layouts/Footer.vue'
import { useStore } from 'vuex'

export default {
  name: 'DefaultLayout',
  components: {
    Sidebar,
    Navbar,
    TheFooter
},
  setup() {
    const store = useStore();

    const visibleResponsiveSidebar = ref(false)
    const onSidebarVisibilityChanged = (visible) => {
      visibleResponsiveSidebar.value = visible
    }

    return {
      visibleResponsiveSidebar,
      onSidebarVisibilityChanged,
      display_loader: computed(() => store.state['config'].display_loader)
    }
  }
}
</script>