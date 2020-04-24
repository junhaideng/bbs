<template>
  <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">
    <template v-slot:content>
      <a-row :style="{paddingTop: '40px'}">
        <a-col :span="16" :offset="4">
          <a-form-model
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            v-bind="layout"
          >
          <a-form-item label="用户名">
            <div>{{username}}</div>
          </a-form-item>
            <a-form-model-item label="旧密码" prop="pass">
              <a-input
                v-model="ruleForm.pass"
                type="password"
                autocomplete="off"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="新密码" prop="checkPass">
              <a-input
                v-model="ruleForm.checkPass"
                type="password"
                autocomplete="off"
              />
            </a-form-model-item>

        
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button type="primary" @click="submitForm('ruleForm')">
                修改
              </a-button>
              <a-button
                style="margin-left: 10px"
                @click="resetForm('ruleForm')"
              >
                重置
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-col>
      </a-row>
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
  
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      }else{
        callback()
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("新密码不能为空"));
      } else if (value === this.ruleForm.pass) {
        callback(new Error("输入的前后密码不能够相同"));
      } else if(value.length <6){
callback(new Error("新密码长度不能够小于6"))
      }
      else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "change" }],
        checkPass: [{ validator: validatePass2, trigger: "change" }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      thisSelectedKeys: ["7"],
      thisOpenKeys: ["sub4"],
      username: "Edgar", // TODO 
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("可以上传数据了")
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped></style>
