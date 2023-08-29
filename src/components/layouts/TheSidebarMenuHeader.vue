<template>
  <div class="px-5 text-sm color-primary font-medium my-2">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'TheSidebarMenuHeader',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>