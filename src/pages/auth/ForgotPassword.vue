<template>
    <div class="full-screen bg-light-grey">
        <div class="login center">
            <img class="h-20 mx-auto" src="@/assets/logo.png"/>
            <h1 class="text-left text-2xl">Forgot your password?</h1>
            <br />
            <form>
            <div>
                <label><b>Email Address</b> </label>
            </div>
            <input type="email" v-model="admin_email" name="admin_email" id="auth-email" placeholder="Email Address" />
            <br/><span class="text-sm text-red-400" v-if="v$.admin_email.$error"> {{ v$.admin_email.$errors[0].$message }}</span>
            <br/>

            <button class="btn-primary" @click="getPasswordResetLink()" type="button" id="send-password-reset-link">Send Password Reset Link</button>
        <br/><br/>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import useValidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

export default {
    data() {
        return {
            v$: useValidate(),
            admin_email: ""
        }
    },
    validations() {
        return {
            admin_email: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Email'), required), email: helpers.withMessage(this.$root.getErrorMessage('email', 'Email'), email) }
        };
    },
    computed: {
        ...mapGetters(["forgotPasswordResponse"]),
    },
    methods: {
        ...mapActions(["getResetPasswordToken"]),

        getPasswordResetLink() {
            this.v$.$validate();
            if(!this.v$.$error) {
                this.getResetPasswordToken({
                    email: this.admin_email
                });
            }
        }
    },
    watch: {
        forgotPasswordResponse(data) {
            if(data.status) {
                this.$toast.success(data.message);
                this.$router.back();
            } else {
                this.$toast.error(data.message);
            }
        }
    },
    mounted() {

    },
}
</script>