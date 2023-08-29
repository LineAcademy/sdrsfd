<template>
  <div
    class="fixed z-20 top-0 left-0 lg:left-64 right-0 h-14 bg-white border-b border-gray-200 flex flex-row items-center justify-between px-5">
    <h3 class="text-sm font-medium text-gray-600">{{ getUserRole() }}</h3>
    <div class="flex items-center">
      <tw-dropdown class="ml-3" origin="right" body-class="top-8">
        <div class="flex items-center cursor-pointer">
          <span class="mr-1">{{ getUserName() }}</span>
          <img src="@/assets/profile_pic.png" alt="Avatar" class="w-8 h-8 rounded-full">
        </div>
        <template #body>
          <ul>
            <li @click="signout()" class="px-4 py-2 cursor-pointer profile-links">
              Sign Out
            </li>
          </ul>
        </template>
      </tw-dropdown>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'TheNavbar',
  data() {
    return {
      
    }
  },
  methods: {
    ...mapActions(["logout"]),

    signout() {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("redirection_url")
      window.location.href = "/";
      // this.logout({
      //   Token: JSON.parse(localStorage.getItem("userInfo")).token
      // });
    },
    getUserName() {
      return JSON.parse(localStorage.getItem("userInfo")).user.name;
    },
    getUserRole() {
      return JSON.parse(localStorage.getItem("userInfo")).user?.admin_group?.title;
    },
    getUserRoleId() {
      return JSON.parse(localStorage.getItem("userInfo")).user?.admin_group?.id;
    }
  }
}
</script>