<template>
  <div>
    <Header :select-keys="selectKeys"></Header>
    <Content :height="'100px'" :width="'80%'">
      <template v-slot:content>
        <a-back-top />
        <a-skeleton active :loading="infoLoading">
          <a-row>
            <a-col :span="24">
              <a-tag>{{ data.type }}</a-tag>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <h3 :style="{ marginTop: '20px' }">{{ data.title }}</h3>
            </a-col>
          </a-row>

          <a-row>
            <a-col :span="24" :style="{ margin: '10px' }">
              {{ data.content }}
            </a-col>
          </a-row>
        </a-skeleton>

        <a-row :style="{ marginTop: '10px' }">
          <a-button @click="show_edit(id)">
            <a-icon type="edit"></a-icon>写回答
          </a-button>
        </a-row>
        <div v-if="visible" :style="{ marginTop: '10px' }">
          <a-form>
            <a-form-item>
              <a-textarea
                v-model="content"
                placeholder="写回答..."
                :style="{ minHeight: '150px' }"
              >
              </a-textarea>
            </a-form-item>
            <a-form-item :style="{ float: 'right' }">
              <a-button
                type="primary"
                @click="submit"
                :style="{ marginRight: '10px' }"
                >提交</a-button
              >
              <a-button type="danger" @click="cancel">取消</a-button>
            </a-form-item>
            <a-row :style="{ zIndex: -1, marginBottom: 0, height: '40px' }">
              <a-col :span="24"></a-col>
            </a-row>
          </a-form>
        </div>
      </template>
    </Content>
    <Content v-slot:content :width="'80%'">
      <div>
        <a-row>
          <a-col :span="20">
            <!-- TODO: 这个list不分页，但是需要进行后端动态请求 https://antdv.com/components/list-cn/ -->
             <a-list 
          item-layout="vertical"
          size="large"
          :pagination="pagination"
          :data-source="listData"
          :locale="{ emptyText: '暂无回答' }"
          :loading="loading"
        >
          <div slot="header">
            <b>{{ listData.length }}</b> 个回答
          </div>

          <a-list-item
            slot="renderItem"
            key="item.title"
            slot-scope="item, index"
          >
            <a-list-item-meta :description="item.description">
              <a slot="title" :href="item.href">{{ item.username }}</a>
              <a-avatar slot="avatar" :src="'/api/user/avatar/get_by_username?username='+item.username" />
            </a-list-item-meta>
            {{ item.reply }}
            <a-row :style="{margin: '10px 0 10px 0'}">
              <a-col :span="4">
                <a href="javascript:;">
                  <span @click="star(item.id)">
                    <a-icon type="star" style="margin-right: 8px" />{{
                      item.star
                    }}
                  </span>
                </a>
              </a-col>
              <a-col :span="4">
                <a-tooltip>
                  <template v-slot:title>
                    点我可展开或者折叠评论
                  </template>
                  <a href="javascript:;">
                  <span @click="show(index)">
                  <a-icon type="message" style="margin-right: 8px" />{{
                    item.comments
                  }}
                </span></a>
                </a-tooltip>

              </a-col>
            </a-row>
            <div v-show="show_comments[index]">
              <a-list
              :pagination="pagination_2"
              :locale="{emptyText:'暂无'}"
              >

              </a-list>

            <a-row>
              <a-col :span="16">
                <a-input
            placeholder="写下你的评论..."
            >
            </a-input> 
              </a-col>
              <a-col :span="6" offset="1">
                <a-button type="primary">评论</a-button>
              </a-col>
            </a-row>

            </div>
          </a-list-item>
        </a-list>
          </a-col>
        </a-row>
       
      </div>
    </Content>
    <Footer />
  </div>
</template>

<script>
import Header from "../common/Header";
import Content from "../common/Content";
import Footer from "../common/Footer";
import qs from "qs";

export default {
  name: "ArticleDetail",
  components: {
    Header,
    Content,
    Footer,
  },
  data() {
    return {
      selectKeys: [],

      id: undefined,
      visible: false,
      content: "",
      data: [],
      pagination: {
        pageSize: 10,
      },
      pagination_2:{
        size: 'small',
        pageSize: 8,
        onChange: (value)=>{console.log(value)},
      },
      listData: [],
      loading: true,
      infoLoading: true,
      show_comments: [],
      comments_data: [],
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.set_article().then(() => {
      (this.infoLoading = false),
        this.set_reply().then(() => {
          this.loading = false;
        });
    });
  },
  methods: {
    set_reply() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post("/api/community/get_reply", qs.stringify({ id: this.id }))
          .then((res) => {
            this.listData = res.data;
            this.show_comments = res.data.map(() => false);
            resolve(res.data);
          })
          .catch((err) => {
            if (err.response.status) {
              this.$message.error("服务器异常");
            }
            reject(err);
          });
      });
    },
    set_article() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post("/api/community/get_article", qs.stringify({ id: this.id }))
          .then((res) => {
            this.data = res.data;
            resolve();
          })
          .catch((err) => {
            if (err.response.status === 500) {
              this.$message.error("服务器异常");
            }
            reject(err);
          });
      });
    },
    show_edit(id) {
      if (sessionStorage.getItem("isLogin")) {
        this.visible = true;
        console.log(id);
      } else {
        this.$message.error("请先进行登录");
        this.$children[0].login();
      }
    },
    submit() {
      if (this.content.trim() === "") {
        this.$message.info("内容为空");
      } else {
        this.$axios
          .post(
            "/api/community/reply",
            qs.stringify({ id: this.id, reply: this.content })
          )
          .then((res) => {
            if (res.data.status === 200) {
              this.set_reply();
              this.$message.success(res.data.message);
              this.visible = false;
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status === 500) {
              this.$message.error("服务器异常");
            }
          });
      }
    },
    cancel() {
      this.visible = false;
    },

    star(id) {
      console.log("star", id);
    },

    show(index) {
      this.$set(this.show_comments, index, !this.show_comments[index])  // 需要使用set方式才能生效，直接赋值无法生效
      console.log(this.show_comments);
    },
  },
};
</script>
