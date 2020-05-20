<template>
  <div>
    <a-layout>
      <Header :select-keys="selectKeys" />
      <Content>
        <template v-slot:content>
          <div :style="{ zIndex: 2 }">
            <span :style="{ marginRight: '10px', fontWeight: '700' }"
              >课程类别:</span
            >
            <template v-for="tag in mainTags">
              <!-- indexOf 判断是否被选择，选中的话就在 -->
              <a-checkable-tag
                :key="tag"
                size="large"
                :checked="selectedMainTags.indexOf(tag) > -1"
                @change="(checked) => handleMainTagChange(tag, checked)"
                :style="{ fontSize: '14px' }"
              >
                {{ tag }}
              </a-checkable-tag>
            </template>
          </div>
          <a-divider></a-divider>
          <div>
            <span :style="{ marginRight: '10px', fontWeight: '700' }"
              >开设学院:</span
            >
            <template v-for="tag in schoolTags">
              <a-checkable-tag
                :key="tag"
                :checked="selectedSchoolTags.indexOf(tag) > -1"
                @change="(checked) => handleSchoolTagChange(tag, checked)"
                :style="{ fontSize: '14px', marginTop: '10px' }"
              >
                {{ tag }}
              </a-checkable-tag>
            </template>
            <a-divider></a-divider>
            <div :style="{ lineHeight: '20px' }">
              <span
                :style="{
                  marginRight: '10px',
                  fontWeight: '700',
                  margin: '2px',
                }"
                >已选条件:</span
              >
              <a-tag
                v-for="tag in selectedMainTags"
                :key="tag"
                :style="{ fontSize: '14px', margin: '2px' }"
              >
                {{ tag }}
              </a-tag>
              <a-tag
                v-for="tag in selectedSchoolTags"
                :key="tag"
                :style="{ fontSize: '14px', margin: '2px' }"
              >
                {{ tag }}
              </a-tag>
            </div>
          </div>

          <a-divider></a-divider>
          <a-row>
            <a-col :span="24">
              <a-spin  :spinning="spinning" tip="加载中..." >
                <a-table bordered rowKey="id" :columns="columns" :data-source="data" :locale="{emptyText: '暂无对应课程'}" :pagination="{pageSize: 20}"></a-table>
              </a-spin>
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
  name: "Course",
  components: { Footer, Header, Content },
  data() {
    const columns = [
      {
        title: "课程名称",
        dataIndex: "courseName",
        width: "30%",
        customRender: (text, row) => {
          return <a href={"/course/detail/"+row.id}>{text}</a>;
        },
      },
      {
        title: "老师",
        dataIndex: "teacher",
        width: "30% ",
      },
      {
        title: "所属学院",
        dataIndex: "school",
      },
    ];

    return {
      selectKeys: ["2"],
      checked1: false,
      checked2: false,
      checked3: false,
      mainTags: ["必修", "选修"],  //, "实验", "其他"
      schoolTags: [],
      selectedMainTags: [],
      selectedSchoolTags: [],
      data: [],
      spinning: false,
      columns,
    };
  },

  mounted() {
    this.getAllSchool();
  },
  methods: {
    handleMainTagChange(tag, checked) {
      if (checked) {
        this.selectedMainTags = [tag];
      } else {
        this.selectedMainTags = [];
      }
      this.getCourse();

    },
    handleSchoolTagChange(tag, checked) {

      if (checked) {
        this.selectedSchoolTags = [tag];
      } else {
        this.selectedSchoolTags = [];
      }
        this.getCourse();
    },
    getAllSchool() {
      return new Promise((resolve, reject) => {
        this.$axios
          .get("/api/course/get_all_school")
          .then((res) => {
            this.schoolTags = res.data.map((value) => {
              return value.school;
            });
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },
    getCourse() {
      return new Promise((resolve, reject) => {
        this.spinning = true;
        console.log(this.selectedMainTags[0], this.selectedSchoolTags[0])
        let school = this.selectedSchoolTags.length>0?this.selectedSchoolTags[0]:null;
        let type = this.selectedMainTags.length>0?this.selectedMainTags[0]:null;
          this.$axios
            .post(
              "/api/course/get_course",
              qs.stringify({ school: school, type: type })
            )
            .then((res) => {
              this.data = res.data;
              this.spinning = false;
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
      });
    },
  },
};
</script>

<style scoped></style>
