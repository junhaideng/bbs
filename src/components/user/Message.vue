<template>
  <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">

      <template v-slot:content>
         我的通知
      </template>
  </Profile>
</template>

<script>
import Profile from "./Profile";
export default {
  name: "Message",
  components: {
    Profile,
  },
  data() {
    return {
      thisOpenKeys: ["sub5"], // 打开第三个子菜单
      thisSelectedKeys: ["9"],
    };
  },
};
</script>

<style scoped></style>
