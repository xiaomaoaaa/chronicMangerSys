import Vue from 'vue'
import App from './app'
import vueForm from 'vue-form'
Vue.use(vueForm)


/* eslint-disable no-new */
new Vue({
	el: 'body',
	components: {
		App
	}
})