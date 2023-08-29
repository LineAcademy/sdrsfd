<template>
  <transition name="slide-fade">
    <router-view />
  </transition>
</template>

<script>
import { useClipboard } from '@vueuse/core'

export default {
  name: 'App',

  setup(textToCopy) {
    const source = textToCopy
    const { copy } = useClipboard({ source })
    function getErrorMessage(error_type, key_name) {
      return error_type == 'required' ? key_name +' is required' : 
      error_type == 'email' ? 'Email entered is not valid. Please enter valid address' : 
      '';
    }
    function getLengthErrorMessage(error_type, key_name, count) {
      return error_type == 'min' ? key_name +' must be at least ' +count  +' characters.' : 
      error_type == 'max' ? 'Max. allowed length is ' +count +' characters' : 
      '';
    }
    function getScreenPermissions(screen) {
      const admin_menus = JSON.parse(localStorage.getItem("userInfo")).admin_menu;
      let group_rights = [];
      admin_menus.forEach(group_right => {
        if(group_right.sub_menus.length > 0) {
            group_right.sub_menus.forEach(obj => {
                group_rights.push(obj)
            });
        } else {
            group_rights.push(group_right)
        }
      });
      return group_rights.find(right => right.title == screen)
    }
    function getPermissionStatus(permissions, title) {
      return !permissions ? false : permissions.find(permission => permission.title == title) ? true : false
    }
    return {
      copy,
      getErrorMessage,
      getLengthErrorMessage,
      getScreenPermissions,
      getPermissionStatus
    }
  }
}
</script>