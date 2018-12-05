import Vue from "vue";
import Router from "vue-router";
import Welcome from "./components/welcome.vue";
import Documents from "./components/document/all-documents.vue";
import AddVersion from "./components/version/add-version.vue"

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
      path: "/documents",
      name: "documents",
      component: Documents
    },
    {
      path: "/version/add",
      name: "add-version",
      component: AddVersion
    }
  ]
});
