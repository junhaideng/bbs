<template>
<a-layout>
  <a-layout-footer style="text-align: center">
    Copyright &copy; {{ date }} Edgar All right reserved
  </a-layout-footer>
</a-layout>
</template>

<script>
    export default {
        name: "Footer",
        data(){
          return {
            date: ''
          }
        },
        mounted() {
           this.date = new Date().getFullYear()
        },
    }
</script>

<style scoped>

</style>
