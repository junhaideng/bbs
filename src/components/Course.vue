<template>
 <div>
   <a-layout>
     <Header />
     <Footer />
   </a-layout>
 </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";

export default {
  name: "Course",
  components: { Footer, Header }
};
</script>

<style scoped>
</style>
