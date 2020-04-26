<template>
  <div>
    <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">
      <template v-slot:content>
        <a-input-search
          v-model="inputData"
          :style="{
            width: '96%',
            marginLeft: '2%',
            marginBottom: '20px',
            paddingTop: '10px',
          }"
          placeholder="输入文件名来搜索文件"
          @search="onSearch"
          enterButton
        />
        <a-table
          :pagination="{ pageSize: 7 }"
          :columns="columns"
          :dataSource="data"
          :rowSelection="rowSelection"
          rowKey="id"
          bordered
          :style="{ width: '96%', margin: 'auto' }"
        >
          <template v-slot:footer>
            <a-button
              type="primary"
              :disabled="isDisable"
              @click.prevent="handleDownload"
              >下载文件</a-button
            >

            <a-button
              type="danger"
              :disabled="isDisable"
              @click.prevent="handleDelete"
              :style="{ marginLeft: '20px' }"
              >删除文件</a-button
            >
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
    width: "20%",
  },
  {
    title: "文件类型",
    dataIndex: "type",
    key: "type",
    width: "16%",
  },
  {
    title: "下载次数",
    dataIndex: "downloadTimes",
    width: "14%",
    key: "downloadTimes",
  },
  {
    title: "上传时间",
    dataIndex: "date",
    width: "15%",
    key: "date",
  },
  {
    title: "文件描述",
    dataIndex: "desc",
    width: "30%",
    key: "desc",
  },
];

import Profile from "./common/Profile";

export default {
  name: "Files",
  data() {
    return {
      data: [], //  搜索之后的数据
      dataSource: [], // 所有的数据
      columns,
      selectedRowKeys: [],
      thisOpenKeys: ["sub3"], // 打开第三个子菜单
      thisSelectedKeys: ["5"],
      inputData: "",
    };
  },
  components: {
    Profile,
  },
  mounted() {
    this.$axios
      .post("/user/profile/files/")
      .then((res) => {
        this.dataSource = res.data.data;
        this.data = this.dataSource;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    handleDelete() {
      console.log(this.selectedRowKeys, "删除的文件");
    },
    handleDownload() {
      console.log(this.selectedRowKeys, "下载的文件");
    },
    onSearch(value) {
      this.data = [];

      this.dataSource.forEach((element) => {
        if (element.filename.indexOf(value) !== -1) {
          console.log(element);
          this.data.push(element);
        }
      });
    },
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys) => {
          this.selectedRowKeys = selectedRowKeys;
        },
      };
    },
    isDisable() {
      return this.selectedRowKeys.length === 0;
    },
  },
  watch: {
    inputData(value) {
      if (value.length === 0) {
        this.data = this.dataSource;
      }
    },
  },
};
</script>

<style >
/* .ant-table-content {
 min-height: 793px;
} */
</style>
