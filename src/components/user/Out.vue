<template>
  <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">

      <template v-slot:content>
         注销界面
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
    };
  },
};
</script>

<style scoped></style>
