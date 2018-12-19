import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import moment from "moment";
import VModal from "vue-js-modal";

Vue.use(VModal, { dialog: true, dynamic: true});
Vue.config.productionTip = false;
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
});

require("./assets/css/gso.css");
require("./assets/css/obs.css");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
