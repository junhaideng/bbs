import Vue from 'vue'
import Router from 'vue-router'
import Community from "../components/Community";
import Course from "../components/Course";
import Home from "../components/Home";
// import Login from "../components/user/Login";
import SignUp from "../components/user/SignUp";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/index',
      name: 'index',
      component: Home
    },
    {
      path: '/community',
      name: 'community',
      component: Community
    },
    {
      path: "/course",
      name: "course",
      component: Course
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login
    // },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
  ]
})
