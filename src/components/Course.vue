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
    import Header from "./Header";
    import Footer from "./Footer";
    import Content from "./Content"

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
