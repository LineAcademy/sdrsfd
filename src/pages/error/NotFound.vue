<template>
  <div class="full-screen text-center bg-light-grey">
    <div class="center">
      <h2 class="font-80">404</h2>
      <div class="font-20">
        <img class="info-icon inline" src="@/assets/info_outline.svg" /> Oops!
        The Page you requested was not found!
      </div>
      <button @click="backToHome" class="btn-primary rounded-lg h-9 text-5x px-6 mt-5">Back to home</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      default_url : JSON.parse(localStorage.getItem("userInfo"))?.default_url
    }
  },
  methods: {
    backToHome() {
      if(this.default_url) {
        this.$router.push(this.default_url)
      } else {
        this.$router.push('/access-forbidden')
      }
    }
  },
};
</script>

<style scoped>
.info-icon {
  height: 30px !important;
  width: 30px !important;
}
</style>