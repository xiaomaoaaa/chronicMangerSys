import Vue from 'vue'
import App from './app'
// import vueResource from 'vue-resource'
// Vue.use(vueResource)
import vueForm from 'vue-form'
Vue.use(vueForm)


/* eslint-disable no-new */
new Vue({
	el: 'body',
	components: {
		App
	}
})