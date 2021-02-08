const state = {
  id: "" || sessionStorage.getItem("infoID"),
  title: "" || sessionStorage.getItem("infoTitle")
};
const getters = {
  infoID: state => state.id,
  infoTitle: state => state.title
};
const mutations = {
  // 修改store的值
  updateStateValue(state, params) {
    for (let key in params) {
      // 储存值
      state[key] = params[key].value;
      // 是否存储session
      if (params[key].session) {
        sessionStorage.setItem(params[key].sessionKey, params[key].value);
      }
    }
  }

  // setID(state, value) {
  //   state.id = value;

  //   // 本地存储
  //   sessionStorage.setItem("infoID", value);
  // },
  // setTitle(state, value) {
  //   state.title = value;
  //   sessionStorage.setItem("infoTitle", value);
  // }
};
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
