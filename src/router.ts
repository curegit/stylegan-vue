import { createRouter, createWebHistory } from "vue-router";

import HomeView from "./views/HomeView.vue";
import WorkspaceView from "./views/WorkspaceView.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/workspace",
      name: "workspace",
      component: WorkspaceView,
    },
    {
      path: "/:path(.*)*",
      name: "NotFound",
      redirect: { name: "home" },
    },
  ],
  sensitive: true,
});
