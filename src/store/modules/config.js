export default {
  state: {
    terminate_task: false,
    display_loader: false,
    activity_log_notification: false
  },
  getters: {
    terminate_task: (state) => state.terminate_task,
    display_loader: (state) => state.display_loader,
    activity_log_notification: (state) => state.activity_log_notification
  },
  mutations: {
    SET_TERMINATE_TASK_STATUS(state, data) {
      state.terminate_task = data;
    },
    SET_DISPLAY_LOADER_STATUS(state, data) {
      state.display_loader = data;
    },
    SET_ACTIVITY_LOG_NOTIFICATION_STATUS(state, data) {
      state.activity_log_notification = data;
    }
  },
  actions: {
    async updateTerminateTaskStatus({ commit }, status) {
      commit("SET_TERMINATE_TASK_STATUS", status);
    },

    async updateLoaderStatus({ commit }, status) {
      commit("SET_DISPLAY_LOADER_STATUS", status);
    },

    async updateUserInfoObj({commit}, data) {
      let current_user = JSON.parse(localStorage.getItem("userInfo"))
      if(data.user_id = current_user.user.id) {
        current_user.user.allow_activity_notifications = data.notification_status
        localStorage.setItem("userInfo", JSON.stringify(current_user));
        commit("SET_ACTIVITY_LOG_NOTIFICATION_STATUS", data.notification_status);
      }
    }
  
  }
}