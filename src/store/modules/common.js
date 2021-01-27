import { GetCategory } from "@/api/news";

const actions = {
  getInfoCategory() {
    return new Promise((resolve, reject) => {
      GetCategory({})
        .then(res => {
          resolve(res);
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
