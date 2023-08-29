<template>
  <div class="full-screen bg-light-grey">
    <div class="login center">
      <img class="h-20 mx-auto" src="@/assets/logo.png"/>
      <h1 class="text-left text-3xl">Login</h1>
      <br />
      <form>
        <div>
          <label><b>Email Address</b> </label>
        </div>
        <input type="email" v-model="user.email" name="email" id="auth-email" placeholder="Email Address" />
        <br/><span class="text-sm text-red-400" v-if="v$.user.email.$error"> {{ v$.user.email.$errors[0].$message }}</span>
        <br/>

        <div>
          <label><b>Password </b> </label>
        </div>
        <input type="Password" v-model="user.password" name="Pass" id="auth-pass" placeholder="Password" @keyup.enter="userLogin()"/>
        <br/><span class="text-sm text-red-400" v-if="v$.user.password.$error"> {{ v$.user.password.$errors[0].$message }}</span>
        <br/>

        <div class="text-right color-primary">
          <span><router-link to="/forgot-password"><b>Forgot Your Password?</b></router-link></span>
        </div>

        <button class="btn-primary" @click="userLogin()" type="button" id="auth-login">Login</button>
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
  name: "Signin",
  data() {
    return {
      v$: useValidate(),
      user: {
        email: "",
        password: ""
      },
      // Dummy response
      login_response: {
        default_url: "/dashboard",
        token: "524|Th4ppK4hgKSz77fxHybUx7oGsw0uI5qxFKf9ulkz",
        user: {
          admin_group_id: 1,
          admin_group: { "id": 1, "title": "Master Admin", "is_active": 1, "created_at": null, "updated_at": null }
        },
        admin_menu: [
          { "id": 1, "title": "Dashboard", "link": "/dashboard", "icon_class": "heroicons-outline:home", "sort_order": 1, 
            "permissions": [ 
              { "id": 1, "title": "dashboard", "description": "View Dashboard", "admin_menu_id": 1, "admin_sub_menu_id": null, "is_parent": 1 } 
            ], 
            "sub_menus": [] 
          },
          {
            "id": 2, "title": "Masters", "link": "", "icon_class": "heroicons-outline:view-list", "sort_order": 6, "created_at": null, "updated_at": null, 
            "permissions": [ 
              { "id": 28, "title": "branches", "description": "View Branches", "admin_menu_id": 5, "admin_sub_menu_id": 6, "is_parent": 1 },
            ],
            "sub_menus": [ 
              { "id": 6, "admin_menu_id": 5, "title": "Branch", "link": "/branches", "created_at": null, "updated_at": null, 
                "permissions": [ 
                  { "id": 28, "title": "discountbranches_coupons", "description": "View Branches", "admin_menu_id": 5, "admin_sub_menu_id": 6, "is_parent": 1, "created_at": null, "updated_at": null }, 
                ] 
              }, 
              { "id": 7, "admin_menu_id": 5, "title": "Discounts", "link": "/discounts", "created_at": null, "updated_at": null, 
                "permissions": [ 
                  { "id": 33, "title": "discounts", "description": "View Discounts", "admin_menu_id": 5, "admin_sub_menu_id": 7, "is_parent": 1, "created_at": null, "updated_at": null },
                ] 
              } 
            ] 
          },
          {
            "id": 2, "title": "Transactions", "link": "", "icon_class": "heroicons-outline:pencil-alt", "sort_order": 6,
            "permissions": [ 
              { "id": 28, "title": "transactions", "description": "View Transactions", "admin_menu_id": 5, "admin_sub_menu_id": 6, "is_parent": 1 }
            ],
            "sub_menus": [ 
              { "id": 6, "admin_menu_id": 5, "title": "Transactions", "link": "/transactions",
                "permissions": [ 
                  { "id": 28, "title": "transactions", "description": "View Transactions", "admin_menu_id": 5, "admin_sub_menu_id": 6, "is_parent": 1 }, 
                ] 
              }
            ] 
          },
          {
            "id": 2, "title": "Reports", "link": "", "icon_class": "heroicons-outline:chart-square-bar", "sort_order": 6,
            "permissions": [ 
              { "id": 28, "title": "reports", "description": "View Reports", "admin_menu_id": 5, "admin_sub_menu_id": 6, "is_parent": 1 }
            ],
            "sub_menus": [ 
              { "id": 6, "admin_menu_id": 5, "title": "Reports", "link": "/reports",
                "permissions": [ 
                  { "id": 28, "title": "reports", "description": "View Reports", "admin_menu_id": 5, "admin_sub_menu_id": 6, "is_parent": 1 }, 
                ] 
              }
            ] 
          },
          {
            "id": 2, "title": "Settings", "link": "", "icon_class": "heroicons-outline:cog", "sort_order": 6,
            "permissions": [ 
              { "id": 28, "title": "settings", "description": "View Settings", "admin_menu_id": 5, "admin_sub_menu_id": 6, "is_parent": 1 }
            ],
            "sub_menus": [ 
              { "id": 6, "admin_menu_id": 5, "title": "Settings", "link": "/settings",
                "permissions": [ 
                  { "id": 28, "title": "settings", "description": "View Settings", "admin_menu_id": 5, "admin_sub_menu_id": 6, "is_parent": 1 }, 
                ] 
              }
            ] 
          }
        ]
      }
    }
  },
  validations() {
      return {
        user: {
          email: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Email'), required), email: helpers.withMessage(this.$root.getErrorMessage('email', 'Email'), email) },
          password: { required: helpers.withMessage(this.$root.getErrorMessage('required', 'Password'), required) }
        }
    };
  },
  computed: {
    ...mapGetters(["adminUser"]),
  },
  watch: {
    adminUser(data) {
      this.adminUser = data;
      if(this.adminUser.status) {
        this.$toast.success(data.message);
        window.location.reload()
      } else {
        this.$toast.error(data.message);
      }
    }
  },
  methods: {
    ...mapActions(["login"]),

    userLogin() {
      this.v$.$validate();
      if(!this.v$.$error) {
        localStorage.setItem("userInfo", JSON.stringify(this.login_response))
        window.location.reload()
        // this.login({
        //   email: this.user.email,
        //   password: this.user.password
        // });
      }
    }
  }
};
</script>