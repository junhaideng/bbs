<template>
  <div>

              <a-row>
                  <a-col :style="{textAlign: 'center'}">
                      Please sign in
                  </a-col>
              </a-row>
              <div :style="{margin: '36px'}"></div>

              <a-row>
                  <a-col :xs="{span:20, offset:2}" :sm="{span:20, offset:1}" :md="{span:18, offset:2}"
                         :lg="{span:16, offset:2}" :xl="{span:16, offset:2}">
                      <a-form :form="form" @submit="handleSubmit">
                          <a-form-item v-bind="formItemLayout">
      <span slot="label">
        用户名
      </span>
                              <a-input
                                      v-decorator="[
          'username',
          {
            rules: [{ required: true, message: '请输入你的用户名!', whitespace: true }],
          },
        ]"
                              />
                          </a-form-item>

                          <a-form-item v-bind="formItemLayout" label="密码" >
                              <a-input-password
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
                              <a-button type="primary" html-type="submit" :style="{float:'right'}">
                                  登录
                              </a-button>
                          </a-form-item>
                      </a-form>

                  </a-col>
              </a-row>

  </div>
</template>

<script>
    import axios from 'axios'

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
            this.form = this.$form.createForm(this, { name: 'register' });
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        // 将value上传到服务端
                        console.log('Received values of form: ', values.username, values.password);
                        this.$emit('login');


                        axios.post("/user/login", {username:values.username,
                        password: values.password})
                            .then(data=>(this.$message.success(data)))
                            .catch(err=>(this.$message.error(err)));
                    }
                });
            },
            handleConfirmBlur(e) {
                const value = e.target.value;
                console.log(value);
                this.confirmDirty = this.confirmDirty || !!value;
            },
        },
    };
</script>
