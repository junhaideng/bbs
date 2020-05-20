<template>
  <div>
    <a-carousel autoplay arrows>
       <div
      slot="prevArrow"
      class="custom-slick-arrow"
      style="left: 10px;zIndex: 1"
    >
      <a-icon type="left-circle" />
    </div>
    <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
      <a-icon type="right-circle" />
    </div>
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
  height: 400px;
  line-height: 160px;
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
