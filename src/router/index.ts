import { facts } from "@/assets/facts";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/fact/:id",
    name: "Fact",
    component: () => import("../views/Fact.vue"),
    beforeEnter: (to, _, next) => {
      const { id } = to.params;

      if (Array.isArray(id)) {
        next({ path: "/error" });
        return;
      }

      // Is a valid index number
      const index = parseInt(id);
      if (index < 0 || index >= facts.length) {
        next({ path: "/error" });
        return;
      }

      next();
    },
  },
  {
    path: "/facts",
    name: "FactList",
    component: () => import("../views/FactList.vue"),
  },
  {
    path:'/:catchAll(.*)',
    name:'PageNotFound',
    component:() => import('../views/PageNotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
