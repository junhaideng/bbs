<template>
  <div id="login">
    <a-row>
      <a-col :style="{ textAlign: 'center' }">
        Please sign in
      </a-col>
    </a-row>
    <div :style="{ margin: '36px' }"></div>

    <a-row>
      <a-col
        :xs="{ span: 20, offset: 2 }"
        :sm="{ span: 20, offset: 1 }"
        :md="{ span: 18, offset: 2 }"
        :lg="{ span: 16, offset: 2 }"
        :xl="{ span: 16, offset: 2 }"
      >
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item v-bind="formItemLayout">
            <span slot="label">
              用户名
            </span>
            <a-input
              :key="1"
              v-decorator="[
                'username',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入你的用户名!',
                      whitespace: true,
                    },
                  ],
                },
              ]"
            />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="密码">
            <a-input-password
              :key="2"
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入你的密码!',
                    },
                  ],
                },
              ]"
              type="password"
            />
          </a-form-item>
          <a-form-item v-bind="tailFormItemLayout">
            <a-button
              type="primary"
              html-type="submit"
              :style="{ float: 'right' }"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          // 将value上传到服务端
          this.login(values)
            .then((res) => {
              if (res.data.status === 200) {
                this.form.resetFields();
                this.$emit("close", false);
                this.setIsLogin(true);
                sessionStorage.setItem("isLogin", true);
                sessionStorage.setItem("username", values.username);
                window.location.reload();
                this.$message.success(res.data.message);
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch((err) => {
              if (err.response.status === 500) {
                this.$message.error("服务端异常");
              }
            });
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    clearInput() {
      this.form.resetFields();
    },

    ...mapActions(["login", "setIsLogin"]),
  },
};
</script>
