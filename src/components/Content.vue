<template>
    <a-layout>
        <a-layout-content :style="{width:'90%', margin: 'auto', marginTop: '1rem', marginBottom:'1rem'}">
            <a-carousel autoplay>
                <a-row >
                    <div ><img :style="{margin: 'auto'}" height="200px" src="../assets/images/1.jpg" alt=""/>
                    </div>
                </a-row>
                <a-row>
                    <div :style="{textAlign: 'center'}"><img :style="{margin: 'auto'}" height="200px" src="../assets/images/2.jpg" alt=""/></div>
                </a-row>
                <a-row>
                    <div><img :style="{margin: 'auto'}" height="200px" src="../assets/images/3.png" alt=""/> </div>
                </a-row>

            </a-carousel>
            <div :style="{margin: '36px'}"></div>
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
