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
        data(){
            return {
                selectKeys: ['3']
            }
        }

    }
</script>

<style scoped>

</style>
