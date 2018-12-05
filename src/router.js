import Vue from "vue";
import Router from "vue-router";
import Welcome from "./components/welcome.vue";
import Documents from "./components/document/all-documents.vue";
import AddVersion from "./components/version/add-version.vue"
import EditVersion from "./components/version/edit-version.vue";

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
      path: "/document/:doc_id/add",
      name: "add-version",
      component: AddVersion
    },
    {
      path: "/version/:version_id/edit",
      name: "edit-version",
      component: EditVersion
    }
  ]
});
