<template>
    <div>

        <a-layout>
            <Header select-keys="['3']"/>
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
