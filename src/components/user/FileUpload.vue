// TODO: 对文件进行获取存入到form.file,
<template>
 <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">

    <template v-slot:content>
      <a-row>
        <a-col :span="24" :style="{marginTop: '36px'}">
        </a-col>
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
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    @change="handleChange"
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

    <a-form-model-item label="文件名" prop="filename" ref="filename">
      <a-input
        v-model="form.filename"
         placeholder="请输入文件名"
        @submit="
          () => {
            $refs.filename.onFieldsubmit();
          }
        "
      />
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
   
    <a-form-model-item label="文件描述" prop="desc">
      <a-input v-model="form.desc" type="textarea" placeholder="请输入文件描述" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }" >
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
import Profile from "./Profile"

export default {
  data() {
    return {
       thisOpenKeys:["sub3"],  // 打开第三个子菜单
      thisSelectedKeys: ['6'],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        filename: '',
        type: undefined,
        desc: '',
        file: undefined
      },
      rules: {
        filename: [
          { required: true, message: '请选择文件', trigger: 'submit' },
        ],
        type:[
          {required:true, message: "请选择实验类型", trigger: 'submit'}
        ],
        file:[
          {required:true, message: "请选择文件", trigger: 'submit'}
        ],
        
        desc: [{ required: true, message: '请输入实验描述', trigger: 'submit' }],
      },
    };
  },
  components:{
    Profile
  },

  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
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
