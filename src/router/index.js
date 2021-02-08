import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 引入布局组件
const Layout = () => import("../views/layout/index.vue");

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登录"
    },
    component: () => import("@/views/login/Login.vue")
  },

  // 控制台
  {
    path: "/console",
    name: "Console",
    redirect: "/index",
    meta: {
      name: "控制台",
      icon: "el-icon-s-help"
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页"
        },
        component: () => import("../views/console/console.vue")
      }
    ]
  },

  // 信息管理

  {
    path: "/info",
    name: "Info",
    redirect: "/info/infoList",
    meta: {
      name: "信息管理",
      icon: "el-icon-s-order"
    },
    component: Layout,
    children: [
      {
        path: "/infoList",
        name: "InfoList",
        meta: {
          name: "信息列表"
        },
        component: () => import("../views/info/Info.vue")
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: "信息分类"
        },
        component: () => import("../views/info/InfoCategory.vue")
      },
      {
        path: "/infoDetailed/",
        name: "InfoDetailed",
        hidden: true,
        meta: {
          name: "信息详情"
        },
        component: () => import("../views/info/InfoDetailed.vue")
      }
    ]
  },

  // 用户管理

  {
    path: "/user",
    name: "User",
    meta: {
      name: "用户管理",
      icon: "el-icon-user-solid"
    },
    component: Layout,
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          name: "用户列表"
        },
        component: () => import("../views/user/User.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
