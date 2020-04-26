<template>
    <div>
        <a-layout>
            <Header :select-keys="selectKeys"/>
            <Content/>
            <Footer/>
        </a-layout>
    </div>
</template>

<script>
    import Header from "../common/Header";
    import Footer from "../common/Footer";
    import Content from "../common/Content"

    export default {
        name: "Course",
        components: {Footer, Header, Content},
        data() {
            return {
                selectKeys: ['2']
            }
        }
    };
</script>

<style scoped>
</style>
