<template>
  <div>
    <a-layout>
      <Header :select-keys="selectKeys" />
      <Content>
        <template v-slot:content>
          <a-list>
            <a-list-item v-for="(item, index) in dataSource" :key="index">
                <h3>{{item.title}}</h3>
                {{item.username}}
                {{item.content}}

            </a-list-item>
          </a-list>
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

export default {
  name: "Community",
  components: {
    Footer,
    Header,
    Content,
  },
  data() {
    return {
      selectKeys: ["3"],
      dataSource: [],
    };
  },
  mounted() {
    this.$axios
      .get("/api/get_post")
      .then((res) => {
        this.dataSource = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped></style>
