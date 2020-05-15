<template>
  <div>
    <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">
      <template v-slot:content>
        <a-row>
          <a-col
            :span="20"
            offset="2"
            :style="{ marginLeft: '20px', marginBottom: '20px' }"
          >
            <a-list
              itemLayout="vertical"
              :pagination="pagination"
              size="large"
              :dataSource="listData"
              :loading="loading"
            >
              <a-list-item slot="renderItem" slot-scope="item" key="item.title">
                <template v-slot:actions>
                  <span>
                    <a-icon type="read" />
                    {{ item.read }}
                  </span>
                  <span>
                    <a-icon type="star-o" />
                    {{ item.star }}
                  </span>
                  <span>
                    <a-icon type="message" />
                    {{ item.comments }}
                  </span>
                  <span>
                    <a-icon type="history" />
                    {{ item.createTime }}
                  </span>
                  <span>
                    <a-tooltip>
                      <template v-slot:title>
                        删除
                      </template>
                      <a-icon type="delete" @click="delete_article(item.id)" />
                    </a-tooltip>
                  </span>
                </template>

                <a-list-item-meta :description="item.description">
                  <a
                    slot="title"
                    :href="'/community/article/detail/' + item.id"
                    target="_blank"
                    ><b>{{ item.title }}</b></a
                  >
                </a-list-item-meta>
                {{ item.content }}
              </a-list-item>
            </a-list>
          </a-col>
        </a-row>
      </template>
    </Profile>
  </div>
</template>

<script>
import Profile from "./common/Profile";
import qs from "qs";

export default {
  name: "Article",
  mounted() {
    this.set();
  },
  components: {
    Profile,
  },
  data() {
    return {
      thisOpenKeys: ["sub2"], // 打开第三个子菜单
      thisSelectedKeys: ["3"],
      listData: [],
      loading: false,
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 8,
      },
    };
  },
  methods: {
    set() {
      this.loading = true;
      this.$axios
        .post("/api/user/article")
        .then((res) => {
          this.listData = res.data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delete_article(id) {
      this.$axios
        .post("/api/user/article/delete", qs.stringify({ id: id }))
        .then((res) => {
          if (res.data.status == 200) {
            this.$message.success(res.data.message);
            this.set();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
