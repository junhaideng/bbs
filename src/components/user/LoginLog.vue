<template>
<Profile :selected-keys="thisSelectedKeys" :open-keys="thisOpenKeys">
    <template v-slot:content>
          <a-row>
              <a-col :span="22" :offset="1">
                  <a-table :columns="columns" :dataSource="data" rowKey="create_time" :locale="{emptyText: '暂无登录数据'}"></a-table>
              </a-col>

          </a-row>
    </template>
</Profile>
</template>


<script>
const columns = [
  {
    title: "登录ip",
    dataIndex: "ip",
    key: "ip",
    width: "40%"
  },
  {
    title: "登录时间",
    dataIndex: "create_time",
    key: "create_time",
    width: "30%"
  },
   {
    title: "登录地址",
    dataIndex: "address",
    key: "address",
    width: "30%"
  }
];

import Profile from "./common/Profile"


export default {
  name: "LoginLog",
  data() {
    return {
      data: [],
      columns,
      thisOpenKeys:["sub1"],  // 打开第三个子菜单
      thisSelectedKeys: ['2']
    };
  },
  components:{
      Profile
  },
  mounted() {
    this.$axios
      .post("/api/user/loginlog")
      .then(res => {
        this.data = res.data;
      })
      .catch(err => {
          if(err.response.status===500){
          this.$message.error("服务端异常");
      }

      });
  }
};
</script>
