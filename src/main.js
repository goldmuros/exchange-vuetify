import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { dollarFilter, percentFilter } from "@/helpers/filters";

Vue.filter("dollar", dollarFilter);
Vue.filter("percent", percentFilter);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
