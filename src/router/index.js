import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: "/vue-bbs",
  routes: [{
      path: "/",
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: () => import("../components/home/index"),
      meta: {
        title: "主页",
        loginRequired: false
      }
    },
    {
      path: '/community',
      name: 'community',
      component: ()=>import("../components/community/index"),
      meta: {
        title: "社区",
        loginRequired: false
      }
    },

    {
      path: "/community/article/detail/:id",
      name: "article_detail",

      component: ()=>import("../components/articles"),
      meta: {
        title: ""
      }
    },
    {
      path: "/course",
      name: "course",
      component: ()=>import("../components/course/index"),
      meta: {
        title: "课程",
        loginRequired: false
      }
    },
    {
     path: "/course/detail/:id",
     name: "课程详细信息",
     component: ()=>import("../components/course/CourseDetail"),
     meta: {
      loginRequired: false
    }
    },
    {
      path: '/signup',
      name: 'signup',
      component: ()=>import("../components/user/SignUp"),
      meta: {
        title: "登录",
        loginRequired: false
      }
    },
    {
      path: '/user/profile/',
      name: 'profile',
      component: ()=>import('../components/user/UserInfo'),
      meta: {
        title: "个人资料",
        loginRequired: true
      }
      // children:[  // 使用children需要在父路由中使用 route-view
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
      component: ()=>import( "../components/user/Files"),
      meta: {
        title: "我的文件",
        loginRequired: true
      }
    },
    {
      path: '/user/profile/log',
      name: 'log',
      component: ()=>import( "../components/user/LoginLog"),
      meta: {
        title: "登录日志",
        loginRequired: true
      }
    },
    {
      path: '/user/profile/upload',
      name: 'upload',
      component: ()=>import("../components/user/FileUpload"),
      meta: {
        title: "上传文件",
        loginRequired: true
      }
    },
    {
      path: "/user/profile/post",
      name: "post",
      component: ()=>import("../components/user/Post"),
      meta: {
        title: "发帖",
        loginRequired: true
      }
    },
    {
      path: "/user/profile/change-password",
      name: "change-password",
      component: ()=>import("../components/user/PasswordChange"),
      meta: {
        title: "修改密码",
        loginRequired: true
      }
    },
    {
      path: "/user/profile/messages",
      name: "messages",
      component: ()=>import("../components/user/Message"),
      meta: {
        title: "信息通知",
        loginRequired: true
      }
    },
    {
      path: "/user/profile/message-settings",
      name: "message-settings",
      component: ()=>import("../components/user/MessageSettings"),
      meta: {
        title: "消息设置",
        loginRequired: true
      }
    },
    {
      path: "/user/profile/out",
      name: "out",
      component: ()=>import("../components/user/common/Out"),
      meta: {
        title: "注销账号",
        loginRequired: true
      }
    },
    {
      path: "/user/profile/article",
      name: "article",
      component: ()=>import("../components/user/Article"),
      meta: {
        title: "我的帖子",
        loginRequired: true
      }
    },

  ],

})

router.beforeEach((to, from, next) => {
  // to来自  from  去哪
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.loginRequired && !sessionStorage.getItem("isLogin")) {
    Vue.prototype.$message.error("请先进行登录", 2)
    sessionStorage.setItem("next", to.fullPath)
    next("/")
  }

  next()
})

export default router