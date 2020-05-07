<template>
  <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">
    <template v-slot:content>
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :style="{ paddingTop: '20px' }"
      >
        <a-form-item label="标题">
          <a-input
            v-model="form.title"
            required
            placeholder="请输入帖子的标题"
          ></a-input>
        </a-form-item>
        <a-form-item label="类型">
          <a-select placeholder="请选择相应的课程" v-model="form.type">
            <a-select-option
              v-for="(value, key, index) in courseType"
              :key="index"
              :value="key"
            >
              {{ value }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="内容">
          <a-textarea
            v-model="form.content"
            :style="{ minHeight: '200px' }"
            placeholder="在这里输入你想要发送的内容"
          ></a-textarea>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="handleSubmit">发帖</a-button>
        </a-form-item>
      </a-form-model>
    </template>
  </Profile>
</template>

<script>
const courseType = {
  physical: "物理实验",
  chemical: "化学实验",
  electronic: "电子技术实验",
};

import qs from "qs";
import Profile from "./common/Profile";
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
      form: {
        title: "",
        type: undefined,
        content: "",
      },
      courseType,
    };
  },
  methods: {
    handleSubmit() {
      if (this.form.title.trim() === "") {
        this.$message.error("标题不能为空");
      } else if (this.form.type === undefined) {
        this.$message.error("帖子类型不能为空");
      } else if (this.form.content.trim() === "") {
        this.$message.error("内容不能为空");
      } else {
        this.$axios
          .post("/api/user/post", qs.stringify(this.form))
          .then((res) => {
            if (res.data.status === 200) {
              this.$message.success("发帖成功");
              window.location.reload();
            } else {
              this.$message.error(res.data.message);
            }
          });
      }
    },
  },
};
</script>

<style scoped></style>
