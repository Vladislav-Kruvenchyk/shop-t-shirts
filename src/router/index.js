import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "vMain",
    component: () => import("../components/main/v.main.vue"),
  },
  {
    path: "/catalog",
    name: "vCatalog",
    component: () => import("../components/catalog/catalog.vue"),
  },
  {
    path: "/cart",
    name: "vCart",
    props: true,
    component: () => import("../components/cart/cart.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
