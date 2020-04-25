<template>
    <div>

        <a-layout>
            <Header :select-keys="selectKeys"/>
            <Content>
                <template v-slot:content>
{{dataSource}}
                </template>
            </Content>
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
            Content,
        },
        data(){
            return {
                selectKeys: ['3'],
                dataSource: [],
            }
        },
        mounted(){
            this.$axios.get("/api/get_post").then(res=>{this.dataSource = res.data.data;}).catch(err=>{console.log(err)})
        }

    }
</script>

<style scoped>

</style>
