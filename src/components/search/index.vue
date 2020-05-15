<template>
  <div>
    <a-layout>
      <Header :select-keys="selectKeys" />
      <Content>
        <template v-slot:content>
          <a-back-top />
          <a-row>
            <a-col :span="12">
              <a-input-search
                placeholder="请输入查询内容"
                v-model="q"
                size="large"
                enter-button
                @search="onSearch"
                :style="{ marginBottom: '20px' }"
              ></a-input-search>
            </a-col>
          </a-row>
          <a-list
            item-layout="vertical"
            size="large"
            :pagination="pagination"
            :data-source="listData"
            :loading="loading"
            :locale="{ emptyText: '暂无搜索数据' }"
          >
            <a-list-item slot="renderItem" key="item.title" slot-scope="item">
              <a-list-item-meta :description="item.content">
                <a slot="title" :href="'/community/article/detail/' + item.id"
                  ><a-tag>{{ item.type }}</a-tag> {{ item.title }}</a
                >
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </template>
      </Content>
    </a-layout>
    <Footer />
  </div>
</template>
<script>
import Header from "../common/Header";
import Footer from "../common/Footer";
import Content from "../common/Content";
// import search from "../api/search";
import qs from "qs";

export default {
  name: "Search",
  components: {
    Header,
    Footer,
    Content,
  },
  mounted() {
       if( Object.prototype.hasOwnProperty.call(this.$route.query, "q")){
    this.q = this.$route.query.q
        this.set_data();
    }
  },
  data() {
    return {
      selectKeys: [],
      listData: [],
      loading: false,
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 8,
      },
      q: "",
    };
  },
  methods: {
    set_data() {
      return new Promise((resolve, reject) => {
        (this.loading = true),
          this.$axios
            .post("/api/search", qs.stringify({ q: this.q, type: "article" }))
            .then((res) => {
              this.listData = res.data.map(value=>{value.type="文章"; return value});
              this.loading = false;
              resolve();
            })
            .catch((err) => {
              console.log(err);
              reject();
            });
      });
    },

    onSearch() {
      let router = this.$router.resolve({
        path: "/search",
        query: { q: this.q.trim(), type: "article" },
      });
      window.location.href = router.href;
    },
  },
};
</script>
<style></style>
