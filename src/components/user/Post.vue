<template>
  <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">

      <template v-slot:content>
          post 界面
      </template>
  </Profile>
</template>

<script>
import Profile from "./Profile";
export default {
  name: "Post",
  components: {
    Profile,
  },
  data() {
    return {
      thisOpenKeys: ["sub2"], // 打开第三个子菜单
      thisSelectedKeys: ["4"],
    };
  },
};
</script>

<style scoped></style>
