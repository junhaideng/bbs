<template>
  <div>
    <a-layout>
      <Header :select-keys="selectKeys" />
      <Content>
        <template v-slot:content>
          <a-back-top />

          <a-row >
            <a-col :span="16">
              <a-list
                item-layout="vertical"
                size="large"
                :data-source="dataSource"
                :locale="{ emptyText: '暂无帖子' }"
                :loading="article_loading"
                :style="{minHeight: '600px'}"
               :pagination="pagination" 
              >
                <a-list-item
                  slot="renderItem"
                  key="item.title"
                  slot-scope="item"
                >
                  <template slot="actions"> </template>

                  <a-list-item-meta
                  :description="item.content | format(100)">
                    <a
                      slot="title"
                      :href="'/community/article/detail/' + item.id"
                      >{{ item.title }}</a
                    >
                  </a-list-item-meta>
                  <a-row>
                    <a-avatar
                    :src="'/api/user/avatar/get_by_username?username='+item.username" 
                      style="margin-right: 8px; height:1rem; width:1rem"/>
                    {{ item.username }}
                    <a-icon type="message" 
                    style="margin-right: 8px; margin-top: 10px"
                    />
                    {{item.comments}}
                    <a-icon
                      type="history"
                      style="margin-right: 8px;margin-left: 8px; margin-top: 10px"
                    ></a-icon>
                    {{ item.createTime | dateFormat }}
                  </a-row>
                </a-list-item>
              </a-list>
              <a-row :style="{float: 'right'}">
          </a-row>
            </a-col>
            <a-col :span="6" offset="2">
              <a-row>
                <a-col :span="16"><h3>热门帖子</h3></a-col>
                <a-col :span="8" :style="{ float: 'right' }"
                  ><a href="javascript:;" @click="change"
                    ><a-icon type="sync" /> 换一换</a
                  ></a-col
                >
              </a-row>

              <a-list
                :split="false"
                item-layout="vertical"
                :data-source="hotArticle"
                :locale="{ emptyText: '暂无热门帖子' }"
                :loading="hot_article_loading"
              >
                <a-list-item slot="renderItem" key="item" slot-scope="item">
                  <a-row>
                    <a-col :span="16">
                      <a-tooltip  placement="right">
                        <template slot="title">
                          <span>{{ item.title }}</span>
                        </template>
                        <a :href="'/community/article/detail/' + item.id">{{
                          item.title | format(10)
                        }}</a>
                      </a-tooltip></a-col
                    >
                    <a-col :span="8" :style="{ float: 'right' }">{{
                      item.read
                    }}</a-col>
                  </a-row>
                </a-list-item>
              </a-list>
              <a-divider></a-divider>
              <a-row :style="{ marginTop: '20px' }">
                <a-col :span="16"><h3>教务处通知</h3></a-col>
              </a-row>

              <a-list
                :split="false"
                item-layout="vertical"
                :data-source="jwcNotice"
                :locale="{ emptyText: '暂无通知' }"
                :loading="jwcNotice_loading"
              >
                <a-list-item slot="renderItem" key="item" slot-scope="item">
                  <a-row>
                    <a-col :span="16">
                      <a-tooltip  placement="right">
                        <template slot="title">
                          <span>{{ item.title }}</span>
                        </template>
                        <a :href="item.link">{{ item.title | format(10) }}</a>
                      </a-tooltip>
                    </a-col>
                    <a-col :span="8" :style="{ float: 'right' }">{{
                      item.pubDate | dateFormat
                    }}</a-col>
                  </a-row>
                </a-list-item>
              </a-list>
            </a-col>
          </a-row>
          
        </template>
      </Content>
      <Footer />
    </a-layout>
  </div>
</template>

<script>
import Header from "../common/Header";
import Footer from "../common/Footer";
import Content from "../common/Content";
import qs from "qs";

export default {
  name: "Community",
  components: {
    Footer,
    Header,
    Content,
  },
  filters: {
    dateFormat(value) {
      if(value==null){
        return null
      }
      return value.split(" ")[0];
    },
    format(value, num) {
      if(value == null){
        return null
      }
      if(value.length<num){
        return value
      }
      return value.slice(0, num) + "...";
    },
  },

  data() {
    return {
      selectKeys: ["3"],
      dataSource: [],
      pagination: {
        pageSize: 10,
      },
      hotArticle: [],
      jwcNotice: [],
      page: 1,
      maxPage: 0,
      article_loading: true,
      hot_article_loading: true,
      jwcNotice_loading: true,
    };
  },
  mounted() {
    this.set_article().then(() => {
      this.article_loading = false;
      this.set_hot_article().then(() => {
      this.hot_article_loading = false;
    });
    });
    
    this.set_jwcNotice().then(() => {
      this.jwcNotice_loading = false;
    });
  },
  methods: {
    set_article() {
      return new Promise((resolve, reject) => {
        this.$axios
          .get("/api/community/get_all")
          .then((res) => {
            this.dataSource = res.data;
            this.maxPage = Math.ceil(res.data.length/10);
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },
    set_hot_article() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post("/api/community/hot", qs.stringify({ page: this.page }))
          .then((res) => {
            this.hotArticle = res.data;
            resolve();
          })
          .catch((err) => {
            reject(err);
            console.log(err);
          });
      });
    },
    set_jwcNotice() {
      return new Promise((resolve, reject) => {
        this.$axios
          .get("/api/community/jwc")
          .then((res) => {
            this.jwcNotice = res.data;
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },
    change() {
      this.page = (this.page + 1) % this.maxPage+1;

      this.set_hot_article();
    },
  },
};
</script>

<style scoped>
.ant-spin-nested-loading{
  min-height: 600px;
}
</style>
