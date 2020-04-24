<template>
  <div>
    <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">
      <template v-slot:content>
        <a-row>
          <a-col :span="20" offset="2" :style="{ marginLeft: '20px', marginBottom: '20px' }">
            <a-list
              itemLayout="vertical"
              :pagination="pagination"
              size="large"
              :dataSource="listData"
            >
              <a-list-item slot="renderItem" slot-scope="item" key="item.title">
                <template slot="actions" v-for="(type, index) in actions">
                  <span :key="type">
                    <a-icon :type="type" style="margin-right: 8px" />
                     {{item.data[index]}} 
                  </span>
                </template>

                <a-list-item-meta :description="item.description">
                  <a slot="title"
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
import Profile from "./Profile";
export default {
  name: "Article",
  mounted() {
    this.$axios
      .post("/user/articles", {"userId":2})
      .then((res) => {
        this.listData = res.data.data;
        console.log(this.data);
     
      })
      .catch((err) => {
        console.log(err);
      });
  },
  components: {
    Profile,
  },
  data() {
    return {
      thisOpenKeys: ["sub2"], // 打开第三个子菜单
      thisSelectedKeys: ["3"],
      listData: [],
      actions: ["star-o", "like-o","message","history"],
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 8,
      },
    };
  },
};
</script>

<style scoped>
</style>