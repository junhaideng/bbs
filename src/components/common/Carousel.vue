<template>
  <div>
    <a-carousel autoplay>
      <a-row v-for="(id, index) in id_list" :key="index">
 <div>
          <img
            :style="{ margin: 'auto' }"
            height="400px"
            :src="'/api/carousel/get/?id='+id"
            alt=""
          />
        </div>
      </a-row>

    </a-carousel>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "Carousel",

  data() {
    return {
      id_list: [],
    };
  },
  mounted() {
    this.$axios
      .post("/api/carousel/get", qs.stringify({ num: 6 }))
      .then((res) => {
        this.id_list = res.data.map((value) => 
          value.id
        );
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.ant-carousel >>> .slick-slide {
  text-align: center;
  overflow: hidden;
}
</style>
