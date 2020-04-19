<template>
    <div>
        <a-layout>
            <Header :select-keys="selectKeys"/>
            <Footer/>
        </a-layout>
    </div>
</template>

<script>
    import Header from "./Header";
    import Footer from "./Footer";

    export default {
        name: "Course",
        components: {Footer, Header},
        data() {
            return {
                selectKeys: ['2']
            }
        }
    };
</script>

<style scoped>
</style>
