<template>
  <a-layout>
    <Header :select-keys="selectKeys" />
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
                  <a-select-opt-group v-for="(item, index) in dataSource" :key="index"
                  >
                    <template v-slot:label><div :style="{fontSize: '1.17em'}">{{item.type}}</div></template>
                    <a-select-option v-for="(data, index) in item.data" :key="data" :value="String(data)">
                      <a :href="`/search/?query=${item.query[index]}`" target="_blank"  rel="noopener noreferrer">{{data}}</a>
                    </a-select-option>
                    
                  </a-select-opt-group>
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
import search from "../api/search";

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
      showFlag: false,
    };
  },
  methods: {
    onSelect(value) {
      console.log("onSelect", value);
    },

    handleSearch(value) {
      this.dataSource = search.search(value);
      if(value.trim()){
        this.showFlag = true
      }else{
        this.showFlag = false
      }
      console.log();
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
