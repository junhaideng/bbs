<template>
  <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">

      <template v-slot:content>
          <a-form-model :model="form"  :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :style="{paddingTop: '20px'}">
  <a-form-item label="标题" >
    <a-input v-model="form.title" required placeholder="请输入帖子的标题"></a-input>
  </a-form-item>
  <a-form-item label="类型">
    <a-select v-model="form.type" placeholder="请选择相应的课程">
      <a-select-option v-for="(value, key, index) in courseType" :key="index" :value="key" > {{value}}  </a-select-option>
    </a-select>
  </a-form-item>
  <a-form-item label="内容"  >
    <a-textarea v-model="form.content" :style="{minHeight: '200px'}" placeholder="在这里输入你想要发送的内容"></a-textarea>
  </a-form-item>
  <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
    <a-button type="primary" @click="handleSubmit" >发帖</a-button>
  </a-form-item>
          </a-form-model>
      </template>
  </Profile>
</template>

<script>
const courseType = {"physical":"物理实验", "chemical":"化学实验", "electronic":"电子技术实验"}

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
         labelCol: { span: 4 },
      wrapperCol: { span: 12 },
      form:{
        title: undefined,
type: undefined,
content: undefined

      },
      courseType
    };
  },
  methods:{
    handleSubmit(){
      console.log(this.form)
      this.$message.success("发帖成功", 1)
    }
  }
};
</script>

<style scoped></style>
