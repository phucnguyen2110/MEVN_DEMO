import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
Vue.config.productionTip = false
import * as VueGoogleMaps from "vue2-google-maps" // Import package
Vue.use(VueGoogleMaps, {
    load: {
    key: "AIzaSyD57PRHJQSQ5XQOuNtAWpRBOP-UCX5pSzA",
    libraries: "places"
    }
});
new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
