// import axios from '../../axios'
import axios from 'axios'
import axiosr from 'axios'
import NProgress from "nprogress";

export default {
  state: {
    adminUser: [],
    newPassword: [],
    forgotPasswordResponse: [],
    updatePasswordResponse: []
  },
  getters: {
    adminUser: (state) => state.adminUser,
    forgotPasswordResponse: (state) => state.forgotPasswordResponse,
    updatePasswordResponse: (state) => state.updatePasswordResponse
  },
  mutations: {
    SET_USER_DATA(state, data) {
      state.adminUser = data;
    },
    SET_FORGOT_PASSWORD_RESPONSE(state, data) {
      state.forgotPasswordResponse = data;
    },
    SET_UPDATE_PASSWORD_RESPONSE(state, data) {
        state.updatePasswordResponse = data;
    },
  },
  actions: {
    // async login({ commit }, data) {
    //   this.dispatch('updateLoaderStatus', true)
    //   await axios.post("users/login", data).then((response) => {
    //     this.dispatch('updateLoaderStatus', false)
    //     if (response.data.status) {
    //       localStorage.setItem("userInfo", JSON.stringify(response.data.response));
    //     }
    //     commit("SET_USER_DATA", response.data);
    //   });
    // },

    async login({ commit }, data) {
      this.dispatch('updateLoaderStatus', true)
      const response = await axios.post(
        "https://logistics.sandbox.silkysystems.com/api/admin/auth/login",
        data
      );
      if (response.data.status === 200 && response.data.message === "success") {
        let dataResponse = response.data.data;
  
        //   localStorage.setItem("role1", dataResponse.user.role);
        localStorage.setItem("lang", dataResponse.locale);
  
        localStorage.setItem("token", dataResponse.token);
        // setAdmin()
        // commit("setAdmin", {
        //   idToken: dataResponse.token,
        // });
  
        // commit("setError", null);
        //   localStorage.setItem("token", response.data.idToken);
      } else {
        // commit("setError", response.data.message);
        console.log("setError", response.data.status);
      }
      commit("SET_USER_DATA", response.data);
    },

    async logout({ commit }, data) {
      NProgress.start();
      axios.post("users/logout", data).then((res) => {
        NProgress.done();
      });
      localStorage.removeItem("userInfo");
      localStorage.removeItem("redirection_url")
      commit("SET_USER_DATA", []);
      window.location.href = "/";
    },

    async getResetPasswordToken({ commit }, data) {
      NProgress.start();
      await axios.post("reset-password-token", data).then((response) => {
        NProgress.done();
        commit("SET_FORGOT_PASSWORD_RESPONSE", response.data);
      },
        (error) => {
          NProgress.done();
          commit("SET_FORGOT_PASSWORD_RESPONSE", error.response.data);
        }
      );
    },

    async updadePassword({commit}, data) {
      NProgress.start();
      await axios.post("reset-password", data).then((response) => {
          NProgress.done();
          commit("SET_UPDATE_PASSWORD_RESPONSE", response.data);
      },
          (error) => {
              NProgress.done();
              commit("SET_UPDATE_PASSWORD_RESPONSE", error.response.data);
          }
      );
  },

  },
};
