<style scoped>

.el-header{
    margin: 0px;
    height: 4rem;
    background-color: #ffffff;
    box-shadow: 0rem 0rem 0rem 0rem 
    rgba(0, 0, 0, 0.04);
    border: solid 0rem #ededed;
    border-bottom: solid 1px #ededed;
    -webkit-app-region: drag;
}
.header{
    width: 200px;
    height:60px;
    line-height:60px;
    font-size:13px;
    width: 100%;
    
}
.header_right{
    text-align: right;
    float:right;
    width: 160px;
    -webkit-app-region: no-drag;
}
.header_left{
    width: 70px;
    text-align: left;
    float: left;
    cursor: pointer;
    -webkit-app-region: no-drag;
}

.header_left:hover{
    color: #4a98fb;
}
</style>

<template>
<el-header style="">
    <div class="header" >
        <div v-if="this.isBack" @click="goBack" class="header_left">< 上一页</div>
        <div class="header_right">
            <div style="display:inline-block;height:2.7rem;line-height:60px;">
                <img style="vertical-align: middle;height:1.7rem;widht:1.7rem;border-radius: 1rem" :onerror="avatar" :src="userInfo.user.avatar" />
            </div>
            <div style="display:inline-block;vertical-align: middle;cursor: pointer;margin-right:1rem">{{userInfo.user.name}}</div>
            <div v-on:click="logout" style="display:inline-block;vertical-align: middle;cursor: pointer;">退出登录</div>
        </div>
    </div>
</el-header>
</template>
<script>
import cookie from '../../utils/cookie.js'

export default {
    data(){
        return {
            userInfo:JSON.parse(localStorage.getItem('userinfo')),
            isBack:false
        }
    },
    watch:{
      '$route':'isTab'
 
    },
    methods: {
        isTab(){
            //console.error('header luoyou',this.$route.path);
            if(this.$route.path === '/admin/chat' || this.$route.path === '/admin/project'){
                this.isBack = false;
            }else{
                this.isBack = true;
            }
        },
        goBack(){
            console.log('go back')
            this.$router.go(-1)
        },
        avatar(){
            this.userInfo.user.avatar = "http://images.e-shigong.com/ic_home_head.png"
        },
        logout () {
            this.$confirm('确定退出将会退出程序,确定吗？', '退出', {
            confirmButtonText: '确认',
            cancelButtonText: '暂不退出',
            type: 'warning'
            }).then(() => {                
                var yunxinUser = {uid: 0, sdktoken: 123456}
                this.$store.commit('updateUserUID',yunxinUser)
                this.$store.commit('updateSgbUserInfo',{})
                this.$store.dispatch('logout')
                this.$router.push({path: '/login'});
                if(window.require) {
                    var ipc = window.require('electron').ipcRenderer
                    ipc.send('close');
                }
            }).catch(() => {      
            });
            
        }
    }
}
</script>

