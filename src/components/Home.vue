<template>
  <a-layout>
    <Header :select-keys="selectKeys" />
    <Content>
      <template v-slot:content>
        <a-row>
          <a-col :span="16" :offset="4">
            <div class="global-search-wrapper" style="width: 300px">
    <a-auto-complete
      class="global-search"
      size="large"
      style="width: 100%"
      @select="onSelect"
      @search="handleSearch"
      placeholder="input here"
      optionLabelProp="text"
    >
      <template slot="dataSource">
        <a-select-option v-for="item in dataSource" :key="item.category" :text="item.category">
          Found {{ item.query }} on
          <a
            :href="`https://s.taobao.com/search?q=${item.query}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ item.category }}
          </a>
          <span className="global-search-item-count">{{ item.count }} results</span>
        </a-select-option>
      </template>
      <a-input>
        <a-button
          slot="suffix"
          style="margin-right: -12px"
          class="search-btn"
          size="large"
          type="primary"
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
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
    Content,
  },
  data() {
    return {
      selectKeys: ["1"],
       dataSource: [],
      value: "",
    };
  },
  methods: {
   onSelect(value) {
      console.log('onSelect', value);
    },

    handleSearch(value) {
      this.dataSource = value ? this.searchResult(value) : [];
    },

    getRandomInt(max, min = 0) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    searchResult(query) {
      return new Array(this.getRandomInt(5))
        .join('.')
        .split('.')
        .map((item, idx) => ({
          query,
          category: `${query}${idx}`,
          count: this.getRandomInt(200, 100),
        }));
    },}
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
