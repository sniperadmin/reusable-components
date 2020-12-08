import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import {
  ValidationObserver,
  ValidationProvider,
} from "vee-validate";

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("validation-provider", ValidationProvider);

new Vue({
  render: h => h(App),
}).$mount('#app')
