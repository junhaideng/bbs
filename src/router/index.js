import Vue from 'vue'
import Router from 'vue-router'
import Community from "../components/community/index";
import Course from "../components/course/index";
import Home from "../components/home/index";
import SignUp from "../components/user/SignUp";
import UserInfo from '../components/user/UserInfo'
import Files from "../components/user/Files";
import LoginLog from "../components/user/LoginLog"
import FileUpload from "../components/user/FileUpload"
import Article from "../components/user/Article"
import Post from "../components/user/Post"
import Message from "../components/user/Message"
import MessageSettings from "../components/user/MessageSettings"
import Out from "../components/user/common/Out"
import PasswordChange from "../components/user/PasswordChange"

Vue.use(Router);

const router =  new Router({
  mode: 'history',
  routes: [{
      path: "/",
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Home,
      meta:{
        title: "主页",
        loginRequired: false
      }
    },
    {
      path: '/community',
      name: 'community',
      component: Community,
      meta:{
        title: "社区",
        loginRequired: false
      }
    },
    {
      path: "/course",
      name: "course",
      component: Course,
      meta:{
        title: "课程",
        loginRequired: false
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      meta:{
        title: "登录",
        loginRequired: false
      }
    },
    {
      path: '/user/profile/',
      name: 'profile',
      component: UserInfo,
      meta:{
        title: "个人资料",
        loginRequired: true
      }
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
      component: Files,
      meta:{
        title: "我的文件",
        loginRequired: true
      }
    },
    {
      path: '/user/profile/log',
      name: 'log',
      component: LoginLog,
      meta:{
        title: "登录日志",
        loginRequired: true
      }
    },
    {
      path: '/user/profile/upload',
      name: 'upload',
      component: FileUpload,
      meta:{
        title: "上传文件",
        loginRequired: true
      }
    },
    {
      path: "/user/profile/post",
      name: "post",
      component: Post,
      meta:{
        title: "发帖",
        loginRequired: true
      }
    },
    {
      path: "/user/profile/change-password",
      name: "change-password",
      component: PasswordChange,
      meta:{
        title: "修改密码",
        loginRequired: true
      }
    },
    {
      path: "/user/profile/messages",
      name: "messages",
      component: Message,
      meta:{
        title: "信息通知",
        loginRequired: true
      }
    },
    {
      path: "/user/profile/message-settings",
      name: "message-settings",
      component: MessageSettings,
      meta:{
        title: "消息设置",
        loginRequired: true
      }
    },
    {
      path: "/user/profile/out",
      name: "out",
      component: Out,
      meta:{
        title: "注销账号",
        loginRequired: true
      }
    },
    {
      path: "/user/profile/article",
      name: "article",
      component: Article,
      meta:{
        title: "我的帖子",
        loginRequired: true
      }
    }
  ],

})

router.beforeEach((to, from, next) => {
  // to来自  from  去哪
  if(to.meta.title) {
    document.title = to.meta.title
  }
  if(to.meta.loginRequired && !sessionStorage.getItem("isLogin")){
    Vue.prototype.$message.error("请先进行登录", 2)
    sessionStorage.setItem("next", to.fullPath)
    next("/")
  }

  next()
})

export default router
