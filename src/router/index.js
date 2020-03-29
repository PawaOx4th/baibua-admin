import * as firebase from "firebase/app";
import "firebase/auth";

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import Event from "../views/Page/Event";
import User from "../views/Page/User";
import Subject from "../views/Page/Subject";
import Section from "../views/Page/Section";
import Student from "../views/Page/Student";

Vue.use(VueRouter);

const routes = [
  {
    path: "/event",
    component: Home,
    name: "home",
    children: [
      { path: "/event", component: Event, name: "event" },

      {
        path: "/user",
        component: User,
        name: "User"
      },
      {
        path: "/subject",
        component: Subject,
        name: "Subject"
      },
      {
        path: "/section",
        component: Section,
        name: "Section"
      },
      {
        path: "/student",
        component: Student,
        name: "Student"
      }
    ]
  },

  {
    path: "/",
    name: "singin",
    component: SignIn
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
