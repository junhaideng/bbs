<template>
  <div>
    <Header :select-keys="selectKeys"></Header>
    <Content :height="'100px'">
      <template v-slot:content>
        <a-back-top />
        <a-descriptions bordered title="课程信息">
          <a-descriptions-item label="课程名" :span="3">
            {{ data.courseName }}
          </a-descriptions-item>
          <a-descriptions-item label="老师" :span="3">
            {{ data.teacher }}
          </a-descriptions-item>
          <a-descriptions-item label="开设学院" :span="2">
            {{ data.school }}
          </a-descriptions-item>
        </a-descriptions>

        <a-row :style="{ marginTop: '20px', zIndex: 9999 }">
          <a-col :span="12">
            <div class="ant-descriptions-title">学生评价</div>
          </a-col>

          <a-col :span="12">
            <a-button
              :style="{ float: 'right' }"
              @click="
                () => {
                  show = true;
                }
              "
              >我要评论</a-button
            >
          </a-col>
        </a-row>
        <div v-if="show">
          <a-row>
            <a-col :span="24">
              <a-textarea
                :style="{ minHeight: '100px' }"
                v-model="content"
                placeholder="在这里写出你对该课程的评价..."
              ></a-textarea>
            </a-col>
          </a-row>
          <a-row :style="{ marginTop: '10px', float: 'right' }">
            <a-button type="primary" @click="submit" :style="{marginRight: '10px'}">提交</a-button>
            <a-button type="danger" @click="() => (show = false)"
              >取消</a-button
            >
          </a-row>
        </div>
        <a-row :style="{ zIndex: -1 }"> </a-row>
        <a-list
          bordered
          :data-source="comments"
          :loading="loading"
          :style="{ marginTop: '10px' }"
          :split="false"
          :locale="{ emptyText: '暂时没有学生进行评论' }"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta :description="item.comment">
              <a slot="title" href="https://www.antdv.com/">{{
                item.username
              }}</a>
              <a-avatar
                slot="avatar"
                src="https://dummyimage.com/200x100/50B347/FFF&text=Mock.js"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </template>
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
  name: "CourseDetail",
  components: {
    Header,
    Content,
    Footer,
  },
  data() {
    return {
      id: null,
      selectKeys: [],
      data: {},
      comments: [],
      loading: false,
      content: "",
      show: false,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.set_course_data();
    this.set_course_comment();
  },
  methods: {
    comemnt() {
      this.show = true;
    },
    set_course_data() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post("/api/course/get", qs.stringify({ id: this.id }))
          .then((res) => {
            this.data = res.data;
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    set_course_comment() {
      return new Promise((resolve, reject) => {
        this.loading = true;
        this.$axios
          .post(
            "/api/course/get_course_comments",
            qs.stringify({ id: this.id })
          )
          .then((res) => {
            this.comments = res.data;
            resolve();
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },

    submit() {
      if (this.content.trim() === "") {
        this.$message.info("内容不能为空");
        return;
      }
      this.$axios
        .post(
          "/api/course/write_course_comments",
          qs.stringify({ comment: this.content, course_id: this.id })
        )
        .then((res) => {
          if (res.data.status === 200) {
            this.$message.success(res.data.message);
            this.set_course_comment();
            this.content = "";
            this.show = false;
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
