<template>
  <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">

      <template v-slot:content>

  <a-row >
    <a-col :span="20" :offset="6" :style="{marginTop: '50px'}" >
                  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
<a-form-model-item label="有最新评论时通知我" >
      <a-switch v-model="form.comments" />
    </a-form-model-item>
    <a-form-model-item label="有点赞信息时通知我">
      <a-switch v-model="form.like" />
    </a-form-model-item>
    <a-form-model-item label="有收藏信息时通知我">
      <a-switch v-model="form.star" />
    </a-form-model-item>



              </a-form-model>
               <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">
        保存
      </a-button>
      <a-button @click="onReset" style="margin-left: 10px;">
        重置
      </a-button>
    </a-form-model-item>
    </a-col>
  </a-row>

      </template>
  </Profile>
</template>

<script>
import Profile from "./common/Profile";
export default {
  name: "MessageSettings",
  components: {
    Profile,
  },
  data() {
    return {
      thisOpenKeys: ["sub5"], // 打开第三个子菜单
      thisSelectedKeys: ["10"],
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      form: {
        comments:true,
        like: true,
        star: true,
      },
    };

  },
  methods: {
    onSubmit() {
      console.log('submit!', this.form);
      this.$message.success("保存成功", 1);
    },
    onReset(){
      this.form.comments = true,
      this.form.like = true,
      this.form.star = true
      this.$message.info("重置成功", 1)
    }
  },
};
</script>

<style scoped></style>
