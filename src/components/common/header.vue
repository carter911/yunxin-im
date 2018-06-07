<template>
<el-header>
    <div style="height:60px; line-height:60px;float:right;font-size:11px;">
        <div style="display:inline-block;vertical-align: middle;height:2.7rem;">
            <img style="height:1.7rem;widht:1.7rem;border-radius: 1rem" :onerror="avatar" :src="userInfo.user.avatar" />
        </div>
        <div style="display:inline-block;vertical-align: middle;cursor: pointer;margin-right:1rem">{{userInfo.user.name}}</div>
        <div v-on:click="logout" style="display:inline-block;vertical-align: middle;cursor: pointer;">退出登录</div>
    </div>
</el-header>
</template>
<script>
import cookie from '../../utils/cookie.js'

export default {
    data(){
        return {

        }
    },
    computed:{
        userInfo(){
            let userInfo = JSON.parse(cookie.readCookie('userinfo'))
            return userInfo;
        }
    },
    watch:{
        userInfo(){

        }
    },
    methods: {
        avatar(){
            this.userInfo.user.avatar = "http://images.e-shigong.com/ic_home_head.png"
        },
        logout () {
            this.$confirm('确定要退出登录吗？', '退出', {
            confirmButtonText: '确认',
            cancelButtonText: '暂不退出',
            type: 'warning'
            }).then(() => {                
                var yunxinUser = {uid: 0, sdktoken: 123456}
                this.$store.commit('updateUserUID',yunxinUser)
                this.$store.commit('updateSgbUserInfo',{})
                this.$router.push({path: '/login'});
        
            }).catch(() => {      
            });
        }
    }
}
</script>
<style scoped>

.el-header{
    
    margin: 0px;
    height: 4rem;
    background-color: #ffffff;
    box-shadow: 0rem 0rem 0rem 0rem 
    rgba(0, 0, 0, 0.04);
    border: solid 0rem #ededed;
    border-bottom: solid 1px #ededed;
}
</style>
