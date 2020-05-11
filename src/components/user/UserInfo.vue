<template>
  <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">
    <template v-slot:content>
      <a-row :style="{ paddingTop: '10px' }">
        <a-col :span="8" :offset="1">
          <h2>个人资料</h2>
        </a-col>
      </a-row>
      <a-divider></a-divider>
      <a-row align="top">
        <a-col :span="3" :offset="3">
          <a-avatar src="/api/user/avatar/get" :size="64"></a-avatar>
        </a-col>
        <a-col :span="9">
          <a-row>
            <a-col :span="9" :style="{ marginBottom: '10px' }">
              用户名: {{ form.username }}
            </a-col>
          </a-row>
          <a-row>
            <keep-alive>
              <a-col :span="24">
                个人简介:
                <div :style="{ lineHeight: '40px' }">
                  <div v-if="flag">
                    <div
                      v-if="
                        form.description == null ||
                          form.description.trim() == ''
                      "
                    >
                      这个人太懒了，什么也没有留下
                    </div>
                    <div v-else>
                      {{ form.description }}
                    </div>
                  </div>
                  <a-input v-else type="text" v-model="form.description">{{
                    form.description
                  }}</a-input>
                </div>
              </a-col>
            </keep-alive>
          </a-row>
        </a-col>
      </a-row>
      <a-row :style="{ marginTop: '10px' }">
        <a-col :span="3" :offset="3">
          <a href="javascript:void(0);" @click="uploadAvatar">修改头像</a>
        </a-col>
      </a-row>
      <a-modal
        title="点击上传你的头像   "
        centered
        v-model="visible"
        @ok="handleOk"
        @cancel="handleCancel"
        :bodyStyle="{ height: '200px' }"
        :width="400"
      >
        <a-row>
          <a-col :span="12" offset="6">
            <a-upload
              name="file"
              action="/api/user/avatar/upload"
              @change="handleChange"
            >
              <a-button> <a-icon type="upload" /> Click to Upload </a-button>
            </a-upload>
          </a-col>
        </a-row>
      </a-modal>
      <a-divider></a-divider>

      <a-form-model
        v-model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="学院">
          <keep-alive>
            <div v-if="flag">{{ form.academy }}</div>
            <a-select v-else v-model="form.academy">
              <a-select-option
                v-for="(academy, index) in academySource"
                :key="index"
                :value="academy"
                >{{ academy }}</a-select-option
              >
            </a-select>
          </keep-alive>
        </a-form-item>
        <a-form-item label="性别">
          <div v-if="flag">{{ form.gender }}</div>
          <a-radio-group v-else v-model="form.gender">
            <a-radio value="男">男</a-radio>
            <a-radio value="女">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="年纪">
          <keep-alive>
            <div v-if="flag">
              {{ form.age }}
            </div>
            <a-input-number v-model="form.age" v-else></a-input-number>
          </keep-alive>
        </a-form-item>
        <a-form-item label="年级">
          <keep-alive>
            <div v-if="flag">{{ form.grade }}</div>

            <a-select v-else v-model="form.grade">
              <a-select-option key="1" value="大一">大一</a-select-option>
              <a-select-option key="2" value="大二">大二</a-select-option>
              <a-select-option key="3" value="大三">大三</a-select-option>
              <a-select-option key="4" value="大四">大四</a-select-option>
              <a-select-option key="5" value="其他">其他</a-select-option>
            </a-select>
          </keep-alive>
        </a-form-item>
        <a-form-item label="邮箱">
          <div v-if="flag">{{ form.email }}</div>
          <a-input v-else type="email" v-model="form.email"></a-input>
        </a-form-item>
      </a-form-model>

      <a-row :style="{ paddingBottom: '20px' }">
        <a-col :span="20" :offset="3">
          <a-button type="primary" v-if="flag" @click="modify">
            修改
          </a-button>
          <div v-else>
            <a-button type="primary" @click="save">
              保存
            </a-button>
            <a-button
              type="primary"
              :style="{ marginLeft: '30px' }"
              @click="cancel"
            >
              取消
            </a-button>
          </div>
        </a-col>
      </a-row>
    </template>
  </Profile>
</template>

<script>
const data = ["学院", "性别", "年龄", "年级", "邮箱"];
// [
//     {type: "学院", name: "电院"},
//     {type: "性别", name: "男"},
//     {type: "年龄", name: "20"},
//     {type: "年级", name: "大二"},
//     {type: "邮箱", name:"201648748@qq.com"}
// ]

const academySource = ["电院", "农生", "材料", "生医工", "安泰", "人文"];

import Profile from "./common/Profile";
import qs from 'qs';

export default {
  name: "UserInfo",
  components: {
    Profile,
  },
  data() {
    return {
      thisOpenKeys: ["sub1"], // 打开第三个子菜单
      thisSelectedKeys: ["1"],
      flag: true,
      data,
      academySource,
      form: {
        username: "",
        academy: "",
        gender: "",
        age: "",
        grade: "",
        email: "",
        description: "",
        avatar: "",
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
      visible: false, // 修改头像的弹出框，
    };
  },
  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post("/api/user/info")
          .then((res) => {
            this.form = res.data;
            resolve(res);
            console.log(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    uploadAvatar() {
      console.log("upload a new avatar");
      this.visible = true;
    },
    modify() {
      this.flag = false;
    },
    save() {
      this.flag = true;
      console.log(this.form);
      this.$axios.post("/api/user/updateUserInfo", qs.stringify(this.form)).then(res=>{
        if(res.data.status===200){
          this.$message.success(res.data.message)
        }else{
          this.$message.error(res.data.message)
        }
      })
    },
    cancel() {
      this.getData().then(() => {
        this.flag = true;
      });
    },

    // 弹出框
    handleOk() {
      console.log("ok");
      this.$message.success("头像修改成功", 1);
      this.visible = false;
    },
    handleCancel() {
      console.log("cancel");
    },
    handleChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        window.location.reload();
        this.$message.success("头像上传成功");
        this.visible = false;
      } else if (info.file.status === "error") {
        this.$message.error(`头像上传失败`);
      }
    },
  },
};
</script>
