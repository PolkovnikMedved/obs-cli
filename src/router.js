import Vue from "vue";
import Router from "vue-router";
import Welcome from "./components/welcome.vue";
import Versions from "./components/version/all-versions.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "welcome",
      component: Welcome
    },
    {
      path: "/versions",
      name: "versions",
      component: Versions
    }
  ]
});
