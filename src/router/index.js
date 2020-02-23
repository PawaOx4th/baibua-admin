import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";

import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "singin",
    component: SignIn
  },
  {
    path: "/singin",
    name: "singin",
    component: SignIn
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticate = firebase.auth().currentUser;
  if (requiresAuth && !isAuthenticate) {
    next("/singin");
  } else {
    next();
  }
});

export default router;
