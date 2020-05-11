<template>
  <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">
    <template v-slot:content>
      <a-row>
        <a-col
          :span="20"
          offset="2"
          :style="{ marginLeft: '20px', marginBottom: '20px' }"
        >
          <a-list
            :pagination="pagination"
            size="large"
            :dataSource="listData"
            itemLayout="vertical"
            :locale="{emptyText: '您暂时没有信息'}"

          >

            <template v-slot:header>
              <a-row>
                <a-col :span="18"> 未读信息: {{ messageCount }} </a-col>
                <a-col :span="6">
                  <a-row>
                    <a-col :span="12"
                      ><a href="javascript:;" @click="read_all"
                        >全部标记为已读</a
                      ></a-col
                    >
                    <a-col :span="12"
                      ><a href="javascript:;" @click="clear" :style="{marginLeft: '1rem'}"
                        >清空所有信息</a
                      ></a-col
                    >
                  </a-row>
                </a-col>
              </a-row>
            </template>
            <a-list-item slot="renderItem" slot-scope="item" key="item.time">
              <a-list-item-meta>
                <template v-slot:title>
                  <a-row>
                    <a-col :span="19">
                      <a-row>
                        <a-col :span="2">
                        <a-tag>{{item.type}}</a-tag>

                        </a-col>
                      <a-col :span="20" :style="{marginLeft: '10px'}">
                        <a-badge v-if="!item.read" dot :offset="[10,0]"> {{ item.title }}</a-badge>
                      <div v-else>{{ item.title }}</div>
                      </a-col>
                      </a-row>
                    </a-col>
                    <a-col
                      :span="3"
                      :style="{ right: '0px', fontSize: '14px', color: '#ccc' }"
                      >{{ item.time |dateFormat }}</a-col
                    >
                    <a-col :span="1">
                      <a-icon 
                      type="read"
                      @click="read_message(item.id)"
                      >
                      </a-icon>
                    </a-col>
                    <a-col :span="1"
                      ><a-icon
                        type="delete"
                        :style="{ color: 'red' }"
                        @click="delete_message(item.id)"
                    /></a-col>
                  </a-row>
                </template>
              </a-list-item-meta>
              <div :style="{ backgroundColor: '#f7f7f7' }">
                {{ item.content }}
              </div>
            </a-list-item>
          </a-list>
        </a-col>
      </a-row>
    </template>
  </Profile>
</template>

<script>
import Profile from "./common/Profile";
import { mapState, mapActions } from "vuex";
import qs from "qs";

export default {
  name: "Message",
  mounted() {
    this.init();
  },
  components: {
    Profile,
  },
  filters: {
    dateFormat(value){
  return value.split(" ")[0]
}
  },
  data() {
    return {
      thisOpenKeys: ["sub5"], // 打开第三个子菜单
      thisSelectedKeys: ["9"],
      listData: [],
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      },
      unread: undefined,
    };
  },

  methods: {
    init() {
            this.getMessageCount();
      this.$axios
        .post("/api/user/message")
        .then((res) => {
          this.listData = res.data;
        })
        .catch((err) => {
          if (err.response.status === 500) {
            this.$message.error("服务端异常");
          }
        });
    },
    read_all() {
      this.$axios
        .post("/api/user/message/read_all")
        .then((res) => {
          if (res.data.status === 200) {
            this.$message.success("全部标记为已读完成");
            this.init();
          } else {
            this.$message.error("标记为已读失败");
          }
        })
        .catch((err) => {
          if (err.response.status === 500) {
            this.$message.error("服务端异常");
          }
        });
    },
    clear() {
      this.$confirm({
        title: "确定要删除所有的信息？",
        okText:"确定",
        okType: "danger",
        cancelText: "取消",
        centered: true,
        onOk: ()=>{
          this.$axios
        .post("/api/user/message/clear_all")
        .then((res) => {
          if (res.data.status === 200) {
            this.$message.success("全部清除完成");
            this.init();
          } else {
            this.$message.error("清除失败");
          }
        })
        .catch((err) => {
          console.log(err)
          if (err.response.status === 500) {
            this.$message.error("服务端异常");
          }
        });
        }


      })
    },
    delete_message(id) {
      this.$axios
        .post("/api/user/message/delete", qs.stringify({ id: id }))
        .then((res) => {
          if (res.data.status === 200) {
            this.$message.success(res.data.message);
            this.init();
          } else {
            this.$message.success(res.data.message);
          }
        })
        .catch((err) => {
          if (err.response.status === 500) {
            this.$message.error("服务端异常");
          }
        });

    },
    read_message(id){
      let message = this.listData.filter(value => {if(value.id==id) return true})[0]
      console.log(message)
      if(message.read){
        this.$message.info("该信息已为已读状态，不能修改")
        return;
      }
this.$axios
        .post("/api/user/message/read", qs.stringify({ id: id }))
        .then((res) => {
          if (res.data.status === 200) {
            this.$message.success(res.data.message);
            this.init();
          } else {
            this.$message.success(res.data.message);
          }
        })
        .catch((err) => {
          if (err.response.status === 500) {
            this.$message.error("服务端异常");
          }
        });
    },
    ...mapActions(["getMessageCount"])
  },
  computed: {
    ...mapState(["messageCount"]),
  },
};
</script>

<style>

</style>
