<template>
 <el-aside class="nav" width="5rem" v-bind:style="{height: heightData}">
    <div class="logo"><img src="../../../static/logo.png"/></div>   
    <el-menu 
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      background-color="#4a9afb"
      text-color="#fff"
      :router=true
      active-text-color="#000">
        <el-menu-item index="/admin/project" >
          <img class="menu" src="../../../static/tab_icon_home_selected.png"/>
        </el-menu-item>
        <el-menu-item index="/admin/chat">
          <img class="menu" src="../../../static/tab_icon_chat_unselected.png"/>
        </el-menu-item>
    </el-menu>

 </el-aside>
</template>
<script>
export default {
    data(){
      return {
        heightData :document.documentElement.clientHeight+'px',
      }
    },
    ready: function () {
      window.addEventListener('resize', this.handleResize)
    },
    mouted:{
    },
    methods: {
      handleResize (event) {
        this.heightData = document.documentElement.clientHeight+'px'
      },
      handleSelect(key, keyPath){
        console.log(key);
        //console.log( keyPath);
      },
    }
  }
</script>
<style scoped>
  .el-header{
      text-align: center;
      height: 4rem;
      background-color: #ffffff;
      box-shadow: 0rem 0rem 0rem 0rem 
        rgba(0, 0, 0, 0.04);
      border: solid 0rem #ededed;
  }

 
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 5rem;
    min-height: 400px;
  }
  a{
    text-decoration: none;
    color: #000;
  }

  .nav{
    width: 5rem;
	  height: 51rem;
	  background-image: linear-gradient(180deg, 
		#4a9afb 59%);
  }

  .logo{
    margin: 1rem auto;
    width: 100%;
  }
  .logo img{
    height: 2rem;
    width: 3rem;
    border-radius: .2rem;
  }
  .menu{
    height: 2rem;
    width: 2rem;
    
  }
</style>