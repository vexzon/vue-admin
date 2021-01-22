import { Promise } from "core-js";
import { Login } from "../../api/login";
import {
  setToKen,
  removeToKen,
  removeUserName,
  getUserName,
  setUserName
} from "../../utils/get-token";

const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  token: "",
  username: "" || getUserName()
};
const getters = {
  isCollapse: state => state.isCollapse
};

const mutations = {
  setCollapse(state) {
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  },
  // 获取cookie
  SET_TOKEN(state, value) {
    state.token = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  }
  // 删除cookie
};
const actions = {
  login(content, requsetData) {
    return new Promise((resolve, reject) => {
      // 接口
      Login(requsetData)
        .then(res => {
          let loginData = res.data.data;
          content.commit("SET_TOKEN", loginData.token);
          content.commit("SET_USERNAME", loginData.username);
          setToKen(loginData.token);
          setUserName(loginData.username);
          // toKen、userName
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  exit({ commit }) {
    return new Promise((resolve, reject) => {
      removeToKen();
      removeUserName();
      commit("SET_TOKEN", "");
      commit("SET_USERNAME", "");
      resolve();
      reject();
    });
  }
};

export default { namespaced: true, state, getters, mutations, actions };
