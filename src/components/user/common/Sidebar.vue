<template>
    <div>
        <a-row>
            <a-col>
                <a-menu
                        style="maxWidth: 256px"
                        :selectedKeys="selectedKeys"
                        :openKeys.sync="keys"
                        mode="inline"
                        :inlineCollapsed="collapsed"
                >
                    <a-sub-menu key="sub1">
                        <span slot="title"><a-icon type="user" /><span>基本资料</span></span>
                            <a-menu-item key="1"><a href="/user/profile">个人资料</a></a-menu-item>
                            <a-menu-item key="2"><a href='/user/profile/log'>登录日志</a> </a-menu-item>

                    </a-sub-menu>
                    <a-sub-menu key="sub2" >
                        <span slot="title"><a-icon type="tool" /><span>帖子管理</span></span>
                        <a-menu-item  key="3"><a href="/user/profile/article">我的帖子</a></a-menu-item>
                        <a-menu-item key="4"><a href="/user/profile/post">我要发帖</a></a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub3">
                        <span slot="title"><a-icon type="file" /><span>文件管理</span></span>
                        <a-menu-item key="5"><a href="/user/profile/files">我的文件</a></a-menu-item>
                        <a-menu-item key="6"><a href="/user/profile/upload">文件上传</a></a-menu-item>
                    </a-sub-menu>


                    <a-sub-menu key="sub4">
                        <span slot="title"><a-icon type="setting" /><span>账号设置</span></span>
                        <a-menu-item key="7"><a href="/user/profile/change-password">修改密码</a></a-menu-item>
                        <a-menu-item key="8"><a href="/user/profile/out">注销账号</a></a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub5">
                        <span slot="title"><a-icon type="bell" /><span>消息通知</span></span>
                        <a-menu-item key="9"><a href="/user/profile/messages">我的通知</a></a-menu-item>
                        <a-menu-item key="10"><a href="/user/profile/message-settings">通知设置</a></a-menu-item>
                    </a-sub-menu>
                </a-menu>

            </a-col>
        </a-row>
    </div>
</template>
<script>
    export default {
        name: "Sidebar",
        props:{
            openKeys:{
                default(){
                    return ['sub1']
                }
            },
            selectedKeys:{
                default(){
                    return ['1']
                }
            }
        },
        data() {
            return {
                current: ['mail'],
                keys: this.openKeys,
                collapsed: false,
                screenWidth: document.body.clientWidth
            };
        },
        methods: {
        
            toggleCollapsed() {
                this.collapsed = !this.collapsed;
            },
        },
        watch: {
            openKeys(val) {
                console.log('openKeys', val);
            },
        },

        mounted(){
            window.onresize = ()=> {
                this.screenWidth=document.body.clientWidth;
                if(this.screenWidth<=734){
                    this.collapsed = true
                }
                else{
                    this.collapsed = false
                }
            }
        }
    };
</script>
