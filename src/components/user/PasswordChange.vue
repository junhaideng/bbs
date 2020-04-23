<template>
  <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">

      <template v-slot:content>
          修改密码 界面
      </template>
  </Profile>
</template>

<script>
import Profile from "./Profile";
export default {
  name: "PasswordChange",
  components: {
    Profile,
  },
  data() {
    return {
      thisOpenKeys: ["sub4"], // 打开第三个子菜单
      thisSelectedKeys: ["7"],
    };
  },
};
</script>

<style scoped></style>
