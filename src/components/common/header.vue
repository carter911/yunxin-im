<template>
<el-header>
<div style="height:60px; line-height:60px;float:right">
    <div style="display:inline-block;vertical-align: middle;height:2.7rem;"><img style="height:1.7rem;widht:1.7rem;border-radius: 1rem" src="../../../static/logo_400_400_gaitubao_com_100x100.png" />
    </div>
    <div style="display:inline-block;vertical-align: middle;cursor: pointer;margin-right:1rem">章三</div>
    <div v-on:click="loginout" style="display:inline-block;vertical-align: middle;cursor: pointer">退出登陆</div>
</div>
</el-header>
</template>
<script>
export default {
  methods: {
    loginout: function (event) {
        sessionStorage.setItem('teoken','');
        sessionStorage.setItem('user_id',0);
        sessionStorage.setItem('user','');
        sessionStorage.setItem('isLogin',0);
        this.$store.commit('changeLogin',0);
        this.$router.push({path: '/login'});  
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
    border-bottom: solid 2px rgb(237, 237, 237);
}
</style>
