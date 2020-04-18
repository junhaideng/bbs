<template>
    <a-layout >
        <Header/>
        <Content/>
        <Footer/>
    </a-layout>
</template>


<script>
    import Header from './Header';
    import Footer from "./Footer";
    import Content from './Content';

    export default {
        name: 'Home',
        components: {
            Header,
            Footer,
            Content
        }
    };
</script>


<style scoped>
    /* For demo */
    .ant-carousel >>> .slick-slide {
        text-align: center;

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
