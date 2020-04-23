import Vue from 'vue'
import Router from 'vue-router'
import Community from "../components/Community";
import Course from "../components/Course";
import Home from "../components/Home";
import SignUp from "../components/user/SignUp";
import Profile from '../components/user/Profile'
import Files from "../components/user/Files";
import LoginLog from "../components/user/LoginLog"
import FileUpload from "../components/user/FileUpload"
import Article from "../components/user/Article"
import Post from "../components/user/Post"
import Message from "../components/user/Message"
import MessageSettings from "../components/user/MessageSettings"
import Out from "../components/user/Out"
import PasswordChange from "../components/user/PasswordChange"

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
      path: "/",
      redirect: '/index'
    },
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
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/user/profile/',
      name: 'profile',
      component: Profile,
      // children:[
      //   {
      //     path: 'files',  // 不要加  / 否则被认为是根目录
      //     name: 'files',
      //     component: Files
      //   },
      //   {
      //     path: 'log',
      //     name: 'log',
      //     component: LoginLog
      //   }
      // ]
    },
    {
      path: '/user/profile/files',
      name: 'files',
      component: Files
    },
    {
      path: '/user/profile/log',
      name: 'log',
      component: LoginLog
    },
    {
      path: '/user/profile/upload',
      name: 'upload',
      component: FileUpload
    },
    {
      path: "/user/profile/post",
      name: "post",
      component: Post
    },
    {
      path: "/user/profile/change-password",
      name: "change-password",
      component: PasswordChange
    },
    {
      path: "/user/profile/messages",
      name: "messages",
      component: Message
    },
    {
      path: "/user/profile/message-settings",
      name: "message-settings",
      component: MessageSettings
    },
    {
      path: "/user/profile/out",
      name: "out",
      component: Out
    },
    {
      path: "/user/profile/article",
      name: "article",
      component: Article
    }
  ],

})