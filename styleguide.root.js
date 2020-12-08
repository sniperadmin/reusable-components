import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("en", en);

// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("validation-provider", ValidationProvider);

export default previewComponent => {
	// https://vuejs.org/v2/guide/render-function.html
	return {
		render(createElement) {
			return createElement('v-app', [createElement(previewComponent)])
		}
	}
}
