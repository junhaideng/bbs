<template>
  <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">
    <template v-slot:content>
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :style="{ paddingTop: '80px' }"
      >
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <div><h4>请输入你的账号和密码进行注销</h4></div>
        </a-form-item>
        <a-form-item label="用户名">
          <a-input v-model="form.username" :placeholder="username"></a-input>
        </a-form-item>

        <a-form-item label="密码">
          <a-input type="password" v-model="form.password"> </a-input>
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="danger" @click="handleClick">注销</a-button>
        </a-form-item>
      </a-form-model>
    </template>
  </Profile>
</template>

<script>
import Profile from "./Profile";
import qs from "qs";

export default {
  name: "Out",
  components: {
    Profile,
  },
  data() {
    return {
      thisOpenKeys: ["sub4"], // 打开第三个子菜单
      thisSelectedKeys: ["8"],
      username: sessionStorage.getItem("username"),
      form: {
        username: "",
        password: "",
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
    };
  },
  methods: {
    handleClick() {
      if (this.form.username.trim() === "") {
        this.$message.error("请输入用户名");
      } else if (this.form.password.trim() === "") {
        this.$message.error("请输入密码");
      } else {
        var that = this;
        this.$confirm({
          title: "你确定要删除该账号？",
          okText: "确定",
          okType: "danger",
          cancelText: "取消",
          centered: true,
          onOk() {
            that.$axios
              .post("/api/user/delete", qs.stringify(that.form))
              .then((res) => {
                if (res.data.status === 200) {
                  that.$message.success(res.data.message);
                } else {
                  that.$message.error(res.data.message);
                }
              });
          },
          onCancel() {},
        });
      }
    },
  },
};
</script>

<style scoped></style>
