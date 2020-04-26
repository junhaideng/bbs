<template>
  <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">
    <template v-slot:content>
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :style="{paddingTop: '80px'}"
      >
      <a-form-item  :wrapper-col="{ span: 14, offset: 4 }">
        <div><h4>请输入你的账号和密码进行注销</h4></div>
      </a-form-item>
        <a-form-item label="用户名">
          <a-input v-model="form.username"></a-input>
        </a-form-item>

        <a-form-item label="密码">
          <a-input v-model="form.password"> </a-input>
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
export default {
  name: "Out",
  components: {
    Profile,
  },
  data() {
    return {
      thisOpenKeys: ["sub4"], // 打开第三个子菜单
      thisSelectedKeys: ["8"],
      form: {
        username: "",
        password: "",
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
    };
  },
  methods:{
    handleClick(){
      this.$message.success("注销成功", 1)
    }
  }
};
</script>

<style scoped></style>
