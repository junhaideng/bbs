<template>
  <div>
    <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">
      <template v-slot:content>
        <a-table
          :pagination="{pageSize: 10, showSizeChanger: true}"
          :columns="columns"
          :dataSource="data"
          :rowSelection="rowSelection"
          rowKey="id"
          bordered
          :style="{width: '96%',  margin:'auto'}"
        >
          <template v-slot:footer>
            <a-button type="danger" :disabled="isDisable" @click.prevent="handleDelete">删除文件</a-button>
          </template>
        </a-table>

      </template>
    </Profile>
  </div>
</template>


<script>
const columns = [
  {
    title: "文件名",
    dataIndex: "filename",
    key: "key",
    width: "20%"
  },
  {
    title: "文件类型",
    dataIndex: "type",
    key: "type",
    width: "16%"
  },
  {
    title: "下载次数",
    dataIndex: "downloadTimes",
    width: "14%",
    key: "downloadTimes"
  },
  {
    title: "上传时间",
    dataIndex: "date",
    width: "15%",
    key: "date"
  },
  {
    title: "文件描述",
    dataIndex: "desc",
    width: "30%",
    key: "desc"
  }
];

import Profile from "./Profile";

export default {
  name: "Files",
  data() {
    return {
      data: [],
      columns,
      selectedRowKeys: [],
      thisOpenKeys:["sub3"],  // 打开第三个子菜单
      thisSelectedKeys: ['5']
    };
  },
  components: {
    Profile
  },
  mounted() {
    this.$axios
      .post("/user/profile/files/")
      .then(res => {
        this.data = res.data.data;
        console.log(this.data);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.data);
  },
  methods: {
    handleDelete() {
      console.log(this.selectedRowKeys);
    },
  },
  computed: {
    rowSelection() {
      return {
        onChange: selectedRowKeys => {
          this.selectedRowKeys = selectedRowKeys;
        }
      };
    },
    isDisable() {
      return this.data.length === 0;
    }
  }
};
</script>
