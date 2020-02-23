import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import Event from "../views/Page/Event";
import Dashbord from "../views/Page/DashBord";

import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/home",
  //   meta: { requiresAuth: true },
  //   components: {
  //     default: Home,
  //     a: Event
  //   }
  // },
  {
    path: "/",
    component: Home,
    name: "home",
    auth: true,
    children: [
      { path: "/event", component: Event, name: "event" },
      { path: "/dashbord", component: Dashbord, name: "dashbord" }
    ]
  },
  // {
  //   path: "/",
  //   name: "home",
  //   component: Home
  // },
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
