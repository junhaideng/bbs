<template>
  <Profile :selectedKeys="thisSelectedKeys" :open-keys="thisOpenKeys">

      <template v-slot:content>
        <a-row>
          <a-col :span="20" offset="2" :style="{ marginLeft: '20px', marginBottom: '20px' }">
         <a-list
         :pagination="pagination"
         size="large"
         :dataSource="listData"
         itemLayout="vertical"

         >
             <a-list-item slot="renderItem" slot-scope="item" key="item.title" >

             <a-list-item-meta :description="item.description">
                  <div slot="title"
                    ><a :href="'/'+item.userId">{{item.user}} </a><b>{{item.type | messageType}} 了你的帖子</b></div
                  >
                </a-list-item-meta>
                <a :href="item.url">{{item.post}}</a>

           </a-list-item>

         </a-list>
               </a-col>
        </a-row>
      </template>
  </Profile>
</template>

<script>
import Profile from "./common/Profile";
export default {
  name: "Message",
  mounted() {
    this.$axios
      .post("/user/profile/messages", {userId: 2})
      .then((res) => {
        console.log(this.data);

        this.listData = res.data.data;

      })
      .catch((err) => {
        console.log(err);
      });
  },
  components: {
    Profile,
  },
  filters:{
    messageType(val){
      if (val===0){
        return "收藏"
      }
      else if (val===1){
        return "点赞"
      }
      else if(val===2){
        return "评论"
      }
    }
  },
  data() {
    return {
      thisOpenKeys: ["sub5"], // 打开第三个子菜单
      thisSelectedKeys: ["9"],
      listData: [],
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 6,
      },
    };
  },
};
</script>

<style>
.ant-spin-container{
  min-height: 636px;
}

</style>
