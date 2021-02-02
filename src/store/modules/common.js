import { GetCategory } from "@/api/news";

//
const actions = {
  getInfoCategory() {
    return new Promise((resolve, reject) => {
      GetCategory({})
        .then(res => {
          resolve(res.data.data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  actions
};
