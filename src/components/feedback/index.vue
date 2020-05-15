<template>
  <div>
    <Header :select-keys="selectKeys"></Header>
    <Content height="600px" :width="'80%'">
      <template v-slot:content>
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :style="{marginTop: '30px'}"
        >
          <a-form-model-item prop="title">
            <span slot="label">
              主题&nbsp;
              <a-tooltip title="让我们更好的了解您的反馈信息">
                <a-icon type="question-circle-o" />
              </a-tooltip>
            </span>
            <a-input v-model="form.title" />
          </a-form-model-item>

          <a-form-model-item prop="email">
            <span slot="label">
              邮箱&nbsp;
              <a-tooltip title="请填写您常用的邮箱地址，以便我们之后联系您">
                <a-icon type="question-circle-o" />
              </a-tooltip>
            </span>
            <a-input v-model="form.email" />
          </a-form-model-item>

          <a-form-model-item label="反馈内容" prop="content">
            <a-input
              v-model="form.content"
              type="textarea"
              :style="{ height: '150px' }"
              placeholder="在这里填写反馈内容"
            />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-row  :style="{float: 'right'}">
                  <a-button type="primary" :loading="loading" @click="onSubmit">
              提交
            </a-button>
            <a-button style="margin-left: 10px;" @click="resetForm">
              重置
            </a-button>
          </a-row>
          </a-form-model-item>
        </a-form-model>
      </template>
    </Content>
    <Footer />
  </div>
</template>

<script>
import Header from "../common/Header";
import Content from "../common/Content";
import Footer from "../common/Footer";
import qs from "qs";

export default {
  name: "feedback",
  components: {
    Header,
    Content,
    Footer,
  },
  data() {
    return {
      selectKeys: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      loading: false,
      form: {
        title: "",
        email: undefined,
        content: "",
      },
      rules: {
        title: [
          {
            required: true,
            message: "请填写反馈主题!",
            trigger: "submit",
          },
        ],
        email: [
          {
            required: true,
            message: "请填写您的邮箱!",
            trigger: "submit",
          },
        ],
        content: [
          {
            required: true,
            message: "请填写反馈内容！",
            trigger: "submit",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
            this.loading = true
          this.$axios
            .post("/api/feedback/submit", qs.stringify(this.form))
            .then((res) => {
              if (res.data.status === 200) {
                  this.loading = false
                this.$refs.ruleForm.resetFields();
                this.$message.success(res.data.message);
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch((err) => {
                this.loading = false
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
