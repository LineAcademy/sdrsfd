<template>
  <div class="full-screen bg-light-grey">
    <div class="login center">
      <img class="h-20 mx-auto" src="@/assets/logo.png"/>
      <h1 class="text-left font-26">Update Password</h1>
      <br />
      <form id="login">
        <div>
          <label><b>Old Password </b> </label>
        </div>
        <input type="Password" v-model="password" name="oldpass" id="auth-pass" placeholder="Old Password" />
        <br/><span class="text-sm text-red-400" v-if="v$.password.$error"> {{ v$.password.$errors[0].$message }}</span>
        <br />
        <div>
          <label><b>New Password </b> </label>
        </div>
        <input type="Password" v-model="new_password" name="newpass" id="auth-new-pass" placeholder="New Password" />
        <br/> <span class="text-sm text-red-400" v-if="v$.new_password.$error"> {{ v$.new_password.$errors[0].$message }}</span>
        <br/>
        <input
          class="btn-primary"
          type="button"
          name="update"
          id="auth-update"
          value="Update Password"
          @click="onUpdatePassword()"
        />
        <br/>
      </form>
    </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
  name: "UpdatePassword",
  data() {
    return {
      v$: useValidate(),
      password: "",
      new_password: "",
    }
  },
  validations() {
    return {
      password: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Old password'), required) },
      new_password: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'New password'), required) }
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    onUpdatePassword() {
      this.v$.$validate()
      if(!this.v$.$error) {

      }
    }
  },
};
</script>