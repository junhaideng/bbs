<template>
  <a-layout>
    <Header :select-keys="selectKeys" />
    <Carousel />
    <Content>
      <template v-slot:content>
        <a-row>
          <a-col :span="16" :offset="4">
            <div class="global-search-wrapper" style="width: 400px">
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
                      v-for="data in dataSource.articles"
                      :key="data.title"
                      :value="data.title.trim()"
                    >
                      {{ data.title }}
                    </a-select-option>
                  </a-select-opt-group>
                  <a-select-opt-group v-if="files_show">
                    <template v-slot:label
                      ><div :style="{ fontSize: '1.17em' }">文件</div></template
                    >
                    <a-select-option
                      v-for="data in dataSource.files"
                      :key="data.file_name"
                      :value="data.file_name.trim()"
                    >
                      {{ data.file_name }}
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
      </template>
    </Content>

    <Footer />
  </a-layout>
</template>

<script>
import Header from "../common/Header";
import Footer from "../common/Footer";
import Content from "../common/Content";
// import search from "../api/search";
import qs from "qs";
import Carousel from "../common/Carousel";

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
      files_show: false,
      articles_show: false,
    };
  },
  methods: {
    onSelect(value) {
      let router = this.$router.resolve({
        path: "/search",
        query: { q: value.trim() },
      });
      window.open(router.href);
    },

    handleSearch(value) {
      this.$axios
        .post("/api/search", qs.stringify({ q: value.trim() }))
        .then(res => {
          this.dataSource = res.data;
          if (this.dataSource.articles.length === 0) {
            this.articles_show = false;
          } else {
            this.articles_show = true;
          }
          if (this.dataSource.files.length === 0) {
            this.files_show = false;
          } else {
            this.files_show = true;
          }
           if (value.trim()) {
        this.showFlag = true;
      } else {
        this.showFlag = false;
      }
        }).catch(err=>{console.log(err)});

    },
    handleClick() {
      if (this.value.trim()) {
        console.log("进行搜索", this.value);
      } else {
        this.$message.warning("请输入搜索内容", 1);
      }
    },
  },
};
</script>

<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;

  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}

.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}

.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
