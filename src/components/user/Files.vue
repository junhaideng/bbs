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
    dataIndex: "fileName",
    key: "fileName",
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
    dataIndex: "uploadTime",
    width: "15%",
    key: "date",
  },
  {
    title: "文件描述",
    dataIndex: "description",
    width: "30%",
    key: "description",
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
    this.setData();
  },
  methods: {
    handleDelete() {
      this.$axios
        .post("/api/user/delfiles", this.selectedRowKeys)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message.success(res.data.message);
            this.setData();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDownload() {
      this.selectedRowKeys.forEach((element) => {
        let file = this.getFilename(element)[0];
        let filename = file.fileName;
        let suffix = "";
        try {
          suffix = file.path.split(".")[1];
        } catch {
          suffix = "";
        }
        let link = document.createElement("a");
        if (suffix === "") {
          link.download = filename;
        } else {
          link.download = filename + "." + suffix;
        }
        link.href = "/api/file/download?file_id="+element;
        link.click();
        link.remove();
      }
      );

    },
    onSearch(value) {
      this.data = [];

      this.dataSource.forEach((element) => {
        if (element.fileName.indexOf(value) !== -1) {
          console.log(element);
          this.data.push(element);
        }
      });
    },
    setData() {
      this.$axios
        .post("/api/user/files/")
        .then((res) => {
          this.dataSource = res.data;
          this.data = this.dataSource;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFilename(id) {
      return this.dataSource.filter((r) => {
        if (r.id === id) return true;
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

<style>
/* .ant-table-content {
 min-height: 793px;
} */
</style>
