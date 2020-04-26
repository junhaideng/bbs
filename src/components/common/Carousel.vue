<template>
  <div>
    <a-carousel autoplay>
      <a-row>
        <div>
          <img
            :style="{ margin: 'auto' }"
            height="200px"
            src="../../assets/images/1.jpg"
            alt=""
          />
        </div>
      </a-row>
      <a-row>
        <div :style="{ textAlign: 'center' }">
          <img
            :style="{ margin: 'auto' }"
            height="200px"
            src="../../assets/images/2.jpg"
            alt=""
          />
        </div>
      </a-row>
      <a-row>
        <div>
          <img
            :style="{ margin: 'auto' }"
            height="200px"
            src="../../assets/images/3.png"
            alt=""
          />
        </div>
      </a-row>
    </a-carousel>
  </div>
</template>

<script>
export default {
  name: "Carousel",
};
</script>

<style scoped>
  .ant-carousel >>> .slick-slide {
    text-align: center;
    overflow: hidden;
  }
</style>
