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
          <a-select
          show-search
            placeholder="请选择相应的课程"
            :value="form.type"
              :default-active-first-option="false"
            :not-found-content="null"
            @search="handleSearch"
            :show-arrow="false"
            :filter-option="false"
            @change="handleChange"
          >
<a-select-option
              v-for="(value, index) in courseType"
              :key="index"
              :value="value.course_name"
            >
              {{ value.course_name }}
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
      courseType: [],
    };
  },
  mounted() {
    // this.getCourse();
  },
  methods: {
    handleSubmit() {
      if (this.form.title.trim() === "") {
        this.$message.error("标题不能为空");
      } else if (this.form.type === undefined || this.form.type==="") {
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
    getCourse() {
      return new Promise((resolve, reject) => {
        this.$axios
          .get("/api/course/get_all_course")
          .then((res) => {
            this.courseType = res.data;
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },
    handleSearch(value) {
      if(value.trim()!==""){
        this.$axios
        .post("/api/course/get_by_value", qs.stringify({ value: value }))
        .then((res) => {
          this.courseType = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      }
    },
    handleChange(value){
      this.form.type = value;
    }
  },
};
</script>

<style scoped></style>
