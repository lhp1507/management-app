import Vue from "vue";
import Vuelidate from "vuelidate";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCog,
  faCalculator,
  faCaretDown,
  faUserCircle,
  faEdit,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faCog,
  faCalculator,
  faCaretDown,
  faUserCircle,
  faEdit,
  faEye,
  faTrash
);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
