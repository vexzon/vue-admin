import { Login } from "../../api/login";

const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
};
const getters = {
  isCollapse: state => state.isCollapse
};

const mutations = {
  setCollapse(state) {
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
    // var aaa = Cookie.get("isCollapse");
    // console.log(aaa);
  }
};
const actions = {
  login(content, requsetData) {
    console.log(content);
    return new Promise((resolve, reject) => {
      // 接口
      Login(requsetData)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default { namespaced: true, state, getters, mutations, actions };
