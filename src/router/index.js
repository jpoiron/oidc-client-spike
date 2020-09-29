import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AuthService from "../services/AuthService";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  AuthService.getUser().then(user => {
    let notLoggedIn = !user || user.expired;

    if (notLoggedIn) {
      return AuthService.login();
    } else {
      next();
    }
  });
});

export default router;
