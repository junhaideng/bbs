// TODO: 对文件进行获取存入到form.file,
<template>
  <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">
    <template v-slot:content>
      <a-row>
        <a-col :span="24" :style="{ marginTop: '36px' }"> </a-col>
        <a-col :span="18" :offset="3">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="选择文件" prop="file" ref="file">
              <a-upload-dragger
                :before-upload="beforeUpload"
                name="file"
                :file-list="form.file"
                action="/api/user/uploadfile"
                @change="handleChange"
                :preview-file="previewFile"
              >
                <p class="ant-upload-drag-icon">
                  <a-icon type="inbox" />
                </p>
                <p class="ant-upload-text">点击或拖拽上传文件</p>
                <p class="ant-upload-hint">
                  仅可选择单个文件
                </p>
              </a-upload-dragger>
            </a-form-model-item>


            <a-form-model-item label="实验类型" prop="type">
              <a-select v-model="form.type" placeholder="请选择实验类型">
                <a-select-option value="physical">
                  物理实验
                </a-select-option>
                <a-select-option value="chemical">
                  化学实验
                </a-select-option>
                <a-select-option value="elec">
                  电子技术实验
                </a-select-option>
                <a-select-option value="electronic">
                  基电实验
                </a-select-option>
              </a-select>
            </a-form-model-item>

            <a-form-model-item label="文件描述" prop="description">
              <a-input
                v-model="form.description"
                type="textarea"
                placeholder="请输入文件描述"
                :style="{minHeight: '110px'}"
              />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button type="primary" @click="onSubmit">
                提交
              </a-button>
              <a-button style="margin-left: 10px;" @click="resetForm">
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
import Profile from "./common/Profile";

export default {
  data() {
    return {
      thisOpenKeys: ["sub3"], // 打开第三个子菜单
      thisSelectedKeys: ["6"],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      form: {
        type: undefined,
        description: "",
        file: [],
      },
      rules: {
        type: [
          { required: true, message: "请选择实验类型", trigger: "submit" },
        ],
        file: [{ required: true, message: "请选择文件", trigger: "submit" }],

        description: [
          { required: true, message: "请输入实验描述", trigger: "submit" },
        ],
      },
    };
  },
  components: {
    Profile,
  },

  methods: {
    beforeUpload(file) {
      this.form.file = [...this.form.file, file];
      return false;
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let form = new FormData();

          form.append("file", this.form.file[0].originFileObj)
          form.append("description", this.form.description)
          form.append("type", this.form.type)

          this.$axios.post("/api/file/uploadfile",form,{
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          ).then((res) => {
            if (res.data.status === 200) {
              window.location.reload();
              this.$message.success(res.data.message);
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleChange(info) {
      let fileList = [...info.fileList];
      //  Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-1);

      this.form.file = fileList;
    },
    previewFile() {
      return false;
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
