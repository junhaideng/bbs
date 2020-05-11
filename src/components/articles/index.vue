<template>
  <div>
    <Header :select-keys="selectKeys"></Header>
    <Content :height="'100px'">
      <template v-slot:content>
          <a-back-top />
       <a-skeleton active :loading="infoLoading">
          <a-row>
          <a-col :span="24">
            <a-tag >{{ data.type }}</a-tag>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <h3 :style="{ marginTop: '20px' }">{{ data.title }}</h3>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24" :style="{margin: '10px'}">
            {{ data.content }}
          </a-col>
        </a-row>
       </a-skeleton>

        <a-row :style="{ marginTop: '10px' }">
          <a-button @click="show_edit(id)" >
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
            <a-form-item :style="{float: 'right'}">
              <a-button
                type="primary"
                @click="submit"
                :style="{ marginRight: '10px' }"
                >提交</a-button
              >
              <a-button type="danger" @click="cancel">取消</a-button>
            </a-form-item>
            <a-row :style="{zIndex: -1, marginBottom: 0, height: '40px'}">
              <a-col :span="24"></a-col>
            </a-row>
          </a-form>
        </div>
      </template>
    </Content>
    <Content v-slot:content>
      <div>
        <a-list
          item-layout="vertical"
          size="large"
          :pagination="pagination"
          :data-source="listData"
          :locale="{emptyText:'暂无回答'}"
          :loading="loading"
        >
          <div slot="header">
            <b>{{ listData.length }}</b> 个回答
          </div>

          <a-list-item slot="renderItem" key="item.title" slot-scope="item">
            <a-list-item-meta :description="item.description">
              <a slot="title" :href="item.href">{{ item.username }}</a>
              <a-avatar slot="avatar" :src="item.avatar" />
            </a-list-item-meta>
            {{ item.reply }}
            <template slot="actions">
              <span @click="star">
                <a-icon type="star" style="margin-right: 8px" />{{ item.star }}
              </span>
              <span @click="show(item.id)">
                <a-icon type="message" style="margin-right: 8px" />{{
                  item.comments
                }}
              </span>
            </template>
          </a-list-item>
        </a-list>
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
      listData: [],
      loading: true,
      infoLoading: true,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.set_reply().then(()=>{
        this.loading = false;
    });
    this.set_article().then(()=>{this.infoLoading = false});
  },
  methods: {
    set_reply() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post("/api/community/get_reply", qs.stringify({ id: this.id }))
          .then((res) => {
            this.listData = res.data;
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
            console.log(res.data);
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

            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch((err) => {
              console.log(err)
            if (err.response.status === 500) {
              this.$message.error("服务器异常");
            }
          });
      }
    },
    cancel() {
      this.visible = false;
    },

    star() {
      console.log("star");
    },

    show(id) {
      console.log(id);
    },
  },
};
</script>
