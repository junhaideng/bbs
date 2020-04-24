<template>
  <a-layout>
    <a-layout-header style="background: #fff; padding: 0">
      <a-row>
        <a-col :xs="{ span: 4, offset: 2 }" :sm="{ span: 16, offset: 1 }">
          <a-col>
            <a-menu
              theme="light"
              mode="horizontal"
              :style="{ lineHeight: '64px' }"
              v-model="keys"
            >
              <a-menu-item key="1">
                <a href="/index">
                  <a-icon type="home" />
                  主页</a
                >
              </a-menu-item>
              <a-menu-item key="2">
                <a href="/course">
                  <a-icon type="book" />
                  课程</a
                >
              </a-menu-item>
              <a-menu-item key="3">
                <a href="/community">
                  <a-icon type="wechat" />
                  社区</a
                >
              </a-menu-item>
            </a-menu>
          </a-col>
        </a-col>
        <div v-if="isLogin">
          <a-col
            :xs="{ span: 4, offset: 14 }"
            :sm="{ span: 3, offset: 4 }"
            :md="{ span: 2, offset: 4 }"
            :lg="{ span: 2, offset: 5 }"
            :xl="{ span: 1, offset: 5 }"
          >
            <a-dropdown>
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                <a-badge
                  :count="messageCount"
                  :title="'你有' + messageCount + '未读信息'"
                  dot
                  ><a-avatar
                    src="https://dummyimage.com/200x100/50B347/FFF&text=Mock.js"
                  /> </a-badge
                ><a-icon type="down" />
              </a>
              <a-menu slot="overlay" :style="{ paddingTop: '0.5rem' }">
                <a-menu-item>
                  <a :style="{ marginRight: '0.5rem' }" href="/user/profile">
                    <a-icon type="user" :style="{ marginRight: '0.5rem' }" />
                    个人中心</a
                  >
                </a-menu-item>
                <a-menu-item>
                  <a href="/user/profile/change-password">
                    <a-icon type="setting" :style="{ marginRight: '0.5rem' }" />
                    账号设置</a
                  >
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item>
                  <a href="/user/profile/article">
                    <a-icon type="history" :style="{ marginRight: '0.5rem' }" />
                    我的帖子</a
                  >
                </a-menu-item>
                <a-menu-item>
                  <a href="/user/profile/article">
                    <a-icon type="edit" :style="{ marginRight: '0.5rem' }" />
                    管理帖子</a
                  >
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item>
                  <a href="/user/profile/files">
                    <a-icon type="file" :style="{ marginRight: '0.5rem' }" />
                    我的文件</a
                  >
                </a-menu-item>
                <a-menu-item>
                  <a href="/user/profile/upload">
                    <a-icon type="upload" :style="{ marginRight: '0.5rem' }" />
                    文件上传</a
                  >
                </a-menu-item>
                <a-menu-item>
                  <a href="/download">
                    <!--TODO 文件下载界面-->
                    <a-icon
                      type="download"
                      :style="{ marginRight: '0.5rem' }"
                    />
                    文件下载</a
                  >
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item>
                  <a href="/user/profile/messages">
                    <a-badge :count="messageCount" :offset="[7, -2]" >
                      <a-icon type="bell" :style="{ marginRight: '0.5rem' }" />
                      通知信息
                    </a-badge>
                  </a>
                </a-menu-item>
                <a-menu-item :style="{ paddingBottom: '0.5rem' }">
                  <a href="/feedback">
                    <!--反馈界面-->
                    <a-icon type="form" :style="{ marginRight: '0.5rem' }" />
                    我要反馈</a
                  >
                </a-menu-item>
                <a-menu-divider />

                <a-menu-item>
                  <a href="/logout">
                    <a-icon type="logout" :style="{ marginRight: '0.5rem' }" />
                    退出登录
                  </a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </a-col>
        </div>

        <div v-else>
          <a-col
            :xs="{ span: 6, offset: 12 }"
            :sm="{ span: 3, offset: 3 }"
            :md="{ span: 4, offset: 3 }"
            :lg="{ span: 2, offset: 4 }"
            :xl="{ span: 2, offset: 4 }"
          >
            <a-list
              :style="{ marginTop: '20px', fontSize: '16px' }"
              :grid="{ column: 2 }"
            >
              <a-list-item :style="{ width: '40px' }">
                <a @click="login" :style="{ marginRight: '0.5rem' }">登录</a>
                <a-modal
                  :title="'登录'"
                  :footer="null"
                  :visible="visible"
                  :centered="true"
                  @cancel="handleCancel"
                >
                  <Login ref="login" @click="login" />
                </a-modal>
              </a-list-item>

              <a-list-item :style="{ width: '40px' }">
                <a href="/signup">注册</a>
              </a-list-item>
            </a-list>
          </a-col>
        </div>
      </a-row>
    </a-layout-header>
  </a-layout>
</template>

<script>
import Login from "./user/Login";
import { mapActions, mapState } from "vuex";

export default {
  name: "Header",
  props: {
    selectKeys: {
      default() {
        return ["1"];
      },
    },
  },
  mounted() {
    this.getMessageCount();
  },
  components: {
    Login,
  },
  data() {
    return {
      isLogin: true,
      visible: false,
      keys: this.selectKeys,
    };
  },
  computed: {
    ...mapState(["messageCount"]),
  },

  methods: {
    login() {
      this.visible = !this.visible;
    },
    handleCancel() {
      this.visible = !this.visible;
      this.$refs.login.clearInput();
    },
    ...mapActions(["getMessageCount"]),
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
