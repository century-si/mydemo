import {
  createMemoryHistory,
  createRouter,
  type RouteRecordRaw,
} from "vue-router";
import { token } from "@/core";
import { warnNotification } from "@/utils/Notification";
import Layout from "@/layout/index.vue"

const publicRoutes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/error/404.vue"),
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/pages/Home.vue"),
      },
      // 这里追加路由
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/Login.vue"),
  },
  {
    path: "/register",
    component: () => import("@/views/register/Register.vue"),
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes: publicRoutes,
});

router.beforeEach((to, from) => {
  if (to.path != "/login" && to.path != "/register" && !token.value) {
    warnNotification("请登录");
    return "/login";
  }

  if (to.path == "/login" && token.value) {
    warnNotification("登录过了你还登个勾8");
    return from.path;
  }
});

export default router;
