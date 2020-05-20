<template>
  <a-layout>
    <a-layout-content
      :style="{
        width: width,
        margin: 'auto',
        marginTop: '1rem',
        marginBottom: '1rem',
        zIndex: 999,
      }"
    >
      <div :style="{ background: '#fff', padding: '24px', minHeight: height }">
        <slot name="content">Content</slot>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  name: "Content",
  props: {
    height: {
      default: "678px",

    },
    width:{
        default: "90%"
    }
  },
};
</script>

<style scoped>
.ant-carousel >>> .slick-slide {
  text-align: center;
  overflow: hidden;
}
</style>
