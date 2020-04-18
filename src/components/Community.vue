<template>
    <div>

        <a-layout>
            <Header/>
            <Content/>
            <Footer/>

        </a-layout>

    </div>
</template>

<script>
    import Header from './Header'
    import Footer from "./Footer";
    import Content from './Content'

    export default {
        name: "Community",
        components: {
            Footer,
            Header,
            Content
        },

    }
</script>

<style scoped>

</style>
