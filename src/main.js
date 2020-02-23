import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import * as firebase from "firebase/app";
import { firebaseConfig } from "./config";
import axios from "axios";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(vuetify);

firebase.initializeApp(firebaseConfig);

let app;
firebase.auth().onAuthStateChanged(user => {
  console.log(user);
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,

      render: h => h(App)
    }).$mount("#app");
  }
});
// new Vue({
//   router,
//   store,
//   vuetify,

//   render: h => h(App)
// }).$mount("#app");
