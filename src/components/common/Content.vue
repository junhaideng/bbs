<template>
    <a-layout>
        <a-layout-content :style="{width:'90%', margin: 'auto', marginTop: '1rem', marginBottom:'1rem'}">
         
        
            <div :style="{ background: '#fff', padding: '24px', minHeight: '480px' }">
                <slot name="content">Content</slot>
            </div>
        </a-layout-content>
    </a-layout>
</template>

<script>
    export default {
        name: "Content"
    }
</script>

<style scoped>
  .ant-carousel >>> .slick-slide {
    text-align: center;
    overflow: hidden;
  }
</style>
