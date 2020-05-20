<template>
  <a-layout>
    <Header :select-keys="selectKeys" />
    <Content>
      <template v-slot:content>
        <Carousel :style="{ marginBottom: '40px' }" />

        <a-row>
          <a-col :span="10" :offset="7">
            <div class="global-search-wrapper" style="width: 100%">
              <a-auto-complete
                class="global-search"
                size="large"
                style="width: 100%"
                @select="onSelect"
                @search="handleSearch"
                placeholder="在这里输入你想要查询的内容"
                optionLabelProp="text"
              >
                <template slot="dataSource" v-if="showFlag">
                  <a-select-opt-group v-if="articles_show">
                    <template v-slot:label
                      ><div :style="{ fontSize: '1.17em' }">文章</div></template
                    >
                    <a-select-option
                      v-for="data in dataSource"
                      :key="data.title"
                      :value="data.title.trim()"
                    >
                      {{ data.title }}
                    </a-select-option>
                  </a-select-opt-group>
                </template>
                <a-input v-model="value">
                  <a-button
                    slot="suffix"
                    style="margin-right: -12px"
                    class="search-btn"
                    size="large"
                    type="primary"
                    @click="handleClick"
                  >
                    <a-icon type="search" />
                  </a-button>
                </a-input>
              </a-auto-complete>
            </div>
          </a-col>
        </a-row>
        <a-row :style="{ marginTop: '10px' }">
          <a-col :span="10" :offset="7" :style="{ textAlign: 'center' }">

            <span :style="{ marginRight: '10px' }" v-for="item in link" :key="item.name">
              <a
                :href="item.link"
                target="_blank"
                >{{item.name}}</a
              >
            </span>
          
          </a-col>
        </a-row>
      </template>
    </Content>

    <Footer />
  </a-layout>
</template>

<script>
import Header from "../common/Header";
import Footer from "../common/Footer";
import Content from "../common/Content";
import qs from "qs";
import Carousel from "../common/Carousel";

const link = [
  {
    name: "教务处",
    link: "http://www.jwc.sjtu.edu.cn/web/sjtu/198001.htm",
  },
  {
    name: "图书馆",
    link: "http://www.lib.sjtu.edu.cn/f/main/index.shtml",
  },
  {
    name: "教学信息服务网",
    link:
      "https://i.sjtu.edu.cn/xtgl/login_slogin.html?language=zh_CN&_t=1589518812236",
  }
];

export default {
  name: "Home",
  components: {
    Header,
    Footer,
    Content,
    Carousel,
  },
  data() {
    return {
      selectKeys: ["1"],
      dataSource: [],
      value: "",
      showFlag: false,
      articles_show: false,
      link: link,
    };
  },
  methods: {
    onSelect(value) {
      let router = this.$router.resolve({
        path: "/search",
        query: { q: value.trim(), type: "article" },
      });
      window.open(router.href);
    },

    handleSearch(value) {
      this.$axios
        .post("/api/search", qs.stringify({ q: value.trim(), type: "article" }))
        .then((res) => {
          this.dataSource = res.data;
          console.log(this.dataSource);
          if (this.dataSource.length === 0) {
            this.articles_show = false;
          } else {
            this.articles_show = true;
          }

          if (value.trim()) {
            this.showFlag = true;
          } else {
            this.showFlag = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClick() {
      if (this.value.trim() !== "") {
        let router = this.$router.resolve({
          path: "/search",
          query: { q: this.value.trim(), type: "article" },
        });
        window.open(router.href);
      } else {
        this.$message.warning("请输入搜索内容", 1);
      }
    },
  },
};
</script>

<style scoped>
</style>
